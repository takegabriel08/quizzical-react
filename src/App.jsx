import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import Opening from './components/Opening'
import Quiz from './components/Quiz'
import './App.css'

function App() {
  const [firstPage, setFirstPage] = useState(true)
  const [quizData, setQuizData] = useState([])
  const [gameEnd, setGameEnd] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(5)
  const [name, setName] = useState('')

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=0&difficulty=easy`)
      .then(res => res.json())
      .then(data => setQuizData(data.results))
  }, [gameEnd])

  function restart() {
    setGameEnd(prev => !prev)
  }

  function hideFirstPage() {
    setFirstPage(prev => !prev)
  }

  return (
    <div className="App">
      {firstPage ?
        <Opening
          getUserName={getUserName}
          firstPage={firstPage}
          hideFirstPage={hideFirstPage}
        /> :
        <Quiz
          userName={name}
          data={quizData}
          totalQuestions={totalQuestions}
          restart={restart}
          gameEnd={gameEnd}
        />}
    </div>
  )
}

export default App
