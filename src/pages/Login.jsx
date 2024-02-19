import React,{useState,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {

    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (localStorage.getItem('details')) {
            navigate("/");
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { email, password} = values;
                const {data} = await axios.post(loginRoute, {
                    email,
                    password,
                },);

                console.log("Response from server:", data);

                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                }

                if (data.status === true) {
                    localStorage.setItem('details', JSON.stringify(data.user));
                    localStorage.setItem('userId', data.user._id);
                    navigate("/");
                }
            }
        }


    const handleValidation = () => {
        const { password, email } = values;
        if (password === "") {
            toast.error(
                "Email and password is required.",
                toastOptions
            );
            return false;
        } else if (email.length < 5) {
            toast.error(
                "Email and password is required.",
                toastOptions
            );
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSubmitSignup = (e) => {
        navigate("/signup");
    }

    return (
      <div class="container">
          <div class="screen">
              <div class="screen__content">
                  <form class="login" onSubmit={(event) => handleSubmit(event)}>
                      <div class="login__field">
                          <i class="login__icon fas fa-user"></i>
                          <input type="text" class="login__input" name='email' placeholder="Email" onChange={(e) => handleChange(e)} />
                      </div>
                      <div class="login__field">
                          <i class="login__icon fas fa-lock"></i>
                          <input type="password" class="login__input" name='password' placeholder="Password" onChange={(e) => handleChange(e)} />
                      </div>
                      <button class="button login__submit" type='submit'>
                          <span class="button__text">Log In Now</span>
                          <i class="button__icon fas fa-chevron-right"></i>
                      </button>
                  </form>
                  <div class="social-login">
                      <h3>Not a member?</h3>
                      <button class="button login__submit" onClick={handleSubmitSignup}>
                          <span class="button__text">Sign up</span>
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

export default Login