import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { formatPrice } from '../utils/formatters'
import { useUiSettings } from '../context/UiSettingsContext'
import './GameCardExpanded.css'

function GameCardExpanded({ game, sourceRect, onClose }) {
  // 'entering' → no transition, panel sits at card rect
  // 'open'     → transitions applied, panel is fullscreen, content visible
  // 'closing'  → transitions applied, panel returns to card rect
  const [phase, setPhase] = useState('entering')
  const { isMotionSicknessMode } = useUiSettings()

  // Trigger expansion after the first paint so the starting position renders without animation
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase('open'))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const close = useCallback(() => {
    if (phase !== 'open') return
    setPhase('closing')
  }, [phase])

  // ESC key support
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  // Fallback in case transitionend doesn't fire
  useEffect(() => {
    if (phase !== 'closing') return
    const fallback = setTimeout(onClose, isMotionSicknessMode ? 260 : 600)
    return () => clearTimeout(fallback)
  }, [phase, onClose, isMotionSicknessMode])

  const handleTransitionEnd = (e) => {
    const closeProperty = isMotionSicknessMode ? 'opacity' : 'width'

    if (phase === 'closing' && e.propertyName === closeProperty) {
      onClose()
    }
  }

  const isOpen = phase === 'open'
  const hasTransition = !isMotionSicknessMode && phase !== 'entering'
  const edgeMargin = window.innerWidth <= 700 ? 10 : 18

  const panelStyle = isMotionSicknessMode
    ? {
        top: edgeMargin,
        left: edgeMargin,
        width: `calc(100vw - ${edgeMargin * 2}px)`,
        height: `calc(100vh - ${edgeMargin * 2}px)`,
        borderRadius: '22px',
      }
    : isOpen
    ? {
        top: edgeMargin,
        left: edgeMargin,
        width: `calc(100vw - ${edgeMargin * 2}px)`,
        height: `calc(100vh - ${edgeMargin * 2}px)`,
        borderRadius: '22px',
      }
    : {
        top: sourceRect.top,
        left: sourceRect.left,
        width: sourceRect.width,
        height: sourceRect.height,
        borderRadius: '18px',
      }

  return createPortal(
    <div
      className={`gcx-backdrop${isOpen ? ' gcx-backdrop--visible' : ''}`}
      onClick={close}
    >
      <div
        className={`gcx-panel${hasTransition ? ' gcx-panel--transition' : ''}${isOpen ? ' gcx-panel--visible' : ''}`}
        data-motion-mode={isMotionSicknessMode ? 'reduced' : 'default'}
        style={panelStyle}
        onClick={e => e.stopPropagation()}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={`gcx-inner${isOpen ? ' gcx-inner--visible' : ''}${isMotionSicknessMode ? ' gcx-inner--reduced' : ''}`}>
          <div className="gcx-header">
            <button className="gcx-back" onClick={close}>← Back</button>
          </div>

          <div className="gcx-scroll">
            <img src={game.image} alt={game.title} className="gcx-hero" />

            <div className="gcx-details">
              <div className="gcx-title-row">
                <h2 className="gcx-title">{game.title}</h2>
                <span className="gcx-price">{formatPrice(game.price)}</span>
              </div>

              <div className="gcx-pills">
                <span className="gcx-pill gcx-pill--rating">⭐ {game.rating} / 10</span>
                <span className="gcx-pill gcx-pill--date">📅 {game.date}</span>
              </div>

              <div className="gcx-section">
                <span className="gcx-label">Genres</span>
                <p className="gcx-value">{game.genre.join(' • ')}</p>
              </div>

              <div className="gcx-section">
                <span className="gcx-label">Platforms</span>
                <div className="gcx-platforms">
                  {game.console.map(c => (
                    <span key={c} className="gcx-platform-tag">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default GameCardExpanded
