import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Opening from './components/Opening'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Opening />
    </div>
  )
}

export default App
