class HttpException extends Error {
  // status http 错误状态码  message 错误提示信息  errors 错误对象
  constructor(
    public status: number,
    public message: string,
    public errors: any = {}
  ) {
    super(message)
  }
}

export default HttpException
