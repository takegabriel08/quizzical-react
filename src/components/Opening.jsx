import '../App.css/'
import '../index.css/'

export default function Opening(props) {
    return (
        <div className='opening'>
            <h1 className="opening-title">quizical.</h1>
            <input type="text" className="user-name" placeholder="your name here" name="name" onChange={props.getName} />
            <input type="text" className="user-name" placeholder="number of questions" name="numberOfQuestions" onChange={props.getNumberOfQuestions} />
            <h3 className="opening-description">Prepare for the best quizz game there is</h3>
            <div className="start-quizz" onClick={props.hideFirstPage}>start quizzing</div>
        </div>
    )
}