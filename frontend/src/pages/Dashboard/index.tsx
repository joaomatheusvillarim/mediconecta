import { useEffect, useState } from 'react';
import { Container, Title, UserInfo, ClinicCard, ClinicList, Button } from './styles';
import { api } from '../../services/api';

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [clinics, setClinics] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                const { data: userData } = await api.get(`/users/${userId}`);
                const { data: clinicList } = await api.get('/clinics');

                setUser(userData);
                setClinics(clinicList);
            } catch (err) {
                console.error('Erro ao carregar dados:', err);
            }
        }

        fetchData();
    }, []);

    return (
        <Container>
            <Title>Bem-vindo(a), {user?.name || 'usuário'}!</Title>

            <UserInfo>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>CPF:</strong> {user?.cpf}</p>
            </UserInfo>

            <h2>Clínicas disponíveis</h2>

            <ClinicList>
                {clinics.map(clinic => (
                    <ClinicCard key={clinic.id}>
                        <h3>{clinic.name}</h3>
                        <p>{clinic.address}</p>
                        <Button onClick={() => window.location.href = `/clinics/${clinic.id}`}>Acessar</Button>
                    </ClinicCard>
                ))}
            </ClinicList>

            <Button onClick={() => window.location.href = "/clinics/create"}>Criar nova clínica</Button>
        </Container>
    );
}
