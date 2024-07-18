// import React from "react";
// import { useState } from "react";
// import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography, Link } from '@mui/material';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { Link as RouterLink } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'
// import { FaUserShield } from "react-icons/fa";
// import { BsFillShieldLockFill } from "react-icons/bs";
// import { AiOutlineSwapRight } from "react-icons/ai";
// import { jwtDecode } from "jwt-decode"



import React, { useState, useEffect } from "react";
import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography, Link } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"
import axios from 'axios';

// import axios from 'axios'



// const logoStyle = {
//     backgroundColor: '#002A57',
//     width: 56,
//     height: 56
// };

// const paperStyle = {
//     padding: 20,
//     height: '70vh',
//     width: 300,
//     margin: '20px',
//     backgroundColor: '#ffffff',
// };

// const avatarStyle = {
//     backgroundColor: '#002A57'
// };

// const btnStyle = {
//     margin: '8px 0',
//     backgroundColor: '#DAA520'
// };

// const textFieldStyle = {
//     '& .MuiInput-underline:before': {
//         borderBottomColor: '#800000', // normal state
//     },
//     '& .MuiInput-underline:after': {
//         borderBottomColor: '#800000', // focused state
//     },
//     '& .MuiInputLabel-root': {
//         color: '#800000', // label color
//     },
//     '& .MuiInputBase-input': {
//         color: '#800000', // text color
//     }
// };

// const pageStyle = {
//     minHeight: '100vh',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#800000'
// };
// const Login = () => {

//     const history = useNavigate()
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [admin, setAdmin] = useState(false);
//     const token = localStorage.getItem("token");
//     React.useEffect(() => {
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             setAdmin(decodedToken.isAdmin);
//             console.log(decodedToken);
//             console.log(decodedToken.isAdmin);
//         }
//     }, [token]);
//     // modify handleSubmit for handling admin login
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:3002/login', { email, password })

//             // modify the handlesubmit for token (auth)
//             .then(result => {
//                 localStorage.setItem("token", result.data.token);
//                 console.log(result);
//                 alert('Logged in');

//                 admin ? history("/scrapper") : history("/")
// const token = localStorage.getItem("token");
// setAdmin(decodedToken.isAdmin)
; // Navigate to dashboard after successful login
// })



// -------------------------original------------------------------------------

// .then(result => {
//     if (result.data.message === "Success") {
//         if (result.data.role === "admin") {
//             history("/scrapper"); // Navigate to scrapping
//         } else {
//             history("/"); // Navigate to dashboard
//         }
//     } else if (result.data === "The password is incorrect") {
//         alert("The password is incorrect");
//     } else if (result.data === "No record exists") {
//         alert("No record exists");
//     }
// }
// )

//             .catch(err => console.log(err));
//     };
//     return (
//         <Grid container style={pageStyle}>
//             <Grid item container direction="column" alignItems="center" spacing={2}>
//                 <Grid item>
//                     <Avatar style={logoStyle}>
//                         <LocationCityIcon style={{ color: '#fff', width: 56, height: 56 }} />
//                     </Avatar>
//                 </Grid>
//                 <Grid item>
//                     <h2 style={{ color: '#ffffff' }}>Grant Dashboard</h2>
//                 </Grid>
//             </Grid>
//             <Grid item>
//                 <form action="" className="form grid" onSubmit={handleSubmit}>
//                     <Paper elevation={12} style={paperStyle}>
//                         <Grid align='center'>
//                             <Avatar style={avatarStyle}>
//                                 <LockOutlinedIcon />
//                             </Avatar>
//                             <h2>Login</h2>
//                         </Grid>

//                         <TextField
//                             id="standard-basic"
//                             label="Email"
//                             variant="standard"
//                             placeholder='Enter Your Email'
//                             fullWidth
//                             required
//                             onChange={(e) => setEmail(e.target.value)}
//                             sx={textFieldStyle}
//                         />
//                         <TextField
//                             id="standard-basic"
//                             label="Password"
//                             variant="standard"
//                             placeholder='Enter Your Password'
//                             type='password'
//                             fullWidth
//                             required
//                             onChange={(e) => setPassword(e.target.value)}
//                             sx={textFieldStyle}
//                         />
//                         <FormControlLabel
//                             control={<Checkbox defaultChecked />}
//                             label="Remember Me"
//                         />

//                         <Button
//                             style={btnStyle}
//                             type='submit'
//                             color='primary'
//                             variant="contained"
//                             fullWidth
//                         >
//                             Login
//                         </Button>

//                         <Typography>
//                             <Link href="#">
//                                 Forgot Password?
//                             </Link>
//                         </Typography>
//                         <Typography> Don't have an account?
//                             <Link href="#">
//                                 Sign Up Here.
//                             </Link>
//                         </Typography>
//                     </Paper>
//                 </form>
//             </Grid>
//         </Grid>

//     )
// }
// export default Login






const logoStyle = {
    backgroundColor: '#002A57',
    width: 56,
    height: 56
};

const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 300,
    margin: '20px',
    backgroundColor: '#ffffff',
};

const avatarStyle = {
    backgroundColor: '#002A57'
};

const btnStyle = {
    margin: '8px 0',
    backgroundColor: '#DAA520'
};

const textFieldStyle = {
    '& .MuiInput-underline:before': {
        borderBottomColor: '#800000', // normal state
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#800000', // focused state
    },
    '& .MuiInputLabel-root': {
        color: '#800000', // label color
    },
    '& .MuiInputBase-input': {
        color: '#800000', // text color
    }
};

const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#800000'
};

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setAdmin(decodedToken.isAdmin);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3002/login', { email, password });
            localStorage.setItem("token", result.data.token);
            const decodedToken = jwtDecode(result.data.token);
            setAdmin(decodedToken.isAdmin);
            alert('Logged in');
            navigate(decodedToken.isAdmin ? "/scrapper" : "/");
        } catch (err) {
            console.error(err);
            alert('Login failed: Wrong credentials');
        }
    };

    return (
        <Grid container style={pageStyle}>
            <Grid item container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Avatar style={logoStyle}>
                        <LocationCityIcon style={{ color: '#fff', width: 56, height: 56 }} />
                    </Avatar>
                </Grid>
                <Grid item>
                    <h2 style={{ color: '#ffffff' }}>Grant Dashboard</h2>
                </Grid>
            </Grid>
            <Grid item>
                <form action="" className="form grid" onSubmit={handleSubmit}>
                    <Paper elevation={12} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <h2>Login</h2>
                        </Grid>
                        <TextField
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                            placeholder='Enter Your Email'
                            fullWidth
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            sx={textFieldStyle}
                        />
                        <TextField
                            id="standard-basic-pass"
                            label="Password"
                            variant="standard"
                            placeholder='Enter Your Password'
                            type='password'
                            fullWidth
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            sx={textFieldStyle}
                        />
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Remember Me"
                        />
                        <Button
                            style={btnStyle}
                            type='submit'
                            color='primary'
                            variant="contained"
                            fullWidth
                        >
                            Login
                        </Button>
                        <Typography>
                            <Link href="#">
                                Forgot Password?
                            </Link>
                        </Typography>
                        <Typography> Don't have an account?
                            <Link href="#">
                                Sign Up Here.
                            </Link>
                        </Typography>
                    </Paper>
                </form>
            </Grid>
        </Grid>
    );
};

export default Login;


