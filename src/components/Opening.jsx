import '../App.css/'
import '../index.css/'
import 'react-tooltip/dist/react-tooltip.css'
import { useState } from 'react'
import { Tooltip } from 'react-tooltip'

export default function Opening(props) {

    const [isOpen, setIsOpen] = useState(true)

    const StartQuizBtn = () => {
        let startQuizClass = "start-quizz"
        if (props.totalQuestions == "") {
            startQuizClass = `${startQuizClass} disabled`
        }
        return (
            <div className={startQuizClass} onClick={props.hideFirstPage}>
                start quizzing
            </div>
        )
    }

    return (
        <div className="opening">
            <h1 className="opening-title">quizical.</h1>
            <input
                type="text"
                className="user-name"
                placeholder="your name here"
                name="name"
                onChange={props.getName}
            />
            <input
                type="text"
                className="user-name"
                placeholder="number of questions"
                name="numberOfQuestions"
                value={props.totalQuestions}
                onChange={props.getNumberOfQuestions}
                data-tooltip-id="my-tooltip"
                data-tooltip-html="<span>In order to be able to start the game </br> insert the number of questions </br> between 1-50</span>"
                onClick={() => setIsOpen(false)}
                data-tooltip-variant="info"
                data-tooltip-place="right"
            />

            <h3 className="opening-description">
                Prepare for the best quizz game there is
            </h3>
            <StartQuizBtn />
            <Tooltip
                id="my-tooltip"
                isOpen={isOpen}
            />
        </div>
    );
}