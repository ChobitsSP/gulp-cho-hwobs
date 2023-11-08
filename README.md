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
