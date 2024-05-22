interface MyOptions {
  access_key_id: string;
  secret_access_key: string;
  server: string;

  Bucket: string;
  ACL?: string;

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
  /** 
   * 创建对象时，可以加上此消息头设置对象的权限控制策略，使用的策略为预定义的常用策略，
   * 包括：private；public-read；public-read-write
   * （各策略详细说明见ACL章节的“使用头域设置ACL”）。 
   */
  ACL?: string;

  /**
   * 上传对象时，可以加上此消息头设置对象的MIME类型，MIME类型是标准的互联网媒体类型。
   */
  ContentType?: string;

  /**
   * 上传对象时，可以加上此消息头设置对象的元数据，元数据是一组键值对，键值对的键和值都是字符串。
   */
  Metadata?: Record<string, string>;
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