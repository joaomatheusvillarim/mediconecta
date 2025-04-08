import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Title } from './styles';
import { api } from '../../services/api';

export default function JoinPage() {
    const { id: clinicId } = useParams();
    const navigate = useNavigate();

    async function handleJoin(role: 'patients' | 'doctors' | 'secretaries') {
        try {
            await api.post(`/clinics/${clinicId}/${role}`);
            alert(`Você foi vinculado como ${role.slice(0, -1)}!`);
            navigate(`/clinics/${clinicId}`);
        } catch (error) {
            console.error('Erro ao se vincular:', error);
            alert('Erro ao se vincular. Tente novamente.');
        }
    }

    return (
        <Container>
            <Title>Escolha como deseja se vincular à clínica</Title>
            <Button onClick={() => handleJoin('patients')}>Vincular como Paciente</Button>
            <Button onClick={() => handleJoin('doctors')}>Vincular como Médico</Button>
            <Button onClick={() => handleJoin('secretaries')}>Vincular como Secretário</Button>
        </Container>
    );
}
