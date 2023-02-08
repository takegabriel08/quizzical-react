import '../App.css'
import { useState } from 'react'

export default function QuizQuestion(props) {
    // console.log('quiz question', props)
    console.log('answers', answers)
    return (
        <div className="container">
            <h1 className='quiz-question'>{props.question}</h1>
            <div className="options-container">
                <h3 className='quiz-option' >no</h3>
                <h3 className='quiz-option clicked' >yes</h3>
                <h3 className='quiz-option' >why</h3>
                <h3 className='quiz-option' >ask</h3>
            </div>
            <hr style={{ marginTop: "1em" }} />
        </div>
    )
}