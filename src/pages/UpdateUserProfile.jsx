import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateUserProfile.css';
import axios from "axios";
import {userUpdateProfile} from "../utils/APIRoutes";

const UpdateUserProfile = () => {
    const [user, setUser] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        dob: '',
        mobile: '',
        country: '',
        state: '',
        religion: '',
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const naming = async () => {
            if (!localStorage.getItem('details')) {
                navigate('/login');
            } else {
                const userDetails = await JSON.parse(localStorage.getItem('details'));
                setUser(userDetails);
                setFormData({
                    username: userDetails.username,
                    email: userDetails.email,
                    dob: userDetails.dob || '',
                    mobile: userDetails.mobile || '',
                    country: userDetails.country || '',
                    state: userDetails.state || '',
                    religion: userDetails.religion || '',
                });
            }
        };

        naming();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!user._id) {
                console.error('User ID is undefined');
                return;
            }
            const updateUserProfileUrl = userUpdateProfile(user._id);
            const response = await axios.put(`https://car-licence-mern-project-backend.vercel.app/api/user/updateprofile/${user._id}`, formData);


            console.log('Profile updated successfully:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };



    return (
        <div className="main-container">
            <div className="title">
                <h1>User Profile</h1>
            </div>
            <form onSubmit={handleSubmit} className="user-outer-div">
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
                    <span>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </span>
                </div>
                <div className="user--details">
                    <span>Mobile No.</span>
                    <span>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </span>
                </div>
                <div className="user--details">
                    <span>Country</span>
                    <span>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </span>
                </div>
                <div className="user--details">
                    <span>State</span>
                    <span>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </span>
                </div>
                <div className="user--details">
                    <span>Religion</span>
                    <span>
                        <input
                            type="text"
                            name="religion"
                            value={formData.religion}
                            onChange={handleChange}
                        />
                    </span>
                </div>
                <button className='btn' type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateUserProfile;