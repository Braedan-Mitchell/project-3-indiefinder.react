import { useState } from 'react'
import PageHero from '../components/PageHero'
import { validateContactForm, validateRecommendationForm } from '../utils/contactValidation'
import { createRecommendation, formatRecommendationReviewLog } from '../services/apiClient'
import './Contact.css'

function Contact() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', title: '', message: '' })
  const [contactErrors, setContactErrors] = useState({})
  const [contactSuccess, setContactSuccess] = useState(false)

  const [recommendForm, setRecommendForm] = useState({ recommenderName: '', gameTitle: '', gameDesc: '', foundOn: '' })
  const [recommendErrors, setRecommendErrors] = useState({})
  const [recommendSuccess, setRecommendSuccess] = useState(false)
  const [recommendApiError, setRecommendApiError] = useState('')
  const [isSubmittingRecommendation, setIsSubmittingRecommendation] = useState(false)
  const [recommendationLogs, setRecommendationLogs] = useState([])

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactForm(prev => ({ ...prev, [name]: value }))
    if (contactErrors[name]) {
      setContactErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleRecommendChange = (e) => {
    const { name, value } = e.target
    setRecommendForm(prev => ({ ...prev, [name]: value }))
    if (recommendErrors[name]) {
      setRecommendErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    const errors = validateContactForm(contactForm)
    
    if (Object.keys(errors).length === 0) {
      setContactSuccess(true)
      setContactForm({ name: '', email: '', title: '', message: '' })
      setTimeout(() => setContactSuccess(false), 3000)
    } else {
      setContactErrors(errors)
    }
  }

  const handleRecommendSubmit = async (e) => {
    e.preventDefault()
    const errors = validateRecommendationForm(recommendForm)
    
    if (Object.keys(errors).length === 0) {
      try {
        setRecommendApiError('')
        setIsSubmittingRecommendation(true)

        const createdRecommendation = await createRecommendation(recommendForm)

        setRecommendationLogs((prev) => [
          formatRecommendationReviewLog(createdRecommendation),
          ...prev,
        ])
        setRecommendSuccess(true)
        setRecommendForm({ recommenderName: '', gameTitle: '', gameDesc: '', foundOn: '' })
        setTimeout(() => setRecommendSuccess(false), 3000)
      } catch {
        setRecommendApiError('Could not submit recommendation right now. Please try again.')
      } finally {
        setIsSubmittingRecommendation(false)
      }
    } else {
      setRecommendErrors(errors)
    }
  }

  return (
    <main>
      <PageHero
        eyebrow="Reach Out"
        title="Send feedback"
        accent="or spotlight a hidden gem."
        description="Use the forms below to send a question, share feedback, or recommend an indie game that deserves more attention."
      />

      <div className="page-shell">
        <div className="contact-layout">
          <div className="contact-panel">
            <h2 className="contact-panel__title">Questions & Feedback</h2>
            <p className="contact-panel__text">Have a question or want to share feedback? We'd love to hear from you.</p>
            
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-form__field">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  placeholder="Enter your name"
                />
                {contactErrors.name && <span className="form-error">{contactErrors.name}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder="you@example.com"
                />
                {contactErrors.email && <span className="form-error">{contactErrors.email}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="title">Subject</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={contactForm.title}
                  onChange={handleContactChange}
                  placeholder="What's this about?"
                />
                {contactErrors.title && <span className="form-error">{contactErrors.title}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="Tell us what's on your mind..."
                />
                {contactErrors.message && <span className="form-error">{contactErrors.message}</span>}
              </div>

              <button type="submit" className="contact-form__button">Send Message</button>
              {contactSuccess && <div className="form-success">✓ Thanks for reaching out!</div>}
            </form>
          </div>

          <div className="contact-panel">
            <h2 className="contact-panel__title">Recommend a Game</h2>
            <p className="contact-panel__text">Found an indie game that deserves more attention? Let us know!</p>
            
            <form className="contact-form" onSubmit={handleRecommendSubmit}>
              <div className="contact-form__field">
                <label htmlFor="recommenderName">Your Name</label>
                <input
                  id="recommenderName"
                  type="text"
                  name="recommenderName"
                  value={recommendForm.recommenderName}
                  onChange={handleRecommendChange}
                  placeholder="Enter your name"
                />
                {recommendErrors.recommenderName && <span className="form-error">{recommendErrors.recommenderName}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="gameTitle">Game Title</label>
                <input
                  id="gameTitle"
                  type="text"
                  name="gameTitle"
                  value={recommendForm.gameTitle}
                  onChange={handleRecommendChange}
                  placeholder="Name of the game"
                />
                {recommendErrors.gameTitle && <span className="form-error">{recommendErrors.gameTitle}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="gameDesc">Why Should We Feature It?</label>
                <textarea
                  id="gameDesc"
                  name="gameDesc"
                  rows="3"
                  value={recommendForm.gameDesc}
                  onChange={handleRecommendChange}
                  placeholder="Brief description (max 200 characters)"
                />
                {recommendErrors.gameDesc && <span className="form-error">{recommendErrors.gameDesc}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="foundOn">Where Can We Play It?</label>
                <select
                  id="foundOn"
                  name="foundOn"
                  value={recommendForm.foundOn}
                  onChange={handleRecommendChange}
                >
                  <option value="">-- Select a platform --</option>
                  <option value="steam">Steam</option>
                  <option value="itch">Itch.io</option>
                  <option value="epic">Epic Games</option>
                  <option value="console">Console</option>
                  <option value="other">Other</option>
                </select>
                {recommendErrors.foundOn && <span className="form-error">{recommendErrors.foundOn}</span>}
              </div>

              <button type="submit" className="contact-form__button" disabled={isSubmittingRecommendation}>
                {isSubmittingRecommendation ? 'Submitting...' : 'Recommend Game'}
              </button>
              {recommendSuccess && <div className="form-success">✓ Thanks for the recommendation!</div>}
              {recommendApiError && <div className="form-error">{recommendApiError}</div>}
            </form>

            {recommendationLogs.length > 0 && (
              <div className="recommendation-log" aria-live="polite">
                <h3 className="recommendation-log__title">Review Queue</h3>
                <ul className="recommendation-log__list">
                  {recommendationLogs.map((logEntry, index) => (
                    <li key={`${logEntry}-${index}`} className="recommendation-log__item">
                      {logEntry}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact
