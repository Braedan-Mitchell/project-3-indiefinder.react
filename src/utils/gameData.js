import rawData from '../data/games.json'

export const allGames = rawData.games

export const genreOptions = [
  { value: '', label: 'All Genres' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'puzzle', label: 'Puzzle' },
  { value: 'rpg', label: 'RPG' },
  { value: 'action', label: 'Action' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'simulation', label: 'Simulation' },
]

export const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
]

export const initialGameFilters = {
  search: '',
  genre: '',
  sort: 'name-asc',
  minRating: 1,
  selectedConsole: '',
  maxPrice: 50,
}

export function parseGameDate(dateString) {
  if (!dateString) {
    return new Date(0)
  }

  const [month, day, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day)
}

export function getRandomGames(games, count) {
  return [...games].sort(() => Math.random() - 0.5).slice(0, count)
}

export function getNewestGames(games, count) {
  return [...games]
    .sort((a, b) => parseGameDate(b.date) - parseGameDate(a.date))
    .slice(0, count)
}

export function getPopularGames(games, count) {
  return [...games]
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, count)
}

export function getCheapestGames(games, count) {
  return [...games]
    .sort((a, b) => Number(a.price) - Number(b.price))
    .slice(0, count)
}

export function getAllConsoles(games) {
  return [...new Set(games.flatMap(game => game.console || []))].sort((a, b) =>
    a.localeCompare(b)
  )
}

export function filterAndSortGames(games, filters) {
  const filteredGames = games.filter(game => {
    const name = game.title.toLowerCase()
    const genres = game.genre.map(genre => genre.toLowerCase()).join(', ')
    const consoles = (game.console || []).map(consoleName =>
      consoleName.toLowerCase()
    )

    return (
      name.includes(filters.search.toLowerCase()) &&
      (filters.genre === '' || genres.includes(filters.genre.toLowerCase())) &&
      game.price <= filters.maxPrice &&
      parseFloat(game.rating) >= filters.minRating &&
      (filters.selectedConsole === '' ||
        consoles.includes(filters.selectedConsole.toLowerCase()))
    )
  })

  return filteredGames.sort((a, b) => {
    switch (filters.sort) {
      case 'name-asc':
        return a.title.localeCompare(b.title)
      case 'name-desc':
        return b.title.localeCompare(a.title)
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return parseGameDate(b.date) - parseGameDate(a.date)
      case 'oldest':
        return parseGameDate(a.date) - parseGameDate(b.date)
      default:
        return 0
    }
  })
}
