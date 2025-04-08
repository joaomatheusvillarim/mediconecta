import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import {
    Container,
    Header,
    ClinicsList,
    ClinicCard,
    CreateButton,
} from "./styles";

// Tipagem da entidade Clinic
interface Clinic {
    id: number;
    name: string;
    specialties: string;
}

export default function Dashboard() {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const navigate = useNavigate();

    const userName = localStorage.getItem("userName");

    useEffect(() => {
        api
            .get("/clinics")
            .then((res) => setClinics(res.data))
            .catch((err) => console.error("Erro ao buscar clínicas:", err));
    }, []);

    return (
        <Container>
            <Header>Bem-vindo, {userName}</Header>

            <CreateButton onClick={() => navigate("/clinics/create")}>
                Criar novo consultório
            </CreateButton>

            <ClinicsList>
                {clinics.map((clinic) => (
                    <ClinicCard
                        key={clinic.id}
                        onClick={() => navigate(`/clinics/${clinic.id}`)}
                    >
                        <h3>{clinic.name}</h3>
                        <p>{clinic.specialties}</p>
                    </ClinicCard>
                ))}
            </ClinicsList>
        </Container>
    );
}
