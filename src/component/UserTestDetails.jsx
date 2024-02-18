// UserTestDetails.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserTestDetails.css';

const UserTestDetails = () => {
    const [user, setUser] = useState({});
    const [hasAttemptedTest, setHasAttemptedTest] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDetails = JSON.parse(localStorage.getItem('details'));

                if (!userDetails || !userDetails._id) {
                    console.error('User ID is undefined or not found in localStorage');
                    navigate('/');
                    return;
                }

                const updatedUserData = await axios.get(`http://localhost:5000/api/user/testdetails/${userDetails._id}`);

                setUser(updatedUserData.data);
                localStorage.setItem('details', JSON.stringify(updatedUserData.data));

                // Check if testGiven property exists in the response
                if (updatedUserData.data.last_attempted !== null && 'testGiven' in updatedUserData.data) {
                    setHasAttemptedTest(updatedUserData.data.testGiven);
                } else {
                    console.log('testGiven property not found in response.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, [navigate]);

    useEffect(() => {
    }, [hasAttemptedTest]);

    const handleStartTest = async () => {
        try {
            const userDetails = JSON.parse(localStorage.getItem('details'));

            if (!userDetails || !userDetails._id) {
                console.error('User ID is undefined or not found in localStorage');
                navigate('/');
                return;
            }

            const response = await axios.put(`http://localhost:5000/api/user/testdetails/${userDetails._id}`);
            setHasAttemptedTest(true);
        } catch (error) {
            console.error('Error updating last attempted timestamp:', error.message);
        }
    };

    return (
        <div className="user-test-details">
            <div className="user-test">
                <p>All the details related to the test</p>
                <Link to="./test-details">
                    <button className='btn'>Read Here</button>
                </Link>
            </div>
            <div className="user-test">
                <p>If you already read the test-details then you can start the test</p>
                <Link to="./licence-test">
                    <button className='btn' onClick={handleStartTest} disabled={hasAttemptedTest}>
                        Start Test
                    </button>
                </Link>
            </div>
            <div className="user-test ">
                <p>You can see your result here</p>
                <Link to="./user-licence">
                    <button className='btn' disabled={!hasAttemptedTest}>Click Here</button>
                </Link>
                
            </div>
        </div>
    );
};

export default UserTestDetails;
