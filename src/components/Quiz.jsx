import '../App.css'
import QuizQuestion from './QuizQuestion'

export default function Quiz(props) {
    // console.log(props)

    const quizQuestionElements = props.data.map((el, idx) => {
        return (
            <QuizQuestion
                {...el}
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