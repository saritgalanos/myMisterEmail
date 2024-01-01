import { useNavigate, NavLink } from "react-router-dom"
import { utilService } from "../services/util.service"
import { Button } from "@mui/material"
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useRef } from 'react'
import 'animate.css'

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { AppFooter } from "../cmps/AppFooter"



export function HomePage() {
    const navigate = useNavigate()
    const h1Ref = useRef()
    function onSignIn() {
        navigate("/mail/inbox")
    }


    return (
        <>

            <section className="home-page">
                <div className="sign-in-area">
                    {/* <img className="mister-email-img" src={utilService.getIconUrl("mister-email")} /> */}
                    <h2 className="animate__animated animate__bounce">To continue to your Email</h2>

                    <Button className="btn-signin" variant="contained" onClick={onSignIn}>Sign-in</Button>
                    <br></br>
                    <br></br>
                    <p> To create a new user:</p>
                    {/* <form> */}
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column', // Stack the elements vertically
                            alignItems: 'center', // Center the elements vertically
                            '& > :not(style)': { m: 1, width: '30ch', mb: 2 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="filled-basic"
                            label="User"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                                style: { marginTop: '-8px' }, // Adjust the marginTop as needed
                            }}
                            inputProps={{
                                style: { width: '20em', height: '1.5em', padding: '10px' },
                            }}
                        />
                        <TextField
                            id="filled-basic"
                            label="Password"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                                style: { marginTop: '-8px' }, // Adjust the marginTop as needed
                            }}
                            inputProps={{
                                style: { width: '20em', height: '1.5em', padding: '10px' },
                            }}
                        />
                    </Box>

                    <div className='btn-signup-container'>
                        <Button className="btn-signin" variant="outlined" onClick={onSignIn}
                        // sx={{ borderColor: 'black', color:'black',  
                        // '&:active': { borderColor: 'black'},
                        // '&:hover': { borderColor: 'gray'},
                        // }} 
                        >Sign-up</Button>
                    </div>

                    {/* </form> */}

                </div>
                <AppFooter />

                {/* <MyForm /> */}
            </section >
        </>
    )
}
