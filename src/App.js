import './App.css';

import Box from '@mui/material/Box';

import Navigation from './container/navigation/navigation';
import Login from './component/login/login';
import Register from './component/register/register';
import LandingPage from './container/landingPage/landingPage';
import TeacherDashboard from './container/dashboard/dashboardTeacher';
import StudentDashboard from './container/dashboard/dashboardStudent';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { styles } from './assets/font/font';

function App() {
  return (
    <Router>
      <Navigation />
      <Box mt={9} sx={{...styles}}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teacherDashboard" element={<TeacherDashboard />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
