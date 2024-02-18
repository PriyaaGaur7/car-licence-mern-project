// UserDashboard.jsx
import React from 'react';
import "./UserDashboard.css";

const UserDashboard = ({ user }) => {
    return (
        <div className="user-dashboard">
            <p>User Status: Active</p>
            <p>Last Attempted: {user.last_attempted ? new Date(user.last_attempted).toLocaleString() : 'Not Attempted Yet'}</p>
            <p>Valid Up To: 01 - Feb - 2028</p>
            <p>Region: CENTRAL</p>
            <p>User Licence: Unactive</p>            
        </div>
    );
};

export default UserDashboard;
