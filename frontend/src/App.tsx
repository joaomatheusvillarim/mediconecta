import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ClinicProfile from './pages/ClinicProfile';
import DoctorPage from './pages/DoctorPage';
import PatientPage from './pages/PatientPage';
import SecretaryPage from './pages/SecretaryPage';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clinics/:id" element={<ClinicProfile />} />
        <Route path="/clinics/:clinicId/doctors/:id" element={<DoctorPage />} />
        <Route path="/clinics/:clinicId/patients/:id" element={<PatientPage />} />
        <Route path="/clinics/:clinicId/secretaries/:id" element={<SecretaryPage />} />
      </Routes>
    </Router>
  );
}
