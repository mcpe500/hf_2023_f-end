import { React, PureComponent } from 'react';
import { Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';

import Box from '@mui/material/Box';
import CenteredBox from '../../container/centeredBox/centeredBox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import MenuItem from '@mui/material/MenuItem';

import { generateLabel } from '../../container/function/generateLabel';

import { axiosPost } from '../../container/function/axiosPost';
import { Link } from 'react-router-dom';

const structure = (index) => {
  const baseStructure = {
    myForm: {
      index: 0,
      name: {
        value: "",
        valid: true,
        message: "",
      },
      username: {
        value: "",
        valid: true,
        message: "",
      },
      email: {
        value: "",
        valid: true,
        message: "",
      },
      password: {
        value: "",
        valid: true,
        message: "",
      },
      confirmPassword: {
        value: "",
        valid: true,
        message: "",
      },
      tanggalLahir: {
        value: "",
        valid: true,
        message: "",
      },
      jenjangPendidikan: {
        value: "",
        valid: true,
        message: "",
      },
    }
  }
  return index === 0 
    ? baseStructure
    : {
      ...baseStructure,
      myForm: {
        ...baseStructure.myForm,
        gelar: {
          value: "",
          valid: true,
          message: "",
        },
        pelajaran: {
          value: "",
          valid: true,
          message: "",
        },
      }
    }
}
const jenjang = ["SD", "SMP", "SMA"]
const gelarDosen = ["S1", "S2", "S3"]

class Register extends PureComponent {
  state = {
    ...structure(0),
    listInput: {
      "jenjangPendidikan": jenjang,
      "gelar": gelarDosen,
      "pelajaran": ["Matematika", "IPA", "IPS", "Olahraga", "Bahasa Indonesia", "Bahasa Inggris", "PKN", "Sejarah", "Kesenian"]
    }
  }

  handleInputChange = (label, value) => {
    this.setState((prevState) => ({
        myForm: {
            ...prevState.myForm,
            [label]: {
                ...prevState.myForm[label],
                valid: true,
                message: "",
                value,
            },
        },
    }));
};

  handleSubmit = () => {
    let allFormValid = true;
    Object.keys(this.state.myForm).forEach(d => {
        !d.includes("index") && this.setState((prevState) => {
            const stringLength = prevState.myForm[d].value.toString().trim().length
            return {
                ...prevState,
                myForm: {
                    ...prevState.myForm,
                    [d]: {
                        ...prevState.myForm[d],
                        valid: d.includes("pass") 
                            ? stringLength >= 8
                            : d.includes("mail") 
                              ? prevState.myForm[d].value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && prevState.myForm[d].value.trim().length > 0
                              : d.includes("confirm")
                                ? prevState.myForm.confirmPassword.value === prevState.myForm.password.value && prevState.myForm.confirmPassword.value.trim().length > 0 && prevState.myForm.password.value.trim().length > 0
                                : stringLength > 0,
                        message: d.includes("pass") 
                            ? stringLength >= 8 ? "" : "Atleast 8 long password"
                            : d.includes("mail") 
                              ? stringLength > 0
                                ? !prevState.myForm[d].value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && "Email format is not valid !"
                                :  "Cannot be empty"
                              : d.includes("confirm")
                                ? prevState.myForm.confirmPassword.value === prevState.myForm.password.value 
                                  ? ""
                                  : "Confirm password is not match !"
                                : stringLength > 0 ? "" : "Cannot be empty !"
                    }
                }
            }
        }, () => {
            allFormValid = allFormValid && this.state.myForm[d].valid;
        })
    })

    if(allFormValid && this.state.myForm.confirmPassword.value === this.state.myForm.password.value && this.state.myForm.confirmPassword.value.trim().length > 0 && this.state.myForm.password.value.trim().length > 0) {
      const axios_req = this.state.myForm.index === 0 ? axiosPost("/registerStudent", this.state.myForm) : axiosPost("/registerGuru", this.state.myForm)
      axios_req.then((response) => {
        console.log("response : ",response)
        alert()
        if(response.data.message.toLowerCase().includes("success")) {
          if(this.state.myForm.index === 0) {
            window.location.href = "/studentDashboard"
          } else {
            window.location.href = "/teacherDashboard"
          }
        }
      }).catch((response) => {
          console.log("response : ",response)
          alert(response)
          console.error(response)
      })
    }
  };

  render() {
    const { myForm } = this.state;

    return(
      <Box sx={{
        marginTop: myForm.index === 0 ? "12vh" : "12.5%",
        marginBottom: myForm.index === 0 ? "12vh" : "12.5%",
      }}>
        <CenteredBox>
          <Typography mb={'15%'}>
              Register to Approved
          </Typography>
          {Object.keys(myForm).map(e => e.includes("index") 
          ? <></>
          : e.includes("Lahir") 
            ? (
                <Box key={e} sx={{ marginTop: '7.5%' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    value={new Date(myForm[e].value)}
                    sx={{
                      width: "86.5%"
                    }} 
                    label={generateLabel(e)}
                    onChange={(ev) => this.handleInputChange(e, (new Date(ev)))}/>
                  </LocalizationProvider>
                </Box>
            )
            : e.includes("jenjang") || e.includes("gelar") || e.includes("pelajaran") 
              ? (
                  <Box key={e} sx={{ marginTop: '7.5%' }}>
                    <TextField
                      error={!myForm[e].valid}
                      select
                      label={`Pilih ${generateLabel(e)}`}
                      value={myForm[e].value}
                      sx={{
                        width: "86.5%"
                      }}
                      onChange={(ev) => this.handleInputChange(e, ev.target.value)}
                      helperText={myForm[e].message}
                    >
                      {this.state.listInput[e].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                )
                : (
                  <Box key={e} sx={{ marginTop: '7.5%' }}>
                      <TextField
                          label={generateLabel(e)}
                          placeholder={`Masukkan ${generateLabel(e)}`}
                          error={!myForm[e].valid}
                          value={myForm[e].value}
                          onChange={(ev) => this.handleInputChange(e, ev.target.value)}
                          name={e}
                          helperText={myForm[e].message}
                          type={
                              e.includes("pass") || e.includes("confirm")
                                ? "password"
                                : "text"
                          }
                      />
                  </Box>
                )
            )
        }
        <Box sx={{display: 'block', marginTop: '5%'}}>
            <Button variant="contained" onClick={this.handleSubmit}>Register</Button>
        </Box>
        <Box sx={{display: 'inline-block', marginTop: '5%'}}>
            <Button variant="contained" onClick={() => this.setState(() => {
              return {
                myForm: {
                  ...structure(this.state.myForm.index === 0 ? 1 : 0).myForm,
                  index: this.state.myForm.index === 0 ? 1 : 0,
                }
              }
            })}>Register as {this.state.myForm.index === 1 ? "mahasiswa" : "teacher"}</Button>
        </Box>
        <h5 style={{textAlign: "center"}}>
            Already have account ?, <Link to={'/login'}>login now</Link>
        </h5>
        </CenteredBox>
      </Box>
    )
  }
}

export default Register