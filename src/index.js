/// <reference path="./index.d.ts" />
const through = require('through2');
const ObsClient = require('esdk-obs-nodejs');

/**
 * 获取文件路径
 * @param {MyFile} file
 * @param {string} prefix
 */
function getFileKey(file, prefix) {
  var str = file.path
    .replace(file.cwd, '')
    .replace(/\\/g, '/')
    .replace(file.base.replace(/\\/g, '/'), '')
    .replace(/^\/+/, '');

  return (
    prefix + (!prefix || prefix[prefix.length - 1] === '/' ? '' : '/') + str
  );
}

/**
 * 检查文件是否存在
 * @param {HwObsClient} client 
 * @param {string} bucket 
 * @param {string} key 
 */
function CheckObjectExist(client, bucket, key) {
  return client.getObjectMetadata({
    Key: key,
    Bucket: bucket,
  }).then(function (result) {
    return result.CommonMsg.Status === 200;
  });
}

/**
 * 上传
 * https://github.com/huaweicloud/huaweicloud-sdk-nodejs-obs/issues/3
 * @param {HwObsClient} client
 * @param {MyOptions} option
 * @param {string} key
 * @param {string} filePath
 */
async function uploadFile(client, option, key, filePath) {
  const ContentConfig = {};

  if (/\.gz$/i.test(key)) {
    key = key.replace(/\.gz$/i, '');
    ContentConfig['ContentEncoding'] = 'gzip';
    // ContentConfig['ContentLength'] = fs.statSync(filePath).size;
    if (/\.js$/i.test(key)) {
      ContentConfig['ContentType'] = 'application/javascript';
    }
    else if (/\.css$/i.test(key)) {
      ContentConfig['ContentType'] = 'text/css';
    }
    else if (/\.html$/i.test(key)) {
      ContentConfig['ContentType'] = 'text/html';
    }
  }

  if (option.ignoreExist) {
    const flag = await CheckObjectExist(client, option.Bucket, key);
    if (flag) return;
  }

  return client.putObject(Object.assign({
    Key: key,
    Bucket: option.Bucket,
    SourceFile: filePath,
    ACL: option.ACL,
  }, ContentConfig));
}

/**
 *
 * @param {MyOptions} option
 * @returns
 */
function main(option) {
  /** @type{HwObsClient} */
  const client = new ObsClient(option);

  return through.obj(
    /**
     * 
     * @param {MyFile} file 
     * @param {*} enc 
     * @param {Function} cb 
     */
    function (file, enc, cb) {
      if (file.isBuffer()) {
        const ossPath = getFileKey(file, option.prefix);
        uploadFile(client, option, ossPath, file.path)
          .then(function () {
            cb(null, file);
          })
          .catch(function (err) {
            console.error('上传失败', err);
            cb(err, null);
          });
      } else if (file.isStream()) {
        // var code = fs.readFileSync(file.path, "utf8");
        // file.contents = Buffer.from(code, 'utf-8');
        cb(null, file);
      } else {
        cb(null, file);
      }
    });
}

module.exports = main;