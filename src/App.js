import './App.css';

import Box from '@mui/material/Box';

import Navigation from './navigation/navigation';
import Login from './login/login';

function App() {
  return (
    <>
      <Navigation />
      <Box mt={2}>
        <Login />
      </Box>
      
    </>
  );
}

export default App;
