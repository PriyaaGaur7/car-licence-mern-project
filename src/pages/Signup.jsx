import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupRoute } from '../utils/APIRoutes';

const Signup = () => {

    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const isSuccess = localStorage.getItem('signupSuccess') === 'true';
        console.log('Is success:', isSuccess);
        if (isSuccess) {
            localStorage.removeItem('signupSuccess');
            navigate("/login");
        } else if (localStorage.getItem('details')) {
            navigate("/");
        }
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, username, email } = values;
            try {
                const { data } = await axios.post(signupRoute, {
                    username,
                    email,
                    password,
                });
                console.log(data)
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                }
                if (data.status === true) {
                    localStorage.removeItem('details');
                    localStorage.setItem('signupSuccess', 'true');
                    navigate("/login");
                }

            } catch (error) {
                console.error("Error during signup:", error);
                toast.error("An error occurred during signup.", toastOptions);
            }
        }
    };


    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error(
                "Password and confirm password should be same.",
                toastOptions
            );
            return false;
        } else if (username.length < 5) {
            toast.error(
                "Username should be greater than 5 characters.",
                toastOptions
            );
            return false;
        } else if (password.length < 8) {
            toast.error(
                "Password should be equal or greater than 8 characters.",
                toastOptions
            );
            return false;
        } else if (email === "") {
            toast.error("Email is required.", toastOptions);
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSubmitLogin = (e) => {
        navigate("/login");
    }

    return (
        <div class="container">
            <div class="screen">
                <div class="screen__content">
                    <form class="signup" onSubmit={(event) => handleSubmit(event)} >
                        <div class="signup__field">
                            <i class="signup__icon fas fa-user"></i>
                            <input type="text" class="signup__input" placeholder="Name" name='username' onChange={(e) => handleChange(e)} />
                        </div>
                        <div class="signup__field">
                            <i class="signup__icon fas fa-user"></i>
                            <input type="text" class="signup__input" placeholder="Email" name='email' onChange={(e) => handleChange(e)} />
                        </div>
                        <div class="signup__field">
                            <i class="signup__icon fas fa-lock"></i>
                            <input type="password" class="signup__input" placeholder="Password" name='password' onChange={(e) => handleChange(e)} />
                        </div>
                        <div class="signup__field">
                            <i class="signup__icon fas fa-lock"></i>
                            <input type="password" class="signup__input" placeholder="Confirm Password" name='confirmPassword' onChange={(e) => handleChange(e)} />
                        </div>
                        <button class="button signup__submit">
                            <span class="button__text">Sign Up Now</span>
                            <i class="button__icon fas fa-chevron-right"></i>
                        </button>
                    </form>
                    <div class="social-signup">
                        <h3>Already a member?</h3>
                        <button class="button signup__submit" onClick={handleSubmitLogin}>
                            <span class="button__text">Log In</span>
                            <i class="button__icon fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
                <div class="screen__background">
                    <span class="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup