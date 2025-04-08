import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Container, Header, List, Card, CreateButton } from './styles';

interface Announcement {
    id: number;
    title: string;
    text: string;
    date: string;
}

export default function AnnouncementPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const navigate = useNavigate();
    const { id: clinicId } = useParams();

    useEffect(() => {
        async function fetchAnnouncements() {
            try {
                const response = await api.get(`/clinics/${clinicId}/announcements`);
                setAnnouncements(response.data);
            } catch (error) {
                console.error('Erro ao buscar avisos:', error);
            }
        }

        fetchAnnouncements();
    }, [clinicId]);

    return (
        <Container>
            <Header>
                <h1>Avisos da Clínica</h1>
                <CreateButton onClick={() => navigate(`/clinics/${clinicId}/announcements/create`)}>
                    Criar Aviso
                </CreateButton>
            </Header>
            <List>
                {announcements.map((announcement) => (
                    <Card key={announcement.id}>
                        <h3>{announcement.title}</h3>
                        <p>{announcement.text}</p>
                        <small>{new Date(announcement.date).toLocaleDateString()}</small>
                    </Card>
                ))}
            </List>
        </Container>
    );
}
