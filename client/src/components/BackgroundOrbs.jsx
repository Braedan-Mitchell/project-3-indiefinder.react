import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const ORB_COUNT = 8
const EDGE_RATIO = 0.85

const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min
}

const randomEdgePosition = () => {
  const side = Math.floor(Math.random() * 4)

  if (side === 0) {
    return { top: randomBetween(4, 18), left: randomBetween(6, 94) }
  }

  if (side === 1) {
    return { top: randomBetween(82, 96), left: randomBetween(6, 94) }
  }

  if (side === 2) {
    return { top: randomBetween(8, 92), left: randomBetween(4, 18) }
  }

  return { top: randomBetween(8, 92), left: randomBetween(82, 96) }
}

const randomCenterPosition = () => {
  return {
    top: randomBetween(24, 76),
    left: randomBetween(24, 76)
  }
}

const createOrbs = () => {
  const edgeCount = Math.round(ORB_COUNT * EDGE_RATIO)

  return Array.from({ length: ORB_COUNT }, (_, index) => {
    const useEdgePlacement = index < edgeCount
    const position = useEdgePlacement ? randomEdgePosition() : randomCenterPosition()
    const size = randomBetween(56, 132)
    const duration = randomBetween(32, 48)
    const delay = randomBetween(0, 10)
    const toneClass = `background-orbs__orb--tone-${(index % 3) + 1}`
    const motionClass = index % 2 === 0 ? 'background-orbs__orb--slow' : 'background-orbs__orb--medium'

    return {
      id: index,
      className: `background-orbs__orb ${toneClass} ${motionClass}`,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        top: `${position.top}%`,
        left: `${position.left}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`
      }
    }
  })
}

export default function BackgroundOrbs() {
  const { pathname } = useLocation()
  const orbs = useMemo(() => createOrbs(), [pathname])

  return (
    <div className="background-orbs">
      {orbs.map(orb => (
        <div key={`${pathname}-${orb.id}`} className={orb.className} style={orb.style}></div>
      ))}
    </div>
  )
}
