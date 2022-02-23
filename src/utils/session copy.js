const TokenKey = 'comp-energy-web-token'
export const setToken = (newTokenInfo) => {
  localStorage.setItem(TokenKey, JSON.stringify(newTokenInfo))
}
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TokenKey))
}
export const removeToken = () => {
  localStorage.removeItem(TokenKey)
}
export const clearLocalStorage = () => {
  localStorage.clear()
}
