import { useState } from 'react'

import { Theme } from '@/shared'

import { useThemeContext } from './theme'

function Card() {
  const { theme, setTheme } = useThemeContext()
  const [count, setCount] = useState(0)

  return (
    <div className='card'>
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <div>
        Themes:{' '}
        <select value={theme} onChange={(event) => setTheme(event.target.value as Theme)}>
          <option value={Theme.System}>System</option>
          <option value={Theme.Light}>Light</option>
          <option value={Theme.Dark}>Dark</option>
        </select>
      </div>
    </div>
  )
}

export default Card
