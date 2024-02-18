import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './UserDetails.css';

const UserDetails = ({ user }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUpdated, setImageUpdated] = useState(false);
    let navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    }

    useEffect(() => {
        if (selectedFile) {
            handleImageUpdate();
        }
    }, [selectedFile]);

    const handleImageUpdate = async () => {
        try {
            if (!selectedFile) {
                return; // No need to proceed if no file is selected
            }

            const formData = new FormData();
            formData.append("image", selectedFile);

            const response = await fetch(`http://localhost:5000/api/user/upload-image/${user._id}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error updating user image: ${errorText}`);
            }

            setImageUpdated(true);
            console.log("User image updated successfully");
        } catch (error) {
            console.error(error.message);
        }
    };
    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('details');
        localStorage.removeItem('userId');

        // Navigate to the login page
        navigate('/login');
    };

    return (
        <div className="user-details">
            <div className="image">
                {imageUpdated ? (
                    <>
                        <p>User Image Updated</p>
                        <img src={`http://localhost:5000/src/server/images/${user.image}`} alt="User" />

                    </>
                ) : (
                    <>
                        <input
                            id="fileInput"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="image"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <img src={user.image} alt="User" />
                    </>
                )}
            </div>
            <button className="btn" onClick={() => document.getElementById('fileInput').click()}>
                Update Image
            </button>
            <p className="user-det-p">{user.username}</p>
            <p className="user-det-p">{user.email}</p>
            <p className="user-det-p">{user.mobile}</p>

            <div className="user-configuration">
                <ul>
                    <li>
                        <Link
                            to={{
                                pathname: `/user-profile/${user._id}`,
                                state: { user },
                            }}
                            style={{ textDecoration: 'none', color: 'black' }}
                        >
                            View Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={{
                                pathname: `/update-profile/${user._id}`,
                                state: { user },
                            }}
                            style={{ textDecoration: 'none', color: 'black' }}
                        >
                            Update Profile
                        </Link>
                    </li>
                    <li>Contact us</li>
                </ul>
            </div>
            <Link to="./login" onClick={handleLogout}>
                <button className='btn' >Logout</button>
            </Link>
        </div>
    );
};

export default UserDetails;
