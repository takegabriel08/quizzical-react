import '../App.css'
import { useState } from 'react'

export default function QuizQuestion(props) {
    console.log('quiz question', props)
    // console.log('answers', answers)

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
            <h3 className='quiz-option' >{el.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')}</h3>
        )
    })

    return (
        <div className="container">
            <h1 className='quiz-question'>{props.question.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')}</h1>
            <div className="options-container">
                {answerElements}
            </div>
            <hr style={{ marginTop: "1em" }} />
        </div>
    )
}