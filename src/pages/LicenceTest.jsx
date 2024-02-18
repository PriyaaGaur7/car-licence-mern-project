import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LicenceTest.css";
import axios from "axios";

const questions = [
    {
        questionId: 'q1',
        question: 'What does a red traffic light mean?',
        options: ['Stop', 'Go', 'Slow down', 'Turn right'],
        correctAnswer: 'Stop',
    },
    {
        questionId: 'q2',
        question: 'What does a yield sign mean?',
        options: ['Merge', 'Proceed with caution', 'Stop', 'Speed up'],
        correctAnswer: 'Proceed with caution',
    },
    {
        questionId: 'q3',
        question: 'When should you use your headlights?',
        options: ['Only at night', 'Only in bad weather', 'Anytime you can\'t see clearly for 500 feet', 'Never'],
        correctAnswer: 'Anytime you can\'t see clearly for 500 feet',
    },
    {
        questionId: 'q4',
        question: 'What does a double yellow line on the road mean?',
        options: ['No passing', 'Pass with caution', 'Pass only on the right', 'Pass only on the left'],
        correctAnswer: 'No passing',
    },
    {
        questionId: 'q5',
        question: 'What does a green traffic light mean?',
        options: ['Stop', 'Go', 'Slow down', 'Turn left'],
        correctAnswer: 'Go',
    },
    {
        questionId: 'q6',
        question: 'What does a blue traffic sign indicate?',
        options: ['Warning', 'Regulation', 'Information', 'Construction'],
        correctAnswer: 'Information',
    },
    {
        questionId: 'q7',
        question: 'What should you do if you see a pedestrian crossing the road?',
        options: ['Honk to alert them', 'Speed up to cross quickly', 'Slow down and yield', 'Continue without stopping'],
        correctAnswer: 'Slow down and yield',
    },
    {
        questionId: 'q8',
        question: 'When parking uphill with a curb, which way should your front wheels be turned?',
        options: ['Towards the curb', 'Away from the curb', 'Parallel to the curb', 'It doesn\'t matter'],
        correctAnswer: 'Away from the curb',
    },
    {
        questionId: 'q9',
        question: 'What is the speed limit in a school zone?',
        options: ['25 mph', '35 mph', '45 mph', '55 mph'],
        correctAnswer: '25 mph',
    },
    {
        questionId: 'q10',
        question: 'What does a white rectangular sign with black lettering indicate?',
        options: ['Stop', 'Yield', 'Speed limit', 'No parking'],
        correctAnswer: 'Speed limit',
    },
    {
        questionId: 'q11',
        question: 'What does a red triangle sign mean?',
        options: ['No parking', 'Yield', 'Warning', 'School zone'],
        correctAnswer: 'Warning',
    },
    {
        questionId: 'q12',
        question: 'When approaching a roundabout, what should you do?',
        options: ['Speed up', 'Stop and wait', 'Yield to traffic in the roundabout', 'Go in the opposite direction'],
        correctAnswer: 'Yield to traffic in the roundabout',
    },
    {
        questionId: 'q13',
        question: 'What should you do if you encounter thick fog while driving?',
        options: ['Turn on high beams', 'Drive faster to clear the fog', 'Use low beams and reduce speed', 'Keep driving at normal speed'],
        correctAnswer: 'Use low beams and reduce speed',
    },
    {
        questionId: 'q14',
        question: 'What does a diamond-shaped sign with an orange background indicate?',
        options: ['Construction zone', 'School zone', 'No passing zone', 'Railroad crossing'],
        correctAnswer: 'Construction zone',
    },
    {
        questionId: 'q15',
        question: 'If your vehicle breaks down on the highway, what should you do?',
        options: ['Leave it and call for a tow', 'Try to fix it yourself', 'Wave down other drivers for help', 'Stay inside and call for assistance'],
        correctAnswer: 'Stay inside and call for assistance',
    },
];

const LicenceTest = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionsMap, setSelectedOptionsMap] = useState({});
    const [showThankYou, setShowThankYou] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (showThankYou) {
            const timeoutId = setTimeout(() => {
                navigate('/');
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [showThankYou, navigate]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setSelectedOptionsMap((prevMap) => ({
            ...prevMap,
            [questions[currentQuestion].questionId]: option,
        }));
    };

    const calculateScore = (selectedOptions, questions) => {
        return selectedOptions.filter(
            (selected, index) => selected === questions[index].correctAnswer
        ).length;
    };

    const handleNextQuestion = async () => {
        setSelectedOption(null);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const selectedOptions = questions.map(
                (question) => selectedOptionsMap[question.questionId] || null
            );
            const score = calculateScore(selectedOptions, questions);

            try {
                const userDetails = JSON.parse(localStorage.getItem('details'));

                if (!userDetails || !userDetails._id) {
                    console.error('User ID is undefined or not found in localStorage');
                    navigate('/');
                    return;
                }

                await axios.post(`http://localhost:5000/api/user/score/${userDetails._id}`, {
                    score: score,
                    selectedOptions: selectedOptionsMap,
                    questions: questions,
                });

            } catch (error) {
                console.error('Error updating score:', error.message);
            }

            setShowThankYou(true);
        }
    };

    return (
        <div className="licence-test">
            {showThankYou ? (
                <div>
                    <h2>Thank You!</h2>
                    <p>Your result will be declared soon.</p>
                </div>
            ) : (
                <>
                    <h2>Question {currentQuestion + 1}</h2>
                    <p>{questions[currentQuestion].question}</p>
                    <ul>
                        {questions[currentQuestion].options.map((option, index) => (
                            <li
                                key={index}
                                className={selectedOptionsMap[questions[currentQuestion].questionId] === option ? 'selected' : ''}
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleNextQuestion} disabled={selectedOption === null}>
                        {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Test'}
                    </button>
                </>
            )}
        </div>
    );
};

export default LicenceTest;