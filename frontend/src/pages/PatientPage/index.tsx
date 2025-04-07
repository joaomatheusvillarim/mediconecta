import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import {
    Container,
    Title,
    Input,
    Label,
    Button,
    Form
} from './styles';

export default function PatientPage() {
    const { id, clinicId } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState<any>(null);

    useEffect(() => {
        async function loadPatient() {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get(`/clinics/${clinicId}/patients/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPatient(res.data);
            } catch (err) {
                alert('Erro ao carregar paciente');
                console.error(err);
            }
        }

        loadPatient();
    }, [id, clinicId]);

    async function handleDelete() {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/clinics/${clinicId}/patients/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Paciente removido!');
            navigate(`/clinics/${clinicId}`);
        } catch (err) {
            alert('Erro ao remover paciente');
            console.error(err);
        }
    }

    return (
        <Container>
            <Title>Perfil do Paciente</Title>

            {!patient ? (
                <p>Carregando...</p>
            ) : (
                <Form>
                    <Label>Nome:</Label>
                    <Input value={patient.User?.name || ''} disabled />

                    <Label>Email:</Label>
                    <Input value={patient.User?.email || ''} disabled />

                    <Label>CPF:</Label>
                    <Input value={patient.User?.cpf || ''} disabled />

                    <Label>Data de Nascimento:</Label>
                    <Input value={patient.User?.birthday?.substring(0, 10)} disabled />

                    <Button danger onClick={handleDelete}>Remover Paciente</Button>
                </Form>
            )}
        </Container>
    );
}
