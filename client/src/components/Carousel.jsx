import { useEffect, useRef, useState } from 'react'
import './Carousel.css'
import { formatPrice } from '../utils/formatters'
import GameCardExpanded from './GameCardExpanded'
import useExpandedGameOverlay from '../hooks/useExpandedGameOverlay'
import { useUiSettings } from '../context/UiSettingsContext'

function Carousel({ games, activeFields = new Set() }) {
  const [index, setIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [fadePhase, setFadePhase] = useState('idle')
  const fadeTimersRef = useRef([])
  const { expandedGame, sourceRect, handleExpand, handleClose } = useExpandedGameOverlay()
  const { isMotionSicknessMode } = useUiSettings()

  if (!games || games.length === 0) return null

  useEffect(() => {
    return () => {
      fadeTimersRef.current.forEach(timerId => clearTimeout(timerId))
      fadeTimersRef.current = []
    }
  }, [])

  useEffect(() => {
    if (!isMotionSicknessMode) {
      setDisplayIndex(index)
      setFadePhase('idle')
    }
  }, [index, isMotionSicknessMode])

  const showButtons = games.length > 1
  const showGenres = activeFields.has('genres')
  const showPrice = activeFields.has('price')
  const showRating = activeFields.has('rating')
  const showDate = activeFields.has('date')

  const transitionToIndex = targetIndex => {
    if (!isMotionSicknessMode) {
      setIndex(targetIndex)
      return
    }

    if (targetIndex === displayIndex || fadePhase !== 'idle') {
      return
    }

    setFadePhase('out')

    const outTimerId = setTimeout(() => {
      setDisplayIndex(targetIndex)
      setIndex(targetIndex)
      setFadePhase('in')

      const inTimerId = setTimeout(() => {
        setFadePhase('idle')
      }, 170)

      fadeTimersRef.current.push(inTimerId)
    }, 140)

    fadeTimersRef.current.push(outTimerId)
  }

  const renderSlide = game => {
    const genres = Array.isArray(game.genre)
      ? game.genre
      : game.genre
      ? [game.genre]
      : []

    return (
      <article
        className="carousel__slide"
        key={game.id}
        onClick={e => handleExpand(game, e.currentTarget.getBoundingClientRect())}
      >
        <div className="carousel__image-wrap">
          <img className="carousel__image" src={game.image} alt={game.title} />
        </div>
        <div className="carousel__content">
          <h3 className="carousel__title">{game.title}</h3>
          {showGenres && (
            <div className="carousel__meta" aria-label="Genres">
              {(genres.length > 0 ? genres : ['N/A']).map(g => (
                <span key={g} className="carousel__badge">
                  {g}
                </span>
              ))}
            </div>
          )}
          {(showPrice || showRating || showDate) && (
            <div className="carousel__stats">
              {showPrice && <span>{formatPrice(game.price)}</span>}
              {showRating && <span>{game.rating}/10</span>}
              {showDate && <span>{game.date}</span>}
            </div>
          )}
        </div>
      </article>
    )
  }

  return (
    <div className={`carousel ${isMotionSicknessMode ? 'carousel--reduced' : ''}`} aria-roledescription="carousel">
      {isMotionSicknessMode ? (
        <div className={`carousel__fade-stage carousel__fade-stage--${fadePhase}`}>
          {renderSlide(games[displayIndex])}
        </div>
      ) : (
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {games.map(renderSlide)}
        </div>
      )}

      {showButtons && (
        <>
          <button
            className="carousel__button carousel__button--prev"
            aria-label="Previous slide"
            onClick={() => transitionToIndex(Math.max(0, index - 1))}
            disabled={index === 0}
          >
            ‹
          </button>
          <button
            className="carousel__button carousel__button--next"
            aria-label="Next slide"
            onClick={() => transitionToIndex(Math.min(games.length - 1, index + 1))}
            disabled={index === games.length - 1}
          >
            ›
          </button>
        </>
      )}

      {expandedGame && (
        <GameCardExpanded
          game={expandedGame}
          sourceRect={sourceRect}
          onClose={handleClose}
        />
      )}
    </div>
  )
}

export default Carousel
