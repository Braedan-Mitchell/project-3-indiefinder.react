const API_BASE_URL = '/api'

export const apiRoutes = {
  games: '/games',
  contacts: '/contacts',
  recommendations: '/recommendations',
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`)
  }

  return response.json()
}

export function createContact(payload) {
  return apiRequest(apiRoutes.contacts, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function createRecommendation(payload) {
  return apiRequest(apiRoutes.recommendations, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function formatRecommendationReviewLog(recommendation) {
  return `${recommendation.recommenderName} recommended ${recommendation.gameTitle}! it is in review`
}
