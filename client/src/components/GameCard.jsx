import './GameCard.css'
import { formatPrice } from '../utils/formatters'

function GameCard({ game, activeFields = new Set(), onExpand }) {
  const handleClick = (e) => {
    if (onExpand) onExpand(game, e.currentTarget.getBoundingClientRect())
  }
  const showPrice = activeFields.has('price')
  const showRating = activeFields.has('rating')
  const showDate = activeFields.has('date')
  const showGenres = activeFields.has('genres')
  const showConsoles = activeFields.has('consoles')

  return (
    <article className="game-card" onClick={handleClick}>
      <img
        src={game.image}
        alt={game.title}
        className="game-card__image"
      />
      <div className="game-card__body">
        {(showRating || showDate) && (
          <div className="game-card__topline">
            {showRating && <span className="game-card__rating">{game.rating}/10</span>}
            {showDate && <span className="game-card__date">{game.date}</span>}
          </div>
        )}
        <h3 className="game-card__title">{game.title}</h3>
        {showGenres && <p className="game-card__genres">{game.genre.join(' • ')}</p>}
        {showConsoles && <p className="game-card__consoles">{game.console.join(', ')}</p>}
        {showPrice && (
          <div className="game-card__footer">
            <span className="game-card__price">{formatPrice(game.price)}</span>
          </div>
        )}
      </div>
    </article>
  )
}

export default GameCard
