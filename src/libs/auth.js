// 是否登录
export function isLogin() {
  return !!localStorage.getItem('token')
}
// 取token
export function getToken() {
  return localStorage.getItem('token')
}
// 设置token
export function setToken(token) {
  localStorage.setItem('token', token)
}

