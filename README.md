# gulp-cho-hwobs

https://github.com/huaweicloud/huaweicloud-sdk-nodejs-obs

## Usage

```shell
npm install --save-dev gulp-cho-hwobs
```

Then, add it to your `gulpfile.js`:

### Simple

```javascript
var alias = require("gulp-cho-hwobs");

gulp.task("test", () => {
  return gulp.src("dist/**/*", { base: "dist" }).pipe(
    alias({
      access_key_id: "*** Provide your Access Key ***",
      secret_access_key: "*** Provide your Secret Key ***",
      server: "https://your-endpoint",

      Bucket: "chobits",
      ACL: "public-read",

      prefix: "gulp-cho-hwobs",
      ignoreExist: true,
    })
  );
});
```

gzip

```javascript
const gulp = require("gulp");
const gzip = require("gulp-gzip");

const through2 = require("through2");
const fs = require("fs");
const del = require("del");

gulp.task("gzip", function () {
  return gulp
    .src(["./dist/**/*.js", "./dist/**/*.css"])
    .pipe(gzip({ threshold: "10kb" }))
    .pipe(gulp.dest("./dist"));
});

gulp.task("gzip-clean", function () {
  return gulp.src("./dist/**/*.gz").pipe(
    through2.obj(function (file, enc, cb) {
      const originalFilePath = file.path.replace(/\.gz$/, "");

      fs.access(originalFilePath, fs.constants.F_OK, (err) => {
        if (!err) {
          del(originalFilePath).then(() => cb(null, file));
        } else {
          cb(null, file);
        }
      });
    })
  );
});
```
