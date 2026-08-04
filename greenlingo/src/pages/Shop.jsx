import React, { useState, useEffect } from 'react'
import items from '../data/shopItems'
import { getGreenCoin, addGreenCoin } from '../data/user'
import './Shop.css'

export default function Shop() {
  const [coin, setCoin] = useState(getGreenCoin())
  const [stocks, setStocks] = useState({})

  useEffect(() => {
    // 初始化庫存狀態（可擴展為 localStorage 儲存）
    const initialStocks = {}
    items.forEach(item => {
      initialStocks[item.id] = item.stock
    })
    setStocks(initialStocks)
  }, [])

  const handleExchange = (item) => {
    if (coin < item.price || stocks[item.id] <= 0) return

    // 更新綠幣與庫存
    addGreenCoin(-item.price)
    setCoin(getGreenCoin())
    setStocks(prev => ({
      ...prev,
      [item.id]: prev[item.id] - 1
    }))

    alert(`🎉 你成功兌換咗「${item.name}」！`)
  }

  return (
    <div className="shop-container">
      <h2>🛒 綠幣之店</h2>
      <p>你目前有 <strong>{coin}</strong> 個綠幣。</p>

      <div className="shop-grid">
        {items.map(item => (
          <div key={item.id} className="shop-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>💰 價錢：{item.price} 綠幣</p>
            <p>📦 剩餘：{stocks[item.id] ?? 0}</p>
            <button
              disabled={coin < item.price || stocks[item.id] <= 0}
              onClick={() => handleExchange(item)}
            >
              {stocks[item.id] <= 0
                ? '已售罄'
                : coin < item.price
                ? '綠幣不足'
                : '立即兌換'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
