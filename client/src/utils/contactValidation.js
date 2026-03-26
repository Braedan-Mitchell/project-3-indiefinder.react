const nameRegex = /^[A-Za-z\s]+$/
const emailRegex = /@(?:icloud\.com|gmail\.com)$/i

export function validateContactForm(values) {
  const errors = {}

  if (!values.name) {
    errors.name = 'Please enter your name.'
  } else if (!nameRegex.test(values.name)) {
    errors.name = 'Name may contain only letters.'
  }

  if (!values.email) {
    errors.email = 'Please enter your email.'
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Email must end with @icloud.com or @gmail.com.'
  }

  if (!values.title) {
    errors.title = 'Please enter a title.'
  }

  if (!values.message) {
    errors.message = 'Please enter a message.'
  }

  return errors
}

export function validateRecommendationForm(values) {
  const errors = {}

  if (!values.recommenderName) {
    errors.recommenderName = 'Please enter your name.'
  } else if (!nameRegex.test(values.recommenderName)) {
    errors.recommenderName = 'Name may contain only letters.'
  }

  if (!values.gameTitle) {
    errors.gameTitle = 'Please enter the game title.'
  }

  if (!values.gameDesc) {
    errors.gameDesc = 'Please enter a brief description.'
  } else if (values.gameDesc.length > 200) {
    errors.gameDesc = 'Description must be 200 characters or fewer.'
  }

  if (!values.foundOn) {
    errors.foundOn = 'Please select where you found the game.'
  }

  return errors
}
