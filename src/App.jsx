const placeholderRows = [
  {
    title: 'Featured Finds',
    items: ['Placeholder Game 1', 'Placeholder Game 2', 'Placeholder Game 3'],
  },
  {
    title: 'Newer Games',
    items: ['Placeholder Game 1', 'Placeholder Game 2', 'Placeholder Game 3'],
  },
  {
    title: 'Popular Games',
    items: ['Placeholder Game 1', 'Placeholder Game 2', 'Placeholder Game 3'],
  },
  {
    title: 'Cheaper Games',
    items: ['Placeholder Game 1', 'Placeholder Game 2', 'Placeholder Game 3'],
  },
]

function Navbar() {
  return (
    <nav className="site-nav">
      <div className="site-nav__inner">
        <NavLink className="site-nav__brand" to="/" end>
          <span className="site-nav__brand-wordmark">INDIEFINDER</span>
        </NavLink>
        <div className="site-nav__links">
          <NavLink className="site-nav__link" to="/" end>Home</NavLink>
          <NavLink className="site-nav__link" to="/games">Games</NavLink>
          <NavLink className="site-nav__link" to="/about">About</NavLink>
          <NavLink className="site-nav__link" to="/contact">Contact</NavLink>
        </div>
      </div>
    </nav>
  )
}

function CuratedDiscoveriesBox() {
  return (
    <section className="page-hero">
      <div className="page-hero__content">
        <p className="page-hero__eyebrow">Curated Indie Discoveries</p>
        <h1 className="page-hero__title">
          Find the next game
          <span className="page-hero__accent"> worth obsessing over.</span>
        </h1>
        <p className="page-hero__description">
          Indiefinder highlights smaller studios, stranger ideas, and the kinds
          of games that usually get buried under larger releases.
        </p>
      </div>
    </section>
  )
}

function PlaceholderCarousel({ title, items }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>
        {items.map(item => (
          <article key={`${title}-${item}`}>
            <h3>{item}</h3>
            <p>Temporary card content</p>
          </article>
        ))}
      </div>
    </section>
  )
}

import { Route, Routes, NavLink } from 'react-router-dom'
import './styles/base.css'
import './components/Navbar.css'
import Games from './pages/Games'
import About from './pages/About'
import Contact from './pages/Contact'

function Home() {
  return (
    <>
      <CuratedDiscoveriesBox />

      {placeholderRows.map(row => (
        <PlaceholderCarousel key={row.title} title={row.title} items={row.items} />
      ))}
    </>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
