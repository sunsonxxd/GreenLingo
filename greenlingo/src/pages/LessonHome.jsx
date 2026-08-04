import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import questions from '../data/lessonHomeSortQuestions'
import './LessonIntro.css'

export default function LessonHome() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const navigate = useNavigate()
  const question = questions[current]

  const handleOptionClick = (index) => {
    if (selected !== null) return
    setSelected(index)

    if (index === question.answer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1)
        setSelected(null)
      } else {
        setShowResult(true)
        localStorage.setItem('lesson_home_completed', 'true')
      }
    }, 1000)
  }

  const restartQuiz = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowResult(false)
  }

  const goBack = () => {
    navigate('/classroom')
  }

  if (showResult) {
    return (
      <div className="lesson-container" style={{ position: 'relative' }}>
        <div className="confetti"></div>
        <h2>🎉 你完成咗「家居分類」！</h2>
        <p>你答啱咗 {score} / {questions.length} 題。</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={restartQuiz} className="option-btn">🔁 重新答題</button>
          <button onClick={goBack} className="option-btn">⬅️ 回到學堂</button>
        </div>
      </div>
    )
  }

  return (
    <div className="lesson-container">
      <h2>🏠 家居分類</h2>
      <p className="question">第 {current + 1} 題：{question.question}</p>
      <div className="options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${selected !== null ? (i === question.answer ? 'correct' : i === selected ? 'wrong' : '') : ''}`}
            onClick={() => handleOptionClick(i)}
            disabled={selected !== null}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
