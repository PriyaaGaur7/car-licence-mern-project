import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewUserProfile.css';

const ViewUserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userDetails = JSON.parse(localStorage.getItem('details'));

                if (!userDetails || !userDetails._id) {
                    console.error('User ID is undefined or not found in localStorage');
                    navigate('/');
                    return;
                }

                console.log('Fetching user profile for ID:', userDetails._id);

                const response = await axios.get(`http://localhost:5000/api/user/viewprofile/${userDetails._id}`);

                const fetchedUser = response.data;
                setUser(fetchedUser);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
                navigate('/');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user || !user._id) {
        console.error('User object or _id is null or undefined');
        return <p>User not found</p>;
    }

    return (
        <div className="main-container">
            <div className="title">
                <h1>User Profile</h1>
            </div>
            <div className="user-outer-div">
                <div className="user--details">
                    <span>Name</span>
                    <span>{user.username}</span>
                </div>
                <div className="user--details">
                    <span>Email</span>
                    <span>{user.email}</span>
                </div>
                <div className="user--details">
                    <span>Date of Birth</span>
                    <span>{user.dob}</span>
                </div>
                <div className="user--details">
                    <span>Mobile No.</span>
                    <span>{user.mobile}</span>
                </div>
                <div className="user--details">
                    <span>Country</span>
                    <span>{user.country}</span>
                </div>
                <div className="user--details">
                    <span>State</span>
                    <span>{user.state}</span>
                </div>
                <div className="user--details">
                    <span>Religion</span>
                    <span>{user.religion}</span>
                </div>
            </div>
        </div>
    );
};

export default ViewUserProfile;
