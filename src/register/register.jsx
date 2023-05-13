import { React, PureComponent } from 'react';
import { Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';

import Box from '@mui/material/Box';
import CenteredBox from '../container/centeredBox/centeredBox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import MenuItem from '@mui/material/MenuItem';

import { generateLabel } from '../container/function/generateLabel';

import axios from 'axios';

const structure = (index) => {
  const baseStructure = {
    myForm: {
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
    index: 1,
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
        this.setState((prevState) => {
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
                              : stringLength > 0,
                        message: d.includes("pass") 
                            ? stringLength >= 8 ? "" : "Atleast 8 long password"
                            : d.includes("mail") 
                              ? stringLength > 0
                                ? !prevState.myForm[d].value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && "Email format is not valid !"
                                :  "Cannot be empty"
                              : stringLength > 0 ? "" : "Cannot be empty !"
                    }
                }
            }
        }, () => {
            allFormValid = allFormValid && this.state.myForm[d].valid;
            if(d === "password" && allFormValid) {
              axios.post(
                "",
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
      <Box sx={{
        marginTop: this.state.index === 1 ? "1vh" : "17vh",
        padding: "1%"
      }}>
        <CenteredBox>
          <Typography mb={'15%'}>
              Register to NAMA APLIKASI
          </Typography>
          {Object.keys(myForm).map(e => e.includes("Lahir") 
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
                          e.includes("pass")
                            ? "password"
                            : "text"
                      }
                  />
              </Box>
            )
          )}
        <Box sx={{display: 'block', marginTop: '5%'}}>
            <Button variant="contained" onClick={this.handleSubmit}>Register</Button>
        </Box>
        <Box sx={{display: 'inline-block', marginTop: '5%'}}>
            <Button variant="contained" onClick={() => this.setState(() => {
              return {
                index: this.state.index === 0 ? 1 : 0,
                myForm: {
                  ...structure(this.state.index).myForm,
                }
              }
            })}>Register as {this.state.index === 0 ? "mahasiswa" : "teacher"}</Button>
        </Box>
        </CenteredBox>
        
      </Box>
    )
  }
}

export default Register