import './GameCard.css'

function GameCard({ game }) {
  return (
    <article className="game-card">
      <img
        src={game.image}
        alt={game.title}
        className="game-card__image"
      />
      <div className="game-card__body">
        <div className="game-card__topline">
          <span className="game-card__rating">{game.rating}/10</span>
          <span className="game-card__date">{game.date}</span>
        </div>
        <h3 className="game-card__title">{game.title}</h3>
        <p className="game-card__genres">{game.genre.join(' • ')}</p>
        <p className="game-card__consoles">{game.console.join(', ')}</p>
        <div className="game-card__footer">
          <span className="game-card__price">${game.price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  )
}

export default GameCard
