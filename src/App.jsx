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
      <p>TEMP LOGO</p>
      <ul>
        <li>Home</li>
        <li>Games</li>
        <li>About</li>
        <li>Contact</li>
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
        <span> worth obsessing over.</span>
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

function App() {
  return (
    <main>
      <Navbar />
      <CuratedDiscoveriesBox />

      {placeholderRows.map(row => (
        <PlaceholderCarousel key={row.title} title={row.title} items={row.items} />
      ))}
    </main>
  )
}

export default App
