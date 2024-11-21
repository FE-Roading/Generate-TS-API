import type {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig
} from "axios";

export type resultType = {
  accessToken?: string;
};

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface PureHttpError extends Omit<AxiosError, "config"> {
  isCancelRequest?: boolean;
  config: PureHttpRequestConfig;
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: PureHttpRequestConfig) => void;
  beforeResponseCallback?: (response: PureHttpResponse) => void;
  // 是否显示错误信息
  showLoading?: boolean;
  loadingTarget?: string | HTMLElement;
  loadingInstance?: {
    close: CallableFunction;
  };
  // 是否显示请求的Loading
  showError?: boolean;
  // 请求时，是否携带token
  withToken?: boolean;
  // 是否直接使用原始的response
  useRawRes?: boolean;
}

export interface PureHttpInitConfig extends PureHttpRequestConfig {
  // 不使用默认的请求拦截器
  withoutDefRequestInterceptor?: boolean;
  // 不使用默认的响应拦截器
  withoutDefResponseInterceptor?: boolean;
}

export interface PureHttpResponse extends AxiosResponse {
  config: PureHttpRequestConfig;
}

export enum RequestErrorStage {
  // 请求拦截器中
  REQUEST_INTERCEPTOR,
  // 响应拦截器中
  RESPONSE_INTERCEPTOR,
  // 响应处理器中
  RESPONSE_HANDLER
}

// 正常请求的响应结构
export interface BusinessResponse {
  code: number;
  message: any;
  data: any;
}
