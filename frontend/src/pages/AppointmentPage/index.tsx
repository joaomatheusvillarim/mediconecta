import React, { useEffect, useState } from 'react';
import { Container, Title, Table, Button } from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

interface Appointment {
    id: number;
    doctorName: string;
    patientName: string;
    date: string;
    status: string;
}

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get('/clinics/1/patients/1/appointments');
                setAppointments(response.data);
            } catch (error) {
                console.error('Erro ao buscar consultas', error);
            }
        };
        fetchAppointments();
    }, []);

    return (
        <Container>
            <Title>Consultas</Title>
            <Button onClick={() => navigate('/clinics/1/patients/1/appointments/create')}>
                Criar Consulta
            </Button>
            <Table>
                <thead>
                    <tr>
                        <th>Médico</th>
                        <th>Paciente</th>
                        <th>Data</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.doctorName}</td>
                            <td>{appointment.patientName}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AppointmentPage;
