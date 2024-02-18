import React from 'react';
import "./CertificateTemplate.css"; // Import your custom styling for the certificate

const CertificateTemplate = React.forwardRef(({ user }, ref) => {
    const licenseNumber = generateLicenseNumber(user);

    return (
        <div ref={ref} className="certificate">
            <h2>Driving License Certificate</h2>
            <div className="user-details">
                <p>Name: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>License Number: {licenseNumber}</p>
            </div>
            <p className='certi-p'>Congratulations! This is to certify that {user.username} has successfully passed the driving test.</p>
            {/* Add any additional information or styling as needed */}
        </div>
    );
});

const generateLicenseNumber = (user) => {
    // Implement logic to generate a unique license number
    // You can use a combination of user details, date, or any other criteria
    const dob = user.dob || '232009'; // replace 'DOB' with a default value or handle null case
    const mobileNumber = user.mobileNumber || '12345678'; // replace 'MobileNo' with a default value or handle null case

    // Example: combining name, DOB, and mobile number
    return `${user.username}_${dob}_${mobileNumber}`;
};

export default CertificateTemplate;
