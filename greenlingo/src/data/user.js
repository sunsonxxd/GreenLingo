// user.js：管理使用者的綠幣（localStorage）

const COIN_KEY = 'green_coin'

export const getGreenCoin = () => {
  return parseInt(localStorage.getItem(COIN_KEY) || '0', 10)
}

export const addGreenCoin = (amount = 1) => {
  const current = getGreenCoin()
  localStorage.setItem(COIN_KEY, current + amount)
}

export const resetGreenCoin = () => {
  localStorage.setItem(COIN_KEY, '0')
}
