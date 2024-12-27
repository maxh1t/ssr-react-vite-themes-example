import reactLogo from './assets/react.svg'

import viteLogo from '/vite.svg'

import { Theme } from '@/shared'

import Card from './Card'
import { ThemeProvider } from './theme'

import './App.css'

type AppProps = {
  theme?: Theme
}

function App({ theme }: AppProps) {
  return (
    <ThemeProvider defaultTheme={theme}>
      <div>
        <a href='https://vite.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Card />
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </ThemeProvider>
  )
}

export default App
