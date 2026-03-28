import { useState } from 'react'
import './Carousel.css'
import { formatPrice } from '../utils/formatters'
import GameCardExpanded from './GameCardExpanded'
import useExpandedGameOverlay from '../hooks/useExpandedGameOverlay'

function Carousel({ games, activeFields = new Set() }) {
  const [index, setIndex] = useState(0)
  const { expandedGame, sourceRect, handleExpand, handleClose } = useExpandedGameOverlay()

  if (!games || games.length === 0) return null

  const showButtons = games.length > 1
  const showGenres = activeFields.has('genres')
  const showPrice = activeFields.has('price')
  const showRating = activeFields.has('rating')
  const showDate = activeFields.has('date')

  return (
    <div className="carousel" aria-roledescription="carousel">
      <div
        className="carousel__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {games.map(game => {
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
        })}
      </div>

      {showButtons && (
        <>
          <button
            className="carousel__button carousel__button--prev"
            aria-label="Previous slide"
            onClick={() => setIndex(i => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            ‹
          </button>
          <button
            className="carousel__button carousel__button--next"
            aria-label="Next slide"
            onClick={() => setIndex(i => Math.min(games.length - 1, i + 1))}
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
