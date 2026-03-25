import { Route, Routes, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import './styles/base.css'
import './components/Navbar.css'
import './components/BackgroundOrbs.css'
import './components/RouteTransitionOverlay.css'
import BackgroundOrbs from './components/BackgroundOrbs'
import RouteTransitionOverlay from './components/RouteTransitionOverlay'
import Home from './pages/Home'
import Games from './pages/Games'
import About from './pages/About'
import Contact from './pages/Contact'

function Navbar({ onNavigateWithTransition, isTransitioning }) {
  const handleNavigation = (event, path) => {
    if (isTransitioning) {
      event.preventDefault()
      return
    }
    event.preventDefault()
    onNavigateWithTransition(path)
  }

  return (
    <nav className="site-nav">
      <div className="site-nav__inner">
        <NavLink className="site-nav__brand" to="/" end onClick={(e) => handleNavigation(e, '/')}>
          <span className="site-nav__brand-wordmark">INDIEFINDER</span>
        </NavLink>
        <div className="site-nav__links">
          <NavLink className="site-nav__link" to="/" end onClick={(e) => handleNavigation(e, '/')}>Home</NavLink>
          <NavLink className="site-nav__link" to="/games" onClick={(e) => handleNavigation(e, '/games')}>Games</NavLink>
          <NavLink className="site-nav__link" to="/about" onClick={(e) => handleNavigation(e, '/about')}>About</NavLink>
          <NavLink className="site-nav__link" to="/contact" onClick={(e) => handleNavigation(e, '/contact')}>Contact</NavLink>
        </div>
      </div>
    </nav>
  )
}

function App() {
  const COVER_DURATION_MS = 620
  const HOLD_DURATION_MS = 300
  const REVEAL_DURATION_MS = 700

  const navigate = useNavigate()
  const location = useLocation()
  const [transitionStage, setTransitionStage] = useState('idle')
  const timersRef = useRef([])

  const clearTimers = () => {
    timersRef.current.forEach(timeoutId => {
      clearTimeout(timeoutId)
    })
    timersRef.current = []
  }

  const startTransitionNavigation = targetPath => {
    if (transitionStage !== 'idle' || targetPath === location.pathname) {
      return
    }

    clearTimers()
    setTransitionStage('cover')

    const coverTimerId = setTimeout(() => {
      navigate(targetPath)
      setTransitionStage('hold')

      const holdTimerId = setTimeout(() => {
        setTransitionStage('reveal')

        const revealTimerId = setTimeout(() => {
          setTransitionStage('idle')
          clearTimers()
        }, REVEAL_DURATION_MS)

        timersRef.current.push(revealTimerId)
      }, HOLD_DURATION_MS)

      timersRef.current.push(holdTimerId)
    }, COVER_DURATION_MS)

    timersRef.current.push(coverTimerId)
  }

  useEffect(() => {
    return () => {
      clearTimers()
    }
  }, [])

  return (
    <div className="app-shell">
      <BackgroundOrbs />
      <RouteTransitionOverlay stage={transitionStage} />
      <Navbar onNavigateWithTransition={startTransitionNavigation} isTransitioning={transitionStage !== 'idle'} />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
