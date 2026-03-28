import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import PageHero from '../components/PageHero'
import { useAppData } from '../context/AppDataContext'
import {
  getCheapestGames,
  getNewestGames,
  getPopularGames,
  getRandomGames,
} from '../utils/gameData'
import './Home.css'

const CAROUSEL_FIELDS = {
  featured: new Set(),
  newer: new Set(['date']),
  popular: new Set(['rating']),
  cheaper: new Set(['price']),
}

function StatusCarousel({ games, statusMessage, activeFields }) {
  if (statusMessage) {
    return <p>{statusMessage}</p>
  }

  return <Carousel games={games} activeFields={activeFields} />
}

function Home() {
  const { games, gamesError, isGamesLoading } = useAppData()

  const featured = useMemo(
    () => getRandomGames(games, 3),
    [games]
  )
  const newer = useMemo(() => getNewestGames(games, 3), [games])
  const popular = useMemo(() => getPopularGames(games, 3), [games])
  const cheaper = useMemo(() => getCheapestGames(games, 3), [games])

  const statusMessage = isGamesLoading
    ? 'Loading catalog...'
    : gamesError || ''

  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Curated Indie Discoveries"
        title="Find the next game"
        accent="worth obsessing over."
        description="Indiefinder highlights smaller studios, stranger ideas, and the kinds of games that usually get buried under larger releases."
      >
        <div className="home-meta">
          <div className="home-meta__card">
            <span className="home-meta__value">{isGamesLoading ? '...' : games.length}</span>
            <span className="home-meta__label">Curated entries</span>
          </div>
          <div className="home-meta__card">
            <span className="home-meta__value">6+</span>
            <span className="home-meta__label">Genre paths</span>
          </div>
          <div className="home-meta__card">
            <span className="home-meta__value">8</span>
            <span className="home-meta__label">Platforms tracked</span>
          </div>
        </div>
      </PageHero>

      <section className="home-feature">
        <div className="section-heading">
          <div>
            <h2>Featured finds</h2>
            <p>Hand-picked from the catalog to give the homepage a different pulse every time.</p>
          </div>
        </div>
        <StatusCarousel games={featured} statusMessage={statusMessage} activeFields={CAROUSEL_FIELDS.featured} />
      </section>

      <section className="home-rail">
        <div className="section-heading">
          <div>
            <h2>Three ways to browse</h2>
            <p>Sort by freshness, crowd appeal, or price if you just want something great tonight.</p>
          </div>
        </div>

        <div className="home-rail-grid">
          <div>
            <div className="section-heading">
              <h2>Newer Games</h2>
            </div>
            <StatusCarousel games={newer} statusMessage={statusMessage} activeFields={CAROUSEL_FIELDS.newer} />
          </div>

          <div>
            <div className="section-heading">
              <h2>Popular Games</h2>
            </div>
            <StatusCarousel games={popular} statusMessage={statusMessage} activeFields={CAROUSEL_FIELDS.popular} />
          </div>

          <div>
            <div className="section-heading">
              <h2>Cheaper Games</h2>
            </div>
            <StatusCarousel games={cheaper} statusMessage={statusMessage} activeFields={CAROUSEL_FIELDS.cheaper} />
          </div>
        </div>
      </section>

      <section className="home-cta">
        <h2>Want the full catalog?</h2>
        <p>
          Head to the <Link className="site-link" to="/games">Games page</Link> to sort, filter, and compare the library in detail.
        </p>
      </section>
    </div>
  )
}

export default Home
