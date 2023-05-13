import { React, PureComponent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import '../css/input.css'

import { Link } from 'react-router-dom';

import CenteredBox from '../container/centeredBox/centeredBox';
import { generateLabel } from '../container/function/generateLabel';

import axios from 'axios';

class Login extends PureComponent {
    state = {
        myForm: {
            username: {
                value: "",
                valid: true,
                message: "",
            },
            password: {
                value: "",
                valid: true,
                message: "",
            }
        }
    }

    handleInputChange = (label, value) => {
        this.setState((prevState) => ({
            myForm: {
                ...prevState.myForm,
                [label]: {
                    ...prevState.myForm[label],
                    value,
                },
            },
        }));
    };

    handleSubmit = () => {
        let allFormValid = true;
        Object.keys(this.state.myForm).forEach(d => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    myForm: {
                        ...prevState.myForm,
                        [d]: {
                            ...prevState.myForm[d],
                            valid: d.includes("pass") 
                                ? prevState.myForm[d].value.trim().length >= 8
                                : prevState.myForm[d].value.trim().length > 0,
                            message: d.includes("pass") 
                                ? prevState.myForm[d].value.trim().length >= 8 ? "" : "Atleast 8 long password"
                                : prevState.myForm[d].value.trim().length > 0 ? "" : "Cannot be empty !"
                        }
                    }
                }
            }, () => {
                allFormValid = allFormValid && this.state.myForm[d].valid;
                if(d === "password" && allFormValid) {
                    axios.post(
                        "https://6618-182-253-199-42.ngrok-free.app/login",
                        JSON.stringify(this.state.myForm)
                    ).then((response) => {
                        alert(response)
                    }).catch((response) => {
                        alert(response)
                    })
                }
            })
        });
    };

    render() {
        const { myForm } = this.state;
        return(
            <>
                <CenteredBox>
                    <Typography mb={'15%'}>
                        Login to NAMA APLIKASI
                    </Typography>
                    {Object.keys(myForm).map(e => (
                        <Box key={e} sx={{ marginTop: '4.5%' }}>
                            <TextField
                                label={e.includes("User") ? `${generateLabel(e)} / password` : generateLabel(e)}
                                placeholder={`Masukkan ${e}`}
                                error={!myForm[e].valid}
                                value={myForm[e].value}
                                onChange={(e) => this.handleInputChange(e.target.name, e.target.value)}
                                name={e}
                                helperText={myForm[e].message}
                                type={
                                    e.includes("pass")
                                        ? "password"
                                        : "text"
                                }
                            />
                        </Box>
                    ))}
                    <Box sx={{display: 'flex', justifyContent: 'center', justifyItems: 'center', marginTop: '5%'}}>
                        <Button variant="contained" onClick={this.handleSubmit}>Login</Button>
                    </Box>
                    <h5>
                        Don't have account ?, <Link to={'/register'}>create now</Link>
                    </h5>
                </CenteredBox>
            </>
        )
    }
}

export default Login;