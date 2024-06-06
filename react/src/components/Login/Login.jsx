import React from "react";
import { useState } from "react";
import "./Login.css"
import { useNavigate, Link } from 'react-router-dom'
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

import axios from 'axios'

const Login = () => {
    const history = useNavigate()

    const [name, setName] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3002/login', { name, password })
            .then(result => {
                console.log(result);
                if(result.data === "Success"){
                    history("/"); // Navigate to login page after successful registration 
                }
                
            })
            .catch(err => console.log(err))

    }
    return (
        <div className="registerPage flex">
            <div className="container flex">
                <div className="videoDiv">
                    <video src=""></video>
                    <div className="textDiv">
                        <h2 className='title'>Login </h2>
                        <p>Adopt the peace of nature!</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className="text">Have an account?</span>
                        <Link to={'/login'}>
                            <button className="btn">Login</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src="../../data/universiti-teknologi-malaysia-utm8941.jpg" alt="logo" />
                        <h3>
                            Let Us Know You!
                        </h3>
                    </div>

                    <form action="" className="form grid" onSubmit={handleSubmit}>
                        
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type="text" id='username' placeholder="Enter username"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input type="password" id='password' placeholder="Enter Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn flex">
                            <span>Login</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>

                        <span className="forgotPassword">
                            Forgot your password? <a href=""> Click Here</a>
                        </span>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login