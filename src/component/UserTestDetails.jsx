import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserTestDetails.css';

const UserTestDetails = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = React.useState({});

  useEffect(() => {
    const userDetailsFromStorage = JSON.parse(localStorage.getItem('details')) || {};
    setUserDetails(userDetailsFromStorage);
  }, []);

  const handleStartTest = async () => {
    try {
      if (!userDetails._id) {
        console.error('User ID is undefined or not found in localStorage');
        navigate('/');
        return;
      }

      // Proceed to start the test
      const updateResponse = await axios.put(`https://car-licence-mern-project-backend.vercel.app/api/user/testdetails/${userDetails._id}`, {
        last_attempted: new Date(),
        testGiven: true
      });
      console.log('Start Test Response:', updateResponse);

      // Update the state with the new user data
      setUserDetails({ ...userDetails, testGiven: true });
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
        <button
          className='btn'
          onClick={handleStartTest}
          disabled={userDetails && userDetails.testGiven === false}
        >
          Start Test
        </button>
      </div>
      <div className="user-test">
        <p>You can see your result here</p>
        <Link to="./user-licence">
          <button className='btn' disabled={!userDetails || userDetails.testGiven}>Click Here</button>
        </Link>
      </div>
    </div>
  );
};

export default UserTestDetails;
