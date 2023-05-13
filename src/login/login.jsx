import { React, PureComponent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import '../css/input.css'

function CenteredBox({Content}) {
    return (
        <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <div>
                <Content />
            </div>
        </Box>
    );
}

const myLoginForm = () => {
    return(
        <>
            <Box sx={{marginTop: "5%"}}>
                <TextField
                    required
                    label="Username"
                    placeholder='Masukkan username'
                />
            </Box>
            <Box sx={{marginTop: "5%"}}>
                <TextField
                    required
                    label="Password"
                    placeholder='Masukkan password'
                />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', justifyItems: 'center', marginTop: '5%'}}>
                <Button variant="contained">Login</Button>
            </Box>
        </>
    )
}

class Login extends PureComponent {
    state = {
        myForm: {
            username: {
                value: "",
                valid: true,
            },
            password: {
                value: "",
                valid: true,
            }
        }
    }
    render() {
        return(
            <>
                <CenteredBox Content={
                    myLoginForm
                }  />
            </>
        )
    }
}

export default Login;