import { Tools } from "../../assets/Utils";
import InputField from "../General/InputField/InputField";
import { useState, useEffect } from "react";

export default function QuestionForm({ data }) {

    const [userAnswers, setUserAnswers] = useState({});
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        setUserAnswers({});
        const shuffledData = data.map((item) => ({
            ...item,
            allAnswers: shuffleArray([
                { value: item.correct_answer, label: item.correct_answer },
                ...item.incorrect_answers.map((answer) => ({
                    value: answer,
                    label: answer,
                }))
            ])
        }));
        setShuffledQuestions(shuffledData);
    }, [data]);

    const handleAnswerChange = (index) => (event) => {
        setUserAnswers((prevState) => ({
            ...prevState,
            [index]: event.target.value
        }));
    };

    const checkAnswer = (questionIndex) => {
        const userAnswer = userAnswers[questionIndex];
        const correctAnswer = data[questionIndex].correct_answer;
        return userAnswer === correctAnswer;
    };

    return (
        <form className="container mt-4">
            <ul className="list-group">
                {shuffledQuestions.map((item, index) => (
                    <li key={index} className="list-group-item mb-3">
                        <h4 className="mb-2">{Tools.decodeHtmlEntities(item.category)} ({item.difficulty})</h4>
                        <div className="mb-2">
                            <strong>{Tools.decodeHtmlEntities(item.question)}</strong>
                        </div>
                        <div className="form-group">
                            <InputField
                                type="radio"
                                name={`answer-${index}`}
                                options={item.allAnswers}
                                value={userAnswers[index]}
                                onChange={handleAnswerChange(index)}
                            />
                        </div>
                        {userAnswers[index] && (
                            <div className="mt-2">
                                {checkAnswer(index) ? (
                                    <span className="text-success">Correct!</span>
                                ) : (
                                    <span className="text-danger">Incorrect! The correct answer is: {item.correct_answer}</span>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </form>
    );
}
