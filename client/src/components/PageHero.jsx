import './PageHero.css'

function PageHero({ eyebrow, title, description, accent, children }) {
  return (
    <header className="page-hero">
      <div className="page-hero__content">
        {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
        <h1 className="page-hero__title">
          {title}
          {accent ? <span className="page-hero__accent"> {accent}</span> : null}
        </h1>
        <p className="page-hero__description">{description}</p>
      </div>
      {children ? <div className="page-hero__aside">{children}</div> : null}
    </header>
  )
}

export default PageHero
