import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getQuestions from '../data/getIntroQuizQuestions'
import './LessonIntro.css'

export default function LessonIntroQuiz() {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const q = getQuestions()
    setQuestions(q)
  }, [])

  const handleOptionClick = (index) => {
    if (selected !== null) return
    setSelected(index)

    if (index === questions[current].answer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1)
        setSelected(null)
      } else {
        setShowResult(true)

        const finalScore = score + (index === questions[current].answer ? 1 : 0)

        const high = parseInt(localStorage.getItem('quiz_intro_highscore') || 0)
        if (finalScore > high) {
          localStorage.setItem('quiz_intro_highscore', finalScore)
        }

        if (finalScore >= 4) {
          localStorage.setItem('mid_level_unlocked', 'true')
        }
      }
    }, 1000)
  }

  const restartQuiz = () => {
    setQuestions(getQuestions())
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowResult(false)
  }

  const goBack = () => {
    navigate('/classroom')
  }

  if (questions.length === 0) return <p>載入中...</p>

  const q = questions[current]

  if (showResult) {
    const passed = score >= 4
    return (
      <div className="lesson-container" style={{ position: 'relative' }}>
        <div className="confetti"></div>
        <h2>{passed ? '🎉 恭喜你通過初階測驗！' : '😢 未通過，請再試一次！'}</h2>
        <p>你答啱咗 {score} / {questions.length} 題。</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={restartQuiz} className="option-btn">🔁 重新挑戰</button>
          <button onClick={goBack} className="option-btn">⬅️ 回到學堂</button>
        </div>
      </div>
    )
  }

  return (
    <div className="lesson-container">
      <h2>🌟 初階綜合測驗</h2>
      <p className="question">第 {current + 1} 題：{q.question}</p>
      <div className="options">
        {q.options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${selected !== null ? (i === q.answer ? 'correct' : i === selected ? 'wrong' : '') : ''}`}
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
