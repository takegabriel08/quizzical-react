import '../App.css'
import { useState } from 'react'

export default function QuizQuestion(props) {
    console.log('quiz question', props)

    const answers = [...props.incorrect_answers, props.correct_answer]
    function randomizeAnswers(arr) {
        const scramble = []
        let randomIdx = Math.floor(Math.random() * 4);
        arr.map((el, idx) => {
            if (randomIdx + 1 > arr.length - 1) {
                scramble[randomIdx] = el;
                randomIdx = 0
            } else {
                scramble[randomIdx] = el;
                randomIdx++
            }
        })
        return scramble;
    }
    const answerElements = randomizeAnswers(answers).map(el => {
        return (
            <h3 className='quiz-option' >{decodePartialStr(el)}</h3>
        )
    })

    function decodePartialStr(str) {
        return new DOMParser().parseFromString(str, 'text/html').body.textContent
    }

    return (
        <div className="container">
            <h1 className='quiz-question'>{decodePartialStr(props.question)}</h1>
            <div className="options-container">
                {answerElements}
            </div>
            <hr style={{ marginTop: "1em" }} />
        </div>
    )
}