import { renderToString } from 'react-dom/server'

import { Theme } from '@/shared'

import App from './App'

export function render(theme: Theme) {
  return renderToString(<App theme={theme} />)
}
