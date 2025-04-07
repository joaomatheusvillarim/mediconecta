import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import {
    Container,
    Section,
    Title,
    SubTitle,
    Card,
    CardList
} from './styles';

export default function ClinicProfile() {
    const { id } = useParams();
    const [clinic, setClinic] = useState<any>(null);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [secretaries, setSecretaries] = useState([]);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        async function loadClinicData() {
            try {
                const token = localStorage.getItem('token');

                const [clinicRes, docRes, patRes, secRes, annRes] = await Promise.all([
                    api.get(`/clinics/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
                    api.get(`/clinics/${id}/doctors`),
                    api.get(`/clinics/${id}/patients`),
                    api.get(`/clinics/${id}/secretaries`),
                    api.get(`/clinics/${id}/announcements`)
                ]);

                setClinic(clinicRes.data);
                setDoctors(docRes.data);
                setPatients(patRes.data);
                setSecretaries(secRes.data);
                setAnnouncements(annRes.data);
            } catch (error) {
                console.error('Erro ao carregar dados da clínica:', error);
            }
        }

        loadClinicData();
    }, [id]);

    return (
        <Container>
            <Title>{clinic?.name || 'Carregando...'}</Title>
            <p><strong>Endereço:</strong> {clinic?.address}</p>
            <p><strong>Especialidades:</strong> {clinic?.specialties}</p>
            <p><strong>Telefone:</strong> {clinic?.phone}</p>

            <Section>
                <SubTitle>Médicos</SubTitle>
                <CardList>
                    {doctors.map((doc: any) => (
                        <Card key={doc.id}>{doc.User?.name}</Card>
                    ))}
                </CardList>
            </Section>

            <Section>
                <SubTitle>Pacientes</SubTitle>
                <CardList>
                    {patients.map((p: any) => (
                        <Card key={p.id}>{p.User?.name}</Card>
                    ))}
                </CardList>
            </Section>

            <Section>
                <SubTitle>Secretários</SubTitle>
                <CardList>
                    {secretaries.map((s: any) => (
                        <Card key={s.id}>{s.User?.name}</Card>
                    ))}
                </CardList>
            </Section>

            <Section>
                <SubTitle>Avisos</SubTitle>
                <CardList>
                    {announcements.map((a: any) => (
                        <Card key={a.id}>{a.title}</Card>
                    ))}
                </CardList>
            </Section>
        </Container>
    );
}
