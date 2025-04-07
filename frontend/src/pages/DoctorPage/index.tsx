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

export default function DoctorPage() {
    const { id, clinicId } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState<any>(null);

    const [workingHours, setWorkingHours] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [insurance, setInsurance] = useState('');

    useEffect(() => {
        async function loadDoctor() {
            try {
                const res = await api.get(`/clinics/${clinicId}/doctors/${id}`);
                setDoctor(res.data);
                setWorkingHours(res.data.workingHours);
                setSpecialty(res.data.specialty);
                setInsurance(res.data.insurance);
            } catch (err) {
                console.error('Erro ao carregar médico:', err);
            }
        }
        loadDoctor();
    }, [id, clinicId]);

    async function handleUpdate() {
        try {
            await api.put(`/clinics/${clinicId}/doctors/${id}`, {
                workingHours,
                specialty,
                insurance
            });
            alert('Médico atualizado!');
        } catch (err) {
            console.error(err);
            alert('Erro ao atualizar médico.');
        }
    }

    async function handleDelete() {
        try {
            await api.delete(`/clinics/${clinicId}/doctors/${id}`);
            alert('Médico removido!');
            navigate(`/clinics/${clinicId}`);
        } catch (err) {
            console.error(err);
            alert('Erro ao remover médico.');
        }
    }

    return (
        <Container>
            <Title>Perfil do Médico</Title>

            {doctor ? (
                <Form>
                    <Label>Nome:</Label>
                    <Input value={doctor.User.name} disabled />

                    <Label>Email:</Label>
                    <Input value={doctor.User.email} disabled />

                    <Label>Horário de Trabalho:</Label>
                    <Input value={workingHours} onChange={e => setWorkingHours(e.target.value)} />

                    <Label>Especialidade:</Label>
                    <Input value={specialty} onChange={e => setSpecialty(e.target.value)} />

                    <Label>Convênio:</Label>
                    <Input value={insurance} onChange={e => setInsurance(e.target.value)} />

                    <Button onClick={handleUpdate}>Salvar Alterações</Button>
                    <Button onClick={handleDelete} danger>Remover Médico</Button>
                </Form>
            ) : (
                <p>Carregando...</p>
            )}
        </Container>
    );
}
