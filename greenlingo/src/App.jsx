import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import GreenClassroom from './pages/GreenClassroom'
import LessonIntro from './pages/LessonIntro'
import LessonMistake from './pages/LessonMistake'
import LessonHome from './pages/LessonHome'
import LessonIntroQuiz from './pages/LessonIntroQuiz'
import DailyChallenge from './pages/DailyChallenge'
import ChallengeDetail from './pages/ChallengeDetail'
import MapView from './pages/MapView'
import Shop from './pages/Shop'
import Profile from './pages/Profile'
import { Navigate } from 'react-router-dom'
import TopBar from './components/TopBar'
import IntroSlides from './components/IntroSlides'

import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <Router>
      {showIntro && <IntroSlides onFinish={() => setShowIntro(false)} />}
      {!showIntro && (
        <>
          <TopBar />
          <div className="container">
            {/* Sidebar */}
            <div className="sidebar">
              <h2 className="logo">🌿 GreenInHome</h2>
              <ul className="menu">
                <Link to="/classroom" className="menu-item">🟢 綠色學堂</Link>
                <Link to="/challenge" className="menu-item">🔥 每日挑戰</Link>
                <Link to="/map" className="menu-item">📍 環保地圖</Link>
                <Link to="/shop" className="menu-item">🛒 綠幣之店</Link>
                <Link to="/profile" className="menu-item">👤 個人檔案</Link>
                <Link to="/settings" className="menu-item">⚙️ 設定</Link>
              </ul>
            </div>

            {/* 主內容 */}
            <div className="main">
              <Routes>
                <Route path="/classroom" element={<GreenClassroom />} />
                <Route path="/lesson/intro" element={<LessonIntro />} />
                <Route path="/lesson/mistake" element={<LessonMistake />} />
                <Route path="/lesson/home" element={<LessonHome />} />
                <Route path="/quiz/intro" element={<LessonIntroQuiz />} />
                <Route path="/challenge" element={<DailyChallenge />} />
                <Route path="/challenge/:id" element={<ChallengeDetail />} />
                <Route path="/map" element={<MapView />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/classroom" />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </Router>
  )
}

export default App
