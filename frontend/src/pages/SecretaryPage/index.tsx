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

export default function SecretaryPage() {
    const { id, clinicId } = useParams();
    const navigate = useNavigate();
    const [secretary, setSecretary] = useState<any>(null);
    const [workingHours, setWorkingHours] = useState('');

    useEffect(() => {
        async function loadSecretary() {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get(`/clinics/${clinicId}/secretaries/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSecretary(res.data);
                setWorkingHours(res.data.workingHours || '');
            } catch (err) {
                alert('Erro ao carregar secretário');
                console.error(err);
            }
        }

        loadSecretary();
    }, [id, clinicId]);

    async function handleUpdate() {
        try {
            const token = localStorage.getItem('token');
            await api.put(`/clinics/${clinicId}/secretaries/${id}`, {
                workingHours
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Horário atualizado!');
        } catch (err) {
            alert('Erro ao atualizar horário');
            console.error(err);
        }
    }

    async function handleDelete() {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/clinics/${clinicId}/secretaries/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Secretário removido!');
            navigate(`/clinics/${clinicId}`);
        } catch (err) {
            alert('Erro ao remover secretário');
            console.error(err);
        }
    }

    return (
        <Container>
            <Title>Perfil do Secretário</Title>

            {!secretary ? (
                <p>Carregando...</p>
            ) : (
                <Form>
                    <Label>Nome:</Label>
                    <Input value={secretary.User?.name || ''} disabled />

                    <Label>Email:</Label>
                    <Input value={secretary.User?.email || ''} disabled />

                    <Label>Horário de Trabalho:</Label>
                    <Input
                        value={workingHours}
                        onChange={e => setWorkingHours(e.target.value)}
                    />

                    <Button onClick={handleUpdate}>Salvar Alterações</Button>
                    <Button danger onClick={handleDelete}>Remover Secretário</Button>
                </Form>
            )}
        </Container>
    );
}
