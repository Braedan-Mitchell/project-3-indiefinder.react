function RouteTransitionOverlay({ stage }) {
  if (stage === 'idle') {
    return null
  }

  return (
    <div
      className={`route-transition route-transition--${stage}`}
      aria-hidden="true"
    >
      <div className="route-transition__sheet">
        <div className="route-transition__status">Loading...</div>

        <div className="route-transition__rail route-transition__rail--front">
          <div className="route-transition__orb route-transition__orb--1"></div>
          <div className="route-transition__orb route-transition__orb--2"></div>
          <div className="route-transition__orb route-transition__orb--3"></div>
          <div className="route-transition__orb route-transition__orb--4"></div>
          <div className="route-transition__orb route-transition__orb--5"></div>
          <div className="route-transition__orb route-transition__orb--6"></div>
        </div>

        <div className="route-transition__rail route-transition__rail--rear">
          <div className="route-transition__orb route-transition__orb--7"></div>
          <div className="route-transition__orb route-transition__orb--8"></div>
          <div className="route-transition__orb route-transition__orb--9"></div>
          <div className="route-transition__orb route-transition__orb--10"></div>
          <div className="route-transition__orb route-transition__orb--11"></div>
        </div>
      </div>
    </div>
  )
}

export default RouteTransitionOverlay
