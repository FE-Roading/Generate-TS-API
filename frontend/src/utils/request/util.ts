/**
 * 获取token字符串
 * @returns string
 */
export function getToken() {
  return localStorage.getItem("token")
}

/** 格式化token（jwt格式） */
export function formatToken(token: string): string {
  return "Bearer " + token;
};