import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import Opening from './components/Opening'
import Quiz from './components/Quiz'
import './App.css'

function App() {
  const [firstPage, setFirstPage] = useState(true)
  const [quizData, setQuizData] = useState([])
  const [gameEnd, setGameEnd] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(3)
  const [name, setName] = useState('')

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${totalQuestions}`)
      .then(res => res.json())
      .then(data => setQuizData(data.results))
  }, [gameEnd, totalQuestions])

  function getNumberOfQuestions(event) {
    setTotalQuestions(event.target.value)
  }

  function getName(event) {
    setName(event.target.value)
  }

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
          getName={getName}
          getNumberOfQuestions={getNumberOfQuestions}
          firstPage={firstPage}
          hideFirstPage={hideFirstPage}
        /> :
        <Quiz
          name={name}
          data={quizData}
          totalQuestions={totalQuestions}
          restart={restart}
          gameEnd={gameEnd}
        />}
    </div>
  )
}

export default App
