import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import tasks from '../data/dailyTasks'
import { getGreenCoin, addGreenCoin } from '../data/user'
import './ChallengeDetail.css'

export default function ChallengeDetail() {
  const { id } = useParams()
  const taskId = parseInt(id, 10)
  const navigate = useNavigate()

  const [completed, setCompleted] = useState(false)
  const task = tasks.find((t) => t.id === taskId)

  useEffect(() => {
    const done = JSON.parse(localStorage.getItem('eco_tasks_done') || '[]')
    setCompleted(done.includes(taskId))
  }, [taskId])

  const handleComplete = () => {
    if (completed) return
    const done = JSON.parse(localStorage.getItem('eco_tasks_done') || '[]')
    const updated = [...done, taskId]
    localStorage.setItem('eco_tasks_done', JSON.stringify(updated))
    addGreenCoin(1)
    setCompleted(true)
  }

  if (!task) {
    return <div className="challenge-detail-container">找不到任務。</div>
  }

  return (
    <div className="challenge-detail-container">
      <button className="back-btn" onClick={() => navigate('/challenge')}>⬅️ 返回</button>
      <h2>{task.title}</h2>
      <p className="desc">{task.desc}</p>
      <p><strong>🎁 綠幣獎勵：</strong>{task.reward} 綠幣</p>
      <p><strong>🌿 完成好處：</strong>{task.benefit}</p>

      {!completed ? (
        <button className="complete-btn" onClick={handleComplete}>
          ✅ 完成任務並獲得綠幣
        </button>
      ) : (
        <div className="done-msg">🎉 你已完成此任務！</div>
      )}
    </div>
  )
}
