import './App.css';

import Box from '@mui/material/Box';

import Navigation from './navigation/navigation';
import Login from './login/login';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navigation />
      
      <Box mt={2}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
