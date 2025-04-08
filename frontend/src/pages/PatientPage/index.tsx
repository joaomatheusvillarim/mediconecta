import React, { useEffect, useState } from "react";
import { Container, PatientCard, ButtonGroup } from "./styles";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Patient {
    id: number;
    name: string;
    joined: string;
}

const PatientPage = () => {
    const { id: clinicId } = useParams();
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/clinics/${clinicId}/patients`)
            .then((response) => {
                setPatients(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar pacientes:", error);
            });
    }, [clinicId]);

    const handleView = (id: number) => {
        alert(`Visualizar paciente ${id}`);
    };

    const handleEdit = (id: number) => {
        alert(`Editar paciente ${id}`);
    };

    const handleDelete = (id: number) => {
        alert(`Remover paciente ${id}`);
    };

    return (
        <Container>
            <h1>Pacientes da Clínica</h1>
            {patients.map((patient) => (
                <PatientCard key={patient.id}>
                    <h3>{patient.name}</h3>
                    <p>Ingressou em: {new Date(patient.joined).toLocaleDateString()}</p>
                    <ButtonGroup>
                        <button onClick={() => handleView(patient.id)}>Ver</button>
                        <button onClick={() => handleEdit(patient.id)}>Editar</button>
                        <button onClick={() => handleDelete(patient.id)}>Remover</button>
                    </ButtonGroup>
                </PatientCard>
            ))}
        </Container>
    );
};

export default PatientPage;
