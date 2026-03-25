import { useState } from 'react'
import './Carousel.css'

function Carousel({ games }) {
  const [index, setIndex] = useState(0)

  if (!games || games.length === 0) return null

  const showButtons = games.length > 1

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
            <article className="carousel__slide" key={game.id}>
              <div className="carousel__image-wrap">
                <img className="carousel__image" src={game.image} alt={game.title} />
              </div>
              <div className="carousel__content">
                <h3 className="carousel__title">{game.title}</h3>
                <div className="carousel__meta" aria-label="Genres">
                {genres.length > 0
                  ? genres.map(g => (
                      <span key={g} className="carousel__badge">
                        {g}
                      </span>
                    ))
                  : <span className="carousel__badge">N/A</span>}
                </div>
                <div className="carousel__stats">
                  <span>${game.price.toFixed(2)}</span>
                  <span>{game.rating}/10</span>
                </div>
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
    </div>
  )
}

export default Carousel
