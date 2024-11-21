import type { AxiosRequestConfig } from "axios";
import { stringify } from "qs";

// 请求Token字段名
export const RequestTokenKey = "Authorization";

/** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
export const tokenDenyList = [
  "/refreshToken",
  "/login"
  // "/un-active-account-open"
];

export const urlPrefix = import.meta.env.VITE_BASE_API;

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
export const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 1000 * 60,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "X-Front-Scene": "Web"
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: params => stringify(params, { arrayFormat: "repeat" })
  },
  validateStatus(status: any) {
    return status >= 200 && status < 300;
  }
};
//未激活账号登录code码
export const notActiveCode = -5;
