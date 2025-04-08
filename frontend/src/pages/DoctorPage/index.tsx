import React, { useEffect, useState } from "react";
import { Container, DoctorCard, ButtonGroup } from "./styles";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    credential: string;
    insurance: string;
}

const DoctorPage = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const { id: clinicId } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/clinics/${clinicId}/doctors`)
            .then((response) => {
                setDoctors(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar médicos:", error);
            });
    }, [clinicId]);

    const handleView = (id: number) => {
        alert(`Visualizar médico ${id}`);
    };

    const handleEdit = (id: number) => {
        alert(`Editar médico ${id}`);
    };

    const handleDelete = (id: number) => {
        alert(`Remover médico ${id}`);
    };

    return (
        <Container>
            <h1>Médicos da Clínica</h1>
            {doctors.map((doctor) => (
                <DoctorCard key={doctor.id}>
                    <h3>{doctor.name}</h3>
                    <p>Especialidade: {doctor.specialty}</p>
                    <p>CRM: {doctor.credential}</p>
                    <p>Convênio: {doctor.insurance}</p>
                    <ButtonGroup>
                        <button onClick={() => handleView(doctor.id)}>Ver</button>
                        <button onClick={() => handleEdit(doctor.id)}>Editar</button>
                        <button onClick={() => handleDelete(doctor.id)}>Remover</button>
                    </ButtonGroup>
                </DoctorCard>
            ))}
        </Container>
    );
};

export default DoctorPage;
