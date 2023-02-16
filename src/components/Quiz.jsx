import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import '../App.css'

export default function Quiz(props) {
    // console.log(props)

    function decodePartialStr(str) {
        return new DOMParser().parseFromString(str, 'text/html').body.textContent
    }
    function scramble(arr) {
        const shuffledArr = [...arr]; // make a copy of the input array
        for (let i = shuffledArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
        }
        return shuffledArr;
    }

    function prepareQuestions(data) {
        return data.map(data => {
            return {
                question: data.question,
                questionId: nanoid(),
                correctAnswer: data.correct_answer,
                answers: scramble([...data.incorrect_answers, data.correct_answer]).map(answer => {
                    return {
                        text: decodePartialStr(answer),
                        isSelected: false,
                        answerId: nanoid(),
                        isCorrect: answer == data.correct_answer
                    }
                })
            }
        })
    }

    const [questions, setQuestions] = useState(prepareQuestions(props.data))
    const [canEnd, setCanEnd] = useState(false)
    const [score, setScore] = useState(props.totalQuestions)

    useEffect(() => {
        function isSelected(element, index, array) {
            return element.isSelected;
        }
        const isTrue = (currentValue) => currentValue == true;
        let canEndGame = []
        for (let index = 0; index < questions.length; index++) {
            const element = questions[index];
            canEndGame.push(element.answers.some(isSelected))
        }
        let canWeEndTheGame = canEndGame.length == questions.length && canEndGame.every(isTrue)
        setCanEnd(canWeEndTheGame)
        if (canWeEndTheGame && props.name) {
            setScore(prevScore => {
                let scoreToSet;
                questions.map(question => {
                    question.answers.map(answer => {
                        if (answer.isCorrect && answer.isSelected) {
                            scoreToSet = scoreToSet == undefined ? 1 : scoreToSet + 1
                        }
                    })
                })
                setScore(scoreToSet == undefined ? 0 : scoreToSet)
                let scoreFromBrowser = getScoreFromLocalBrowser()
                if (scoreFromBrowser == 0) {
                    setScoreOnLocalBrowser({ correctAnswers: scoreToSet, totalQuestions: props.totalQuestions })
                }
                if (scoreToSet > JSON.parse(scoreFromBrowser).correctAnswers) {
                    setScoreOnLocalBrowser({ correctAnswers: scoreToSet, totalQuestions: props.totalQuestions })
                }
            })
        }
    }, [questions])

    function setScoreOnLocalBrowser(scoreToSet) {
        localStorage.setItem(props.name, JSON.stringify(scoreToSet))
    }
    function getScoreFromLocalBrowser() {
        let scoreReceived = localStorage.getItem(props.name) || 0
        return scoreReceived
    }

    function showBestScore() {
        let bestScore = getScoreFromLocalBrowser()
        let scoreObj = JSON.parse(bestScore)
        if (!props.name) return
        if (bestScore == 0) {
            return `No score available`
        } else {
            return `Best score: ${scoreObj.correctAnswers}/${scoreObj.totalQuestions}`
        }
    }

    function selectOption(optionId) {
        const toUpdate = questions.map(q => {
            return {
                ...q,
                answers: q.answers.map(answer => {
                    if (answer.answerId == optionId) {
                        return { ...answer, isSelected: !answer.isSelected }
                    } else if (q.answers.includes(q.answers.filter(el => el.answerId == optionId)[0])) {
                        return { ...answer, isSelected: false }
                    } else {
                        return answer
                    }
                })
            }
        })
        setQuestions(questions => toUpdate)
    }

    function showResults() {
        if (!props.gameEnd && canEnd) {
            props.restart()
        }
        if (props.gameEnd) {
            props.restart()
            setQuestions(prepareQuestions(props.data))
        }
    }

    const qs = questions.map(questionEl => {
        const answers = questionEl.answers.map(answer => {
            let answerClass = answer.isSelected ? 'answer-option selected' : 'answer-option'
            if (props.gameEnd && answer.isSelected && !answer.isCorrect) {
                answerClass = `${answerClass} incorrect`
                // score -= 1
            }
            if (props.gameEnd && answer.isCorrect) {
                answerClass = `${answerClass} correct`
            }
            return (
                <h4
                    key={answer.answerId}
                    className={answerClass}
                    onClick={() => { selectOption(answer.answerId) }}
                >
                    {answer.text}
                </h4>
            )
        })
        return (
            <div className="question" key={questionEl.questionId}>
                <h2 className='quiz-question'>{decodePartialStr(questionEl.question)}</h2>
                <div className="options-container">
                    {answers}
                </div>
                <hr
                    style={{
                        marginTop: "2em",
                        borderTop: "2px solid #8a2be27a"
                    }}
                />
            </div>
        )
    })

    console.log(!props.gameEnded)
    const CheckAnswerBtn = () => {
        var checkAnswersClass = "start-quizz"
        if (!canEnd) {
            checkAnswersClass = `${checkAnswersClass} disabled`
        }
        return (
            <div className="check-answers-container">
                {!props.gameEnd ? '' : `You scored ${score}/${props.totalQuestions} correct answers`}
                <div
                    className={checkAnswersClass}
                    onClick={checkAnswersClass.includes('disabled') ? null : showResults}
                >
                    {!props.gameEnd ? 'Check answers' : 'Play again'}
                </div>
                {!props.gameEnd ? null : < h4 className="best-score">{showBestScore()}</h4>}
            </div >
        )
    }
    return (
        <div className="quiz">
            {qs}
            <CheckAnswerBtn />
        </div>
    )

}