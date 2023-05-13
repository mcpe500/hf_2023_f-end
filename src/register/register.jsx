import { useState } from 'react'
import Navigation from "../navigation/navigation";
import { TextField, Button } from '@mui/material';
import './App.css'

let isStartEmail = true;
let isStartlName = true;
let isStartfName = true;
function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}`);
  }

  const validateFirstName = () => {
    if ((firstName.length < 2 || firstName.length > 20) && !isStartfName) {
      return true;
    }
    return false;
  }

  const validateLastName = () => {
    if ((lastName.length < 2 || lastName.length > 20) && !isStartlName) {
      return true;
    }
    return false;
  }

  const validateEmail = () => {
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && !isStartEmail) {
      return true;
    }
    return false;
  }

  return (
    <>
      <Navigation />
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Registration Form</h2>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          size='small'
          onChange={(e) => {
            setFirstName(e.target.value);
            isStartfName = false;
          }}
          error={validateFirstName()}
          helperText={validateFirstName() ? "First name must be between 2-20 characters" : ""}
        />
        <br />
        <br />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          size='small'
          onChange={(e) => {
            setLastName(e.target.value);
            isStartlName = false;
          }}
          error={validateLastName()}
          helperText={validateLastName() ? "Last name must be between 2-20 characters" : ""}
        />
        <br />
        <br />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          size='small'
          onChange={(e) => {
            setEmail(e.target.value);
            isStartEmail = false;
          }}
          error={validateEmail()}
          helperText={validateEmail() ? "Please enter a valid email address" : ""}
        />
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </>
  )
}

export default Register
