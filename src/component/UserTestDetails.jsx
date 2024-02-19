import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserTestDetails.css';

const UserTestDetails = () => {
    const [user, setUser] = useState({});
    const [hasAttemptedTest, setHasAttemptedTest] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDetails = JSON.parse(localStorage.getItem('details'));

                if (!userDetails || !userDetails._id) {
                    console.error('User ID is undefined or not found in localStorage');
                    navigate('/');
                    return;
                }

                const updatedUserData = await axios.get(`https://car-licence-mern-project-backend.vercel.app/api/user/testdetails/${userDetails._id}`);
                console.log('Fetched User Data:', updatedUserData.data);

                setUser(updatedUserData.data);
                localStorage.setItem('details', JSON.stringify(updatedUserData.data));

                if (updatedUserData.data.last_attempted !== null && updatedUserData.data.testGiven) {
                    console.log('Last Attempted:', updatedUserData.data.last_attempted);
                    console.log('Test Given:', updatedUserData.data.testGiven);
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

    const handleStartTest = async () => {
        try {
            const userDetails = JSON.parse(localStorage.getItem('details'));

            if (!userDetails || !userDetails._id) {
                console.error('User ID is undefined or not found in localStorage');
                navigate('/');
                return;
            }

            const response = await axios.put(`https://car-licence-mern-project-backend.vercel.app/api/user/testdetails/${userDetails._id}`);
            console.log('Start Test Response:', response);

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
                <button className='btn' onClick={handleStartTest} disabled={hasAttemptedTest}>
                    Start Test
                </button>
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
