// import { ElMessage } from "element-plus";
import {
  type BusinessResponse,
  type PureHttpError,
  RequestErrorStage
} from "./type.d";
// import { useAppStore } from "@/store/app";

/**
 * 请求拦截器中的错误处理
 */
export function formatRequestInterceptorError(error: any): [number, string] {
  const code = -1;
  const message = error.response?.data?.message || "网络繁忙，请稍后再试";
  return [code, message];
}

/**
 * 业务错误处理
 */
export function formatBusinessError(error: BusinessResponse): [number, string] {
  const code = error.code || -1;
  const messageType = typeof error.message;
  let message;

  if (messageType == "string") {
    message = error.message;
  } else if (Array.isArray(error.message)) {
    message = error.message.join(",");
  } else if (messageType == "object") {
    message = error.message + "";
  } else {
    message = formatResponseCodeError(code);
  }

  return [code, message];
}

/**
 * 响应错误拦截处理
 */
export function formatResponseError(error: PureHttpError): [number, string] {
  const code = Number(error.code) || -1;
  const message = formatResponseCodeError(code);

  return [code, message];
}

/**
 * 根据错误码生成错误信息
 */
function formatResponseCodeError(code: number): string {
  let message = "未知错误";
  const codeMessageMap = {
    400: "请求失败，请您稍后重试",
    401: "登录失效，请您重新登录",
    403: "当前账号无权限访问",
    404: "你所访问的资源不存在",
    405: "请求方式错误，请您稍后重试",
    408: "请求超时，请您稍后重试",
    500: "服务异常",
    502: "网关错误",
    503: "服务不可用",
    504: "网关超时"
  };

  if (codeMessageMap[code]) {
    message = codeMessageMap[code];
  } else if (code >= 500) {
    message = "网络繁忙，请稍后再试";
  } else if (code >= 400) {
    message = "客户端参数错误";
  }

  return message;
}

export class RequestError extends Error {
  // 原始错误
  raw: any;
  // 是否是取消请求错误
  isCancelRequest: boolean;
  // 错误阶段
  stage: RequestErrorStage;
  // 错误码
  code?: number;

  constructor(stage, isCancel, error) {
    super();

    this.stage = stage;
    this.isCancelRequest = isCancel;
    this.raw = error;

    this.formatErrorMessage();
  }

  private formatErrorMessage() {
    let errorData: [number, string];
    console.log(this.raw);

    switch (this.stage) {
      case RequestErrorStage.REQUEST_INTERCEPTOR:
        errorData = formatRequestInterceptorError(this.raw);
        break;
      case RequestErrorStage.RESPONSE_INTERCEPTOR:
        errorData = formatResponseError(this.raw);
        break;
      default:
        errorData = formatBusinessError(this.raw);
    }

    this.code = errorData[0];
    this.message = errorData[1];
  }
}

export function handleError(error: RequestError) {
  console.error(error.raw);
  // ElMessage.error({
  //   message: error.message,
  //   duration: 3000
  // });

  // 登录失效需要退出登录
  if (error.code == 401 || error.code == -2) {
    // useAppStore().clearLoginData();
    location.href = "/login";
  }
}
