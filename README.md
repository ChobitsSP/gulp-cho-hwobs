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
      access_key_id: "access_key_id",
      secret_access_key: "secret_access_key",
      server: "server",
      bucketName: "bucketName",
      prefix: "gulp-cho-hwobs",
      ignoreExist: true,
    })
  );
});
```
