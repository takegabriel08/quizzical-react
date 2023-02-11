import '../App.css'
import { useState } from 'react'

export default function AnswerOption(props) {
    // console.log('answer option', props)

    return (
        <h3
            className='quiz-option'
            onClick={props.select}
            style={{ backgroundColor: props.isSelected ? '#ced0d7' : "white" }}
        >
            {props.text}
        </h3>
    )
}