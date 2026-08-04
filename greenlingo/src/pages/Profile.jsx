import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

export default function Profile() {
  const navigate = useNavigate()

  const handleReset = () => {
    const confirmReset = window.confirm('確定要重設所有進度嗎？此操作無法還原。')
    if (confirmReset) {
      // 清除所有本地資料
      localStorage.removeItem('green_coin')
      localStorage.removeItem('eco_interest_level')
      localStorage.removeItem('eco_tasks_done')
      localStorage.removeItem('lesson_intro_completed')
      localStorage.removeItem('lesson_mistake_completed')
      localStorage.removeItem('lesson_home_completed')
      localStorage.removeItem('quiz_intro_highscore')
      localStorage.removeItem('intro_shown')

      alert('資料已重設，將返回導覽畫面')
      // 重新載入頁面，導覽畫面會自動出現
      window.location.reload()
    }
  }

  return (
    <div className="profile-container">
      <h2>👤 個人檔案</h2>
      <p>這是 Demo 版本，你可以按下按鈕重設所有進度與資料。</p>
      <button className="reset-btn" onClick={handleReset}>
        🔁 重設所有資料
      </button>
    </div>
  )
}
