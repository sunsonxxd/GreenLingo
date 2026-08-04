import React from 'react'
import { useNavigate } from 'react-router-dom'
import './GreenClassroom.css'

export default function GreenClassroom() {
  const navigate = useNavigate()

  const lesson1Done = localStorage.getItem('lesson_intro_completed') === 'true'
  const lesson2Done = localStorage.getItem('lesson_mistake_completed') === 'true'
  const lesson3Done = localStorage.getItem('lesson_home_completed') === 'true'
  const quizScore = localStorage.getItem('quiz_intro_highscore') || 0

  const handleClick = (lesson) => {
    if (!lesson.locked) {
      navigate(lesson.route)
    }
  }

  const introLessons = [
    { id: 1, title: '回收基礎入門', locked: false, route: '/lesson/intro' },
    { id: 2, title: '回收錯誤', locked: !lesson1Done, route: '/lesson/mistake' },
    { id: 3, title: '家居分類', locked: !lesson2Done, route: '/lesson/home' },
    {
      id: 4,
      title: '🌟 初階測驗',
      locked: !lesson3Done,
      route: '/quiz/intro',
      score: quizScore,
    }
  ]

  const midLessons = [
    {
      id: 5,
      title: '🧠 中階課程（開發中）',
      locked: true,
      route: '',
    }
  ]

  return (
    <div className="green-classroom-page">
      <h2 className="classroom-title">🌱 綠色學堂</h2>
      <p className="classroom-subtitle">完成任務，逐步解鎖更多挑戰！</p>

      {/* 🟢 初階課程 */}
      <div className="stage-section">
        <h3 className="stage-title">🟢 初階課程</h3>
        <div className="lesson-track">
          {introLessons.slice(0, 3).map((lesson, i) => (
            <div
              key={lesson.id}
              className={`lesson-bubble ${lesson.locked ? 'locked' : ''}`}
              onClick={() => handleClick(lesson)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span>{lesson.title}</span>
            </div>
          ))}
        </div>

        {/* 🌟 初階測驗（獨立無線） */}
        <div className="lesson-track no-line">
          {introLessons.slice(3, 4).map((lesson) => (
            <div
              key={lesson.id}
              className={`lesson-bubble ${lesson.locked ? 'locked' : ''}`}
              onClick={() => handleClick(lesson)}
            >
              <span>{lesson.title}</span>
              {lesson.score && (
                <div className="score-label">最高分：{lesson.score} / 6</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="divider-line" />

      {/* 🧠 中階課程 */}
      <div className="stage-section">
        <h3 className="stage-title">🧠 中階課程</h3>
        <div className="lesson-track no-line">
          {midLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="lesson-bubble locked"
              title="開發中，敬請期待"
            >
              <span>{lesson.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
