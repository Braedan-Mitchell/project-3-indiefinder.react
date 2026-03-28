import { createContext, useContext, useEffect, useState } from 'react'

const UiSettingsContext = createContext(null)
const FONT_SCALE_BY_STEP = {
  '-3': 0.82,
  '-2': 0.88,
  '-1': 0.94,
  '0': 1,
  '1': 1.06,
  '2': 1.12,
  '3': 1.18,
}

function readStoredFlag(key) {
  return localStorage.getItem(key) === 'true'
}

function readStoredFontStep() {
  const parsed = Number(localStorage.getItem('indiefind-font-size-step'))

  if (Number.isInteger(parsed) && parsed >= -3 && parsed <= 3) {
    return parsed
  }

  return 0
}

export function UiSettingsProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => readStoredFlag('indiefind-dark-mode'))
  const [isMotionSicknessMode, setIsMotionSicknessMode] = useState(() => readStoredFlag('indiefind-motion-sickness-mode'))
  const [fontSizeStep, setFontSizeStep] = useState(() => readStoredFontStep())

  useEffect(() => {
    const rootElement = document.documentElement
    rootElement.classList.toggle('theme-dark', isDarkMode)
    localStorage.setItem('indiefind-dark-mode', String(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    const rootElement = document.documentElement
    rootElement.classList.toggle('motion-sickness', isMotionSicknessMode)
    localStorage.setItem('indiefind-motion-sickness-mode', String(isMotionSicknessMode))
  }, [isMotionSicknessMode])

  useEffect(() => {
    const rootElement = document.documentElement
    const fontScale = FONT_SCALE_BY_STEP[String(fontSizeStep)] ?? 1

    rootElement.style.setProperty('--font-scale', String(fontScale))
    localStorage.setItem('indiefind-font-size-step', String(fontSizeStep))
  }, [fontSizeStep])

  return (
    <UiSettingsContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        isMotionSicknessMode,
        setIsMotionSicknessMode,
        fontSizeStep,
        setFontSizeStep,
      }}
    >
      {children}
    </UiSettingsContext.Provider>
  )
}

export function useUiSettings() {
  const context = useContext(UiSettingsContext)

  if (!context) {
    throw new Error('useUiSettings must be used inside UiSettingsProvider.')
  }

  return context
}
