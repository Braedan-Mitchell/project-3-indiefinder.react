import { useMemo } from 'react'
import PageHero from '../components/PageHero'
import GameCard from '../components/GameCard'
import GameCardExpanded from '../components/GameCardExpanded'
import { useAppData } from '../context/AppDataContext'
import useExpandedGameOverlay from '../hooks/useExpandedGameOverlay'
import useGameFilters from '../hooks/useGameFilters'
import { genreOptions, sortOptions, initialGameFilters } from '../utils/gameData'
import './Games.css'

function Games() {
  const { games, gamesError, isGamesLoading } = useAppData()
  const { filters, consoles, filteredGames, updateFilter, resetFilters } = useGameFilters(games)
  const { expandedGame, sourceRect, handleExpand, handleClose } = useExpandedGameOverlay()

  const activeCardFields = useMemo(() => {
    const fields = new Set()
    if (filters.maxPrice !== initialGameFilters.maxPrice) fields.add('price')
    if (filters.minRating !== initialGameFilters.minRating) fields.add('rating')
    if (filters.genre !== initialGameFilters.genre) fields.add('genres')
    if (filters.selectedConsole !== initialGameFilters.selectedConsole) fields.add('consoles')
    if (filters.sort === 'price-low' || filters.sort === 'price-high') fields.add('price')
    if (filters.sort === 'newest' || filters.sort === 'oldest') fields.add('date')
    return fields
  }, [filters])

  return (
    <main>
      <PageHero
        eyebrow="Search The Catalog"
        title="Browse indie games"
        accent="without the noise."
        description="Use filters to cut straight to the kind of project you want, whether that means cheap, recent, highly rated, or platform-specific."
      />

      <div className="page-shell">
        <div className="games-toolbar">
          <div className="games-toolbar__grid">
            <div className="games-toolbar__field">
              <label htmlFor="search">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Game title..."
                value={filters.search}
                onChange={e => updateFilter('search', e.target.value)}
              />
            </div>

            <div className="games-toolbar__field">
              <label htmlFor="genre">Genre</label>
              <select
                id="genre"
                value={filters.genre}
                onChange={e => updateFilter('genre', e.target.value)}
              >
                {genreOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="games-toolbar__field">
              <label htmlFor="console">Platform</label>
              <select
                id="console"
                value={filters.selectedConsole}
                onChange={e => updateFilter('selectedConsole', e.target.value)}
              >
                <option value="">All Platforms</option>
                {consoles.map(c => (
                  <option key={c} value={c.toLowerCase()}>{c}</option>
                ))}
              </select>
            </div>

            <div className="games-toolbar__field">
              <label htmlFor="sort">Sort By</label>
              <select
                id="sort"
                value={filters.sort}
                onChange={e => updateFilter('sort', e.target.value)}
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="games-toolbar__field">
              <label htmlFor="maxPrice">Max Price: ${filters.maxPrice}</label>
              <input
                id="maxPrice"
                type="range"
                min={0}
                max={50}
                step={1}
                value={filters.maxPrice}
                onChange={e => updateFilter('maxPrice', Number(e.target.value))}
              />
            </div>

            <div className="games-toolbar__field">
              <label htmlFor="minRating">Min Rating: {filters.minRating}</label>
              <input
                id="minRating"
                type="range"
                min={1}
                max={10}
                step={0.5}
                value={filters.minRating}
                onChange={e => updateFilter('minRating', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="games-toolbar__footer">
            <span className="games-toolbar__summary">
              {isGamesLoading ? 'Loading games...' : `Showing ${filteredGames.length} of ${games.length} games`}
            </span>
            <button className="games-toolbar__button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>

        <div className="games-grid">
          {gamesError && <p>{gamesError}</p>}
          {!gamesError && !isGamesLoading && filteredGames.map(game => (
            <GameCard key={game.id} game={game} activeFields={activeCardFields} onExpand={handleExpand} />
          ))}
        </div>
      </div>

      {expandedGame && (
        <GameCardExpanded
          game={expandedGame}
          sourceRect={sourceRect}
          onClose={handleClose}
        />
      )}
    </main>
  )
}

export default Games
