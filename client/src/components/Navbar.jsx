import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar({ isTransitioning, onNavigateWithTransition }) {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  const handleNavigation = (event, path) => {
    if (isTransitioning) {
      event.preventDefault()
      return
    }

    event.preventDefault()
    closeMenu()
    onNavigateWithTransition(path)
  }

  return (
    <nav className="site-nav">
      <div className="site-nav__inner">
        <NavLink
          className="site-nav__brand"
          to="/"
          end
          onClick={event => handleNavigation(event, '/')}
        >
          <span className="site-nav__brand-wordmark" aria-label="indiefinder">
            <span className="site-nav__i-accent">&#x131;</span>
            <span>ND</span>
            <span className="site-nav__i-accent">&#x131;</span>
            <span>EF</span>
            <span className="site-nav__i-accent">&#x131;</span>
            <span>NDER</span>
          </span>
        </NavLink>

        <button
          className="site-nav__toggle"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(previousState => !previousState)}
        >
          ☰
        </button>

        <div className={`site-nav__links ${isOpen ? 'is-open' : ''}`}>
          <NavLink className="site-nav__link" to="/" end onClick={event => handleNavigation(event, '/')}>Home</NavLink>
          <NavLink className="site-nav__link" to="/games" onClick={event => handleNavigation(event, '/games')}>Games</NavLink>
          <NavLink className="site-nav__link" to="/about" onClick={event => handleNavigation(event, '/about')}>About</NavLink>
          <NavLink className="site-nav__link" to="/contact" onClick={event => handleNavigation(event, '/contact')}>Contact</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
