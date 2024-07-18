import React from "react";
import { useState } from "react";
import "./Register.css"
import { useNavigate, Link } from 'react-router-dom'
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import Sidebar from "../../scenes/global/Sidebar";
import Topbar from "../../scenes/global/Topbar";

import axios from 'axios'

const Register = () => {
    const [isSidebar, setIsSidebar] = useState(true)
    const history = useNavigate()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3002/register', { email, name, password })
            .then(result => {
                console.log(result);
                alert('User Account Created Successfully');
                history("/"); // Navigate to login page after successful registration
            })
            .catch(err => console.log(err))

    }
    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <div className="CreateUserPage">


                    <div className="container">
                        <div style={{ textAlign: 'center' }}>
                            <h2>Create User</h2>
                        </div>
                        <div className="formDiv flex">
                            <form action="" className="form grid" onSubmit={handleSubmit}>
                                <div className="inputDiv">
                                    <label htmlFor="email">Email</label>
                                    <div className="input flex">
                                        <FaUserShield className='icon' />
                                        <input type="email" id='email' placeholder="Enter Email"
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
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
                                    <span>Create User</span>
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Register