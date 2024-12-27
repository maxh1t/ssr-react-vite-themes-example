import Cookies from 'js-cookie'

import { CLIENT_THEME_COOKIE_KEY, SERVER_THEME_COOKIE_KEY, Theme } from '@/shared'

import { SSR } from '../constants'

export function resolveSystemTheme() {
  if (SSR) return Theme.Light
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light
}

export function updateTheme(theme: Theme) {
  if (SSR) return

  const resolvedTheme = theme === Theme.System ? resolveSystemTheme() : theme

  Cookies.set(CLIENT_THEME_COOKIE_KEY, theme)
  Cookies.set(SERVER_THEME_COOKIE_KEY, resolvedTheme)

  window.document.documentElement.classList.toggle('dark', resolvedTheme === Theme.Dark)
}

export function getDefaultTheme(): Theme {
  if (SSR) return Theme.System

  const theme = (Cookies.get(CLIENT_THEME_COOKIE_KEY) as Theme) || Theme.System

  updateTheme(theme)
  return theme
}
