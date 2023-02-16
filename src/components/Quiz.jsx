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
    console.log(props.name)
    var score = props.totalQuestions

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
        setCanEnd(canEndGame.length == questions.length && canEndGame.every(isTrue))
    }, [questions])

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
            console.log("end the game")
            props.restart()
        }
        if (props.gameEnd) {
            console.log("restart the game")
            props.restart()
            setQuestions(prepareQuestions(props.data))
        }
    }

    const qs = questions.map(questionEl => {
        const answers = questionEl.answers.map(answer => {
            let answerClass = answer.isSelected ? 'answer-option selected' : 'answer-option'
            if (props.gameEnd && answer.isSelected && !answer.isCorrect) {
                answerClass = `${answerClass} incorrect`
                score -= 1
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
            </div>
        )
    }
    return (
        <div className="quiz">
            {qs}
            <CheckAnswerBtn />
        </div>
    )

}