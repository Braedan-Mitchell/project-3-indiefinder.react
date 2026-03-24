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
    <nav>
      <div>
        <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>INDIEFINDER</span>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
        <li><Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/games" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Games</Link></li>
        <li><Link to="/about" style={{ color: 'var(--accent)', textDecoration: 'none' }}>About</Link></li>
        <li><Link to="/contact" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Contact</Link></li>
      </ul>
    </nav>
  )
}

function CuratedDiscoveriesBox() {
  return (
    <section>
      <p>Curated Indie Discoveries</p>
      <h1>
        Find the next game
        <span style={{ color: 'var(--accent)' }}> worth obsessing over.</span>
      </h1>
      <p>
        Indiefinder highlights smaller studios, stranger ideas, and the kinds
        of games that usually get buried under larger releases.
      </p>
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

import { Route, Routes, Link } from 'react-router-dom'
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
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
