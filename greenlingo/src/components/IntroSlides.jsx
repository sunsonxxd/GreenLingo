import React, { useState, useEffect } from 'react'
import './IntroSlides.css'

const slides = [
  {
    title: '🌏 香港環保現況',
    content: '香港堆填區預計數年內飽和。回收率偏低，大量可回收物品錯誤分類或直接送往堆填區，市民對回收系統信任不足。'
  },
  {
    title: '💰 做環保有咩實際好處？',
    content: '回收可換禮物（如綠綠賞、入樽機），減少用水用電可節省費用，自備袋、自備餐具更可獲商戶優惠，環保 = 慳錢。'
  },
  {
    title: '🌿 GreenLingo 是？',
    content: '結合環保教育、每日任務、回收地圖及綠幣獎賞，透過遊戲化鼓勵香港人實踐環保，改變日常生活習慣。'
  }
]

export default function IntroSlides({ onFinish }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const shown = localStorage.getItem('intro_shown')
    if (shown === 'true') {
      onFinish()
    }
  }, [onFinish])

  const handleNext = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1)
    } else {
      localStorage.setItem('intro_shown', 'true')
      onFinish()
    }
  }

  return (
    <div className="intro-overlay">
      <div className="intro-card fade-in">
        <h2>{slides[index].title}</h2>
        <p>{slides[index].content}</p>
        <button onClick={handleNext}>
          {index === slides.length - 1 ? '✅ 開始使用' : '➡️ 下一頁'}
        </button>
      </div>
    </div>
  )
}
