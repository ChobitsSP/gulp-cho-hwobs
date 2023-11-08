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
  putObject(options: PutObjectOptions, callback: (err: any, result: TopResult) => void): void;

  getObjectMetadata(options: {
    Bucket: string;
    Key: string;
  }, callback: (err: any, result: TopResult) => void): void;
}

interface PutObjectOptions {
  Bucket: string;
  Key: string;
  /** 待上传的本地文件路径，需要指定到具体的文件名 */
  SourceFile: string;
}

interface TopResult {
  CommonMsg: {
    Status: number;
  }
  InterfaceResult?: {
    ContentType: string;
    ContentLength: number;
    Metadata: any;
  }
}

interface MyFile {
  path: string;
  cwd: string;
  base: string;
  isBuffer(): boolean;
  isStream(): boolean;
}