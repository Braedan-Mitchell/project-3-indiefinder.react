import { useState } from 'react'

function useExpandedGameOverlay() {
  const [expandedGame, setExpandedGame] = useState(null)
  const [sourceRect, setSourceRect] = useState(null)

  const handleExpand = (game, rect) => {
    setSourceRect(rect)
    setExpandedGame(game)
  }

  const handleClose = () => {
    setExpandedGame(null)
    setSourceRect(null)
  }

  return {
    expandedGame,
    sourceRect,
    handleExpand,
    handleClose,
  }
}

export default useExpandedGameOverlay
