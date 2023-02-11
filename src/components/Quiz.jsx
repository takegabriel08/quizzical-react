import '../App.css'
import QuizQuestion from './QuizQuestion'

export default function Quiz(props) {
    // console.log(props)

    function decodePartialStr(str) {
        return new DOMParser().parseFromString(str, 'text/html').body.textContent
    }

    const quizQuestionElements = props.data.map((el, idx) => {
        return (
            <QuizQuestion
                {...el}
                decode={decodePartialStr}
                key={idx}
            />
        )
    })
    return (
        <div className="quiz">
            {quizQuestionElements}
            <div className="start-quizz fixed">Check answers</div>
        </div>
    )
}