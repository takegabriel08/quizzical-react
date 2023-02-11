import '../App.css'
import AnswerOption from './AnswerOption'
import { nanoid } from "nanoid"
import { useState } from 'react'

export default function QuizQuestion(props) {
    console.log('quiz question', props)
    const answers = [...props.incorrect_answers]

    const [options, setOptions] = useState(randomizeAnswers(answers, props.correct_answer))

    function randomizeAnswers(arr, item) {
        let randomIdx = Math.floor(Math.random() * arr.length);
        arr.splice(randomIdx, 0, item)

        const newArr = arr.map(el => {
            return { text: el, id: nanoid(), isSelected: false }
        })
        return newArr;
    }

    function selectOption(optionId) {
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
                text={props.decode(el.text)}
                isSelected={el.isSelected}
                select={() => { selectOption(el.id) }}
            />
        )
    })

    return (
        <div className="container">
            <h1 className='quiz-question'>{props.decode(props.question)}</h1>
            <div className="options-container">
                {answerElements}
            </div>
            <hr style={{ marginTop: "1em" }} />
        </div>
    )
}