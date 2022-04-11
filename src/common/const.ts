export class ResponseResult {
  result: boolean;
  status: number;
  message: string;
  data?: any;
  error?: string;
}

export class LogBody {
  code?: number;
  msg?: string;
  function_name?: string;
  variable?: string;
  body?: any;
}
