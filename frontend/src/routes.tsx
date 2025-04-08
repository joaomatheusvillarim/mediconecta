import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CreateClinicPage from "./pages/CreateClinicPage";
import ClinicPage from "./pages/ClinicProfile";
import DoctorPage from "./pages/DoctorPage";
import PatientPage from "./pages/PatientPage";
import SecretaryPage from "./pages/SecretaryPage";
import AppointmentPage from "./pages/AppointmentPage";
import AnnouncementPage from "./pages/AnnouncementPage";
import JoinPage from "./pages/JoinPage";

export function AppRoutes() {
    return (
        <Routes>
            {/* Redirecionamento da raiz para /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rotas públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rotas protegidas (usuário logado) */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clinics/create" element={<CreateClinicPage />} />
            <Route path="/clinics/:id" element={<ClinicPage />} />
            <Route path="/doctors" element={<DoctorPage />} />
            <Route path="/patients" element={<PatientPage />} />
            <Route path="/secretaries" element={<SecretaryPage />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="/announcements" element={<AnnouncementPage />} />
            <Route path="/join" element={<JoinPage />} />
        </Routes>
    );
}
