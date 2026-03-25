import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import PageHero from '../components/PageHero'
import {
  allGames,
  getCheapestGames,
  getNewestGames,
  getPopularGames,
  getRandomGames,
} from '../../../server/utils/gameData'
import './Home.css'

function Home() {
  const featured = useMemo(
    () => getRandomGames(allGames, 3),
    []
  )
  const newer = useMemo(() => getNewestGames(allGames, 3), [])
  const popular = useMemo(() => getPopularGames(allGames, 3), [])
  const cheaper = useMemo(() => getCheapestGames(allGames, 3), [])

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
            <span className="home-meta__value">{allGames.length}</span>
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
        <Carousel games={featured} />
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
          <Carousel games={newer} />
          </div>

          <div>
            <div className="section-heading">
              <h2>Popular Games</h2>
            </div>
          <Carousel games={popular} />
          </div>

          <div>
            <div className="section-heading">
              <h2>Cheaper Games</h2>
            </div>
          <Carousel games={cheaper} />
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
