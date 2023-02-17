import { useEffect, useState } from 'react'
import Opening from './components/Opening'
import Quiz from './components/Quiz'
import './App.css'

let easter = {
  url: import.meta.env.VITE_URL,
  string: import.meta.env.VITE_STRING
};

function App() {
  const [firstPage, setFirstPage] = useState(true)
  const [quizData, setQuizData] = useState([])
  const [gameEnd, setGameEnd] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    getQuizData()
  }, [gameEnd, totalQuestions])

  function getNumberOfQuestions(event) {
    var { value } = event.target
    if (!isNaN(+value)) {
      setTotalQuestions(`${value}`)
    }
    if (+value > 50) {
      setTotalQuestions(`50`)
    }
    if (value == easter.string) {
      window.location.replace(easter.url)
    }
  }

  function getQuizData() {
    fetch(`https://opentdb.com/api.php?amount=${totalQuestions == '' ? 5 : totalQuestions}`)
      .then(res => res.json())
      .then(data => setQuizData(data.results))
  }

  function getName(event) {
    setName(event.target.value)
  }

  function restart() {
    setGameEnd(prev => !prev)
  }

  function hideFirstPage() {
    if (totalQuestions == '') {
      getQuizData()
      setTotalQuestions('5')
    }
    setFirstPage(prev => !prev)
  }

  return (
    <div className="App">
      {firstPage ?
        <Opening
          totalQuestions={totalQuestions}
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
