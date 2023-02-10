import '../App.css'
import AnswerOption from './AnswerOption'
import { nanoid } from "nanoid"
import { useState } from 'react'

export default function QuizQuestion(props) {
    // console.log('quiz question', props)
    const answers = [...props.incorrect_answers, props.correct_answer]

    const [options, setOptions] = useState(randomizeAnswers(answers))
    console.log(options)

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

        const newScramble = scramble.map(el => {
            return { text: el, id: nanoid(), isSelected: false }
        })
        return newScramble;
    }

    function decodePartialStr(str) {
        return new DOMParser().parseFromString(str, 'text/html').body.textContent
    }
    function selectOption(optionId) {
        console.log(optionId)
        setOptions(options.map(el => {
            return el.id == optionId ?
                { ...el, isSelected: !el.isSelected } :
                { ...el, isSelected: false }
        }))
    }

    const answerElements = options.map((el, idx) => {
        return (
            <AnswerOption
                key={el.id}
                text={el.text}
                isSelected={el.isSelected}
                select={() => { selectOption(el.id) }}
            />
        )
    })

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