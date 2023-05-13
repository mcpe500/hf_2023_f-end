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
const jenjangSiswa = ["SMP", "SMA", "Mahasiswa / Kuliah"]
const jenjangDosen = ["S1", "S2", "S3"]
const gelarDosen = ["S1", "S2", "S3"]

class Register extends PureComponent {
  state = {
    index: 1,
    ...structure(0),
    listInput: {
      "jenjangPendidikan": jenjangSiswa,
      "gelar": [""],
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
            return {
                ...prevState,
                myForm: {
                    ...prevState.myForm,
                    [d]: {
                        ...prevState.myForm[d],
                        valid: d.includes("pass") 
                            ? prevState.myForm[d].value.trim().length >= 8
                            : d.includes("mail") 
                              ? prevState.myForm[d].value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && prevState.myForm[d].value.trim().length > 0
                              : prevState.myForm[d].value.trim().length > 0,
                        message: d.includes("pass") 
                            ? prevState.myForm[d].value.trim().length >= 8 ? "" : "Atleast 8 long password"
                            : d.includes("mail") 
                              ? prevState.myForm[d].value.trim().length > 0
                                ? !prevState.myForm[d].value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && "Email format is not valid !"
                                :  "Cannot be empty"
                              : prevState.myForm[d].value.trim().length > 0 ? "" : "Cannot be empty !"
                    }
                }
            }
        }, () => {
            allFormValid = allFormValid && this.state.myForm[d].valid;
            if(d === "password" && allFormValid) {
                alert("all input valid");
            }
        })
    });
  };

  render() {
    const { myForm } = this.state;

    return(
      <>
        <CenteredBox>
          <Typography align='center' mb={'15%'}>
              Register to NAMA APLIKASI
          </Typography>
          {Object.keys(myForm).map(e => e.includes("Lahir") 
          ? (
              <Box key={e} sx={{ marginTop: '7.5%' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                  sx={{
                    width: "86.5%"
                  }} 
                  label={generateLabel(e)}/>
                </LocalizationProvider>
              </Box>
          )
          : e.includes("jenjang") || e.includes("gelar") || e.includes("pelajaran") 
          ? (
              <Box key={e} sx={{ marginTop: '7.5%' }}>
                <TextField
                  select
                  label={`Pilih ${generateLabel(e)}`}
                  sx={{
                    width: "86.5%"
                  }}
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
            )
          )}
        <Box sx={{display: 'block', marginTop: '5%'}}>
            <Button variant="contained" onClick={this.handleSubmit}>Register</Button>
        </Box>
        <Box sx={{display: 'inline-block', marginTop: '5%'}}>
            <Button variant="contained" onClick={() => this.setState((prevState) => {
              return {
                index: this.state.index === 0 ? 1 : 0,
                listInput: {
                  ...prevState.listInput,
                  "jenjangPendidikan": this.state.index === 1 ? jenjangDosen : jenjangSiswa,
                },
                ...structure(this.state.index),
              }
            })}>Register as {this.state.index === 0 ? "mahasiswa" : "teacher"}</Button>
        </Box>
        </CenteredBox>
        
      </>
    )
  }
}

export default Register