interface MyOptions {
  access_key_id: string;
  secret_access_key: string;
  server: string;
  bucketName: string;

  prefix?: string;

  /** 是否跳过已经存在的文件 */
  ignoreExist?: boolean;
}

interface HwObsClient {
  /**
   * 使用SourceFile参数指定待上传的文件路径。
   * SourceFile参数和Body参数不能同时使用。
   * 上传内容大小不能超过5GB。
   * @param options 
   * @param callback 
   */
  putObject(options: PutObjectOptions, callback: (err: any, result: PutObjectResult) => void): void;

  getObjectMetadata(options: {
    Bucket: string;
    Key: string;
  }, callback: (err: any, result: any) => void): void;
}

interface PutObjectOptions {
  Bucket: string;
  Key: string;
  /** 待上传的本地文件路径，需要指定到具体的文件名 */
  SourceFile: string;
}

interface PutObjectResult {
  CommonMsg: {
    Status: number;
  }
  InterfaceResult?: {
    ContentType: string;
    ContentLength: number;
    Metadata: any;
  }
}

// obsClient.putObject({
//   Bucket : 'bucketname',
//   Key : 'objectname',
//   SourceFile : 'localfile'  // localfile为待上传的本地文件路径，需要指定到具体的文件名
// }, (err, result) => {
//   if(err){
//          console.error('Error-->' + err);
//   }else{
//          console.log('Status-->' + result.CommonMsg.Status);
//   }
// });

interface MyFile {
  path: string;
  cwd: string;
  base: string;
  isBuffer(): boolean;
  isStream(): boolean;
}