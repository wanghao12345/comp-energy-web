const TokenKey = 'comp-energy-web-token'
export const setStorage = (newTokenInfo, key) => {
  localStorage.setItem(key || TokenKey, JSON.stringify(newTokenInfo))
}
export const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key || TokenKey))
}
export const removeStorage = (key) => {
  localStorage.removeItem(key || TokenKey)
}
export const clearLocalStorage = () => {
  localStorage.clear()
}
