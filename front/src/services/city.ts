/* eslint-disable */
// @ts-ignore
import * as API from './types';
import type { AxiosRequestConfig } from 'axios';
import { request } from '@/utils/request';

/** Hello World GET / */
export async function getIndex(options?: AxiosRequestConfig) {
  return request<string>('/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Getcity GET /city/${param0} */
export async function getCityCity(
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getCitycityParams,
  options?: AxiosRequestConfig
) {
  const { city: param0, ...queryParams } = params;
  return request<API.CityGetRes>(`/city/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** Putcity PUT /city/${param0} */
export async function putCityCity(
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.putCitycityParams,
  options?: AxiosRequestConfig
) {
  const { city: param0, ...queryParams } = params;
  return request<API.CityPutRes>(`/city/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}
