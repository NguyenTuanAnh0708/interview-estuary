import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Flex, Text, Button } from '@radix-ui/themes'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      Hello Word
      <Button>
        Bookmark
      </Button>
    </div>
  )
}

export default App
