import React, { useEffect, useState } from 'react'
import { getGreenCoin } from '../data/user'
import './TopBar.css'

export default function TopBar() {
  const [coin, setCoin] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCoin(getGreenCoin())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="topbar">
      🪙 {coin} 綠幣
    </div>
  )
}
