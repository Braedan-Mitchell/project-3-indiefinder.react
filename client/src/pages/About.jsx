import PageHero from '../components/PageHero'
import './About.css'

function About() {
  return (
    <main>
      <PageHero
        eyebrow="Why This Exists"
        title="A quieter place"
        accent="to discover indie games."
        description="Indiefinder exists to give small teams more visibility and give players a better way to uncover projects that feel personal, inventive, and overlooked."
      />

      <div className="page-shell">
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card__kicker">The Mission</div>
            <h2>Why We Built This</h2>
            <p>
              App stores have become overwhelming. Between algorithmic recommendations and paid promotions, genuinely creative indie games often go unnoticed. We wanted to create a space where discovery doesn't demand your attention with notifications, but rewards your curiosity.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card__kicker">How It Works</div>
            <h2>Thoughtful Curation</h2>
            <p>
              Rather than showing everything, we hand-pick games across different moods and styles. Each game makes it to Indiefinder because it represents something worth playing—whether that's innovative gameplay, unique art, or a story you won't forget.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card__kicker">Help Us Grow</div>
            <h2>Your Voice Matters</h2>
            <p>
              Found a hidden gem we missed? Have feedback on how we're doing? We'd love to hear from you. Our community drives what gets featured, and we're always looking to improve the experience.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
