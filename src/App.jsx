import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import Opening from './components/Opening'
import Quiz from './components/Quiz'
import './App.css'

function App() {
  const [firstPage, setFirstPage] = useState(true)
  const [quizData, setQuizData] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=9')
      .then(res => res.json())
      .then(data => setQuizData(data.results))
  }, [])

  function hideFirstPage() {
    setFirstPage(prev => !prev)
  }

  return (
    <div className="App">
      {firstPage ?
        <Opening
          firstPage={firstPage}
          hideFirstPage={hideFirstPage}
        /> :
        <Quiz
          data={quizData}
        />}
    </div>
  )
}

export default App
