import { useMemo, useState } from 'react'
import {
  filterAndSortGames,
  getAllConsoles,
  initialGameFilters,
} from '../../../server/utils/gameData'

function useGameFilters(games) {
  const [filters, setFilters] = useState(initialGameFilters)

  const consoles = useMemo(() => getAllConsoles(games), [games])

  const filteredGames = useMemo(
    () => filterAndSortGames(games, filters),
    [games, filters]
  )

  const updateFilter = (key, value) => {
    setFilters(previousFilters => ({
      ...previousFilters,
      [key]: value,
    }))
  }

  const resetFilters = () => setFilters(initialGameFilters)

  return {
    filters,
    consoles,
    filteredGames,
    resetFilters,
    updateFilter,
  }
}

export default useGameFilters
