/// <reference path="./src/index.d.ts" />

const gulp = require('gulp');
const alias = require('./index.js');

/** @type{MyOptions} */
const DEF_OPTION = {
  access_key_id: 'access_key_id',
  secret_access_key: 'secret_access_key',
  server: '',
  bucketName: 'chobits',

  prefix: 'gulp-cho-hwobs',
  ignoreExist: true, // 是否跳过已经存在的文件
};

gulp.task('test', () => {
  const config = DEF_OPTION;

  return gulp.src('src/**/*.js', { base: 'src' }).pipe(
    alias(config)
  );
});

gulp.task('default', gulp.series("test"));