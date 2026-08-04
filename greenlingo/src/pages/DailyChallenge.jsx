import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dailyTasks from '../data/dailyTasks'
import './DailyChallenge.css'

export default function DailyChallenge() {
  const [interestLevel, setInterestLevel] = useState(null)
  const [tasksToShow, setTasksToShow] = useState([])
  const [completed, setCompleted] = useState([])
  const navigate = useNavigate()

  // 載入用戶設定 & 完成任務狀態
  useEffect(() => {
    const level = localStorage.getItem('eco_interest_level')
    const done = JSON.parse(localStorage.getItem('eco_tasks_done') || '[]')

    if (level) {
      setInterestLevel(level)
      const num = level === 'high' ? 3 : level === 'medium' ? 2 : 1
      setTasksToShow(dailyTasks.slice(0, num))
    }

    setCompleted(done)
  }, [])

  // 選擇環保意向等級
  const handleSelectInterest = (level) => {
    localStorage.setItem('eco_interest_level', level)
    setInterestLevel(level)
    const num = level === 'high' ? 3 : level === 'medium' ? 2 : 1
    setTasksToShow(dailyTasks.slice(0, num))
  }

  // 跳轉至任務詳細頁
  const handleTaskClick = (id) => {
    navigate(`/challenge/${id}`)
  }

  return (
    <div className="challenge-container">
      <h2>🔥 每日挑戰</h2>

      {!interestLevel && (
        <div className="interest-popup">
          <h3>你對環保行為有幾大興趣？</h3>
          <div className="interest-options">
            <button onClick={() => handleSelectInterest('high')}>💚 我好積極！</button>
            <button onClick={() => handleSelectInterest('medium')}>😊 我有興趣</button>
            <button onClick={() => handleSelectInterest('low')}>🤔 我想了解下</button>
          </div>
        </div>
      )}

      <div className="task-list">
        {tasksToShow.map((task) => (
          <div
            key={task.id}
            className={`task-card ${completed.includes(task.id) ? 'done' : ''}`}
            onClick={() => handleTaskClick(task.id)}
          >
            <h4>{task.title}</h4>
            <p>{task.desc}</p>
            {completed.includes(task.id) && (
              <span className="done-mark">✅ 已完成</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
