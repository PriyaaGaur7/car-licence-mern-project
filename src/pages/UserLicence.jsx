import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import CertificateTemplate from './CertificateTemplate'; // Import your CertificateTemplate component
import "./UserLicence.css";

const UserLicence = () => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const certificateRef = React.createRef();

    useEffect(() => {
        const naming = async () => {
            if (!localStorage.getItem("details")) {
                navigate("/login");
            } else {
                setUser(await JSON.parse(localStorage.getItem("details")));
            }
        }
        naming();
    }, []);

    const isPass = user.score >= 12;

    const handlePrint = useReactToPrint({
        content: () => certificateRef.current,
    });

    return (
        <div className="cont-user-licence">
            <div className="user-licence">
                <h2>Your Test Result</h2>
                <p>Your Score: {user.score} out of 15</p>
                {isPass ? (
                    <div>
                        <h3>Congratulations!🎉🎉</h3>
                        <p>You have passed the test and can download your driving license.</p>
                        <button className='btn' onClick={handlePrint}>
                            Download Driving License
                        </button>
                    </div>
                ) : (
                    <div>
                        <h3>Test Failed</h3>
                        <p>
                            Unfortunately, you did not pass the test. You can reattempt the test
                            after 3 months.
                        </p>
                    </div>
                )}

                {/* Certificate Template */}
                <div style={{ display: 'none' }}>
                    <CertificateTemplate ref={certificateRef} user={user} />
                </div>
            </div>
        </div>
    );
};

export default UserLicence;
