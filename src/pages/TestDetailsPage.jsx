import React from 'react';
import "./TestDetailsPage.css";

const TestDetailsPage = () => {
    return (
        <div className="test-details-page">
            <h2>Car License Test Details</h2>
            <p>
                The car license test evaluates your theoretical knowledge of traffic laws, road signs, and safe driving practices.
                Successful completion of the written exam is the primary requirement for obtaining a car license.
            </p>

            <h3>Test Components:</h3>

            <ol>
                <li>
                    <strong>Written Exam:</strong>
                    <ul>
                        <li>
                            The written exam consists of multiple-choice questions covering traffic laws, road signs, and general driving knowledge.
                        </li>
                        <li>
                            You will be provided with a booklet or an electronic device to answer the questions.
                        </li>
                        <li>
                            Passing score: 80% or higher.
                        </li>
                    </ul>
                </li>
            </ol>

            <h3>Preparation Tips:</h3>

            <ul>
                <li>
                    <strong>Study the Driver's Manual:</strong>
                    <ul>
                        <li>
                            The driver's manual provided by the licensing authority contains essential information for the written exam.
                        </li>
                        <li>
                            Familiarize yourself with traffic laws, road signs, and safe driving practices.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Take a Practice Test:</strong>
                    <ul>
                        <li>
                            Many online platforms offer practice tests simulating the actual written exam.
                        </li>
                        <li>
                            Taking these tests can help you gauge your knowledge and identify areas for improvement.
                        </li>
                    </ul>
                </li>
            </ul>

            <h3>Test Day Tips:</h3>

            <ul>
                <li>
                    <strong>Arrive Early:</strong>
                    <ul>
                        <li>
                            Ensure you arrive at the testing center well before the scheduled time.
                        </li>
                        <li>
                            Allow time for any administrative procedures.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Bring Required Documents:</strong>
                    <ul>
                        <li>
                            Bring your identification documents, proof of residence, and any other required paperwork.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Stay Calm:</strong>
                    <ul>
                        <li>
                            Take deep breaths to stay calm during the test.
                        </li>
                        <li>
                            Follow instructions carefully and answer the questions to the best of your ability.
                        </li>
                    </ul>
                </li>
            </ul>

            <h3>Results:</h3>

            <ul>
                <li>
                    <strong>Immediate Feedback:</strong>
                    <ul>
                        <li>
                            In some cases, you may receive immediate feedback on the written exam.
                        </li>
                        <li>
                            If you achieve the passing score, you will be eligible to receive your car license.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Review and Retake:</strong>
                    <ul>
                        <li>
                            If you don't pass the written exam, review the areas of weakness and consider retaking the test.
                        </li>
                    </ul>
                </li>
            </ul>

            <p>
                Obtaining a car license is a significant responsibility, and your success in the written exam reflects your understanding of the rules of the road. Good luck!
            </p>
        </div>
    );
};

export default TestDetailsPage;
