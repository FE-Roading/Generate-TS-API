import type { GenerateServiceProps } from 'openapi-ts-request';

export default {
  schemaPath: 'http://127.0.0.1:8000/openapi.json',
  serversPath: "./src/services",
  dataFields: ["data"],
  requestImportStatement: "import type { AxiosRequestConfig } from 'axios';\nimport { request } from '@/utils/request';",
  requestOptionsType: "AxiosRequestConfig",
  hook: {
    customFunctionName: (data) => data.method + upperCasePathSegment(data.path),
  }
} as GenerateServiceProps;

function upperCasePathSegment(path: string) {
  const paths = (path ?? "").split("/").filter(Boolean)
  let result = ""

  // 如果是以版本号前缀开头，则将其移至path末尾。如[v1, operate, list]调整为[operate, list, v1]
  if (/^(v|V)\d*$/.test(paths[0])) {
    paths.push(paths.shift()!)
  }

  if (paths.length == 0) {
    result = "Index"
  } else {
    result = paths.map(toUpperFirstLetter).join("")
  }

  return result
}

function toUpperFirstLetter(value: string) {
  if (!value?.trim?.()?.length) return ""

  return value[0].toUpperCase() + value.substring(1)
}