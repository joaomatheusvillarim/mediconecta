import React, { useEffect, useState } from "react";
import { Container, SecretaryCard, ButtonGroup } from "./styles";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Secretary {
    id: number;
    name: string;
    workingHours: string;
}

const SecretaryPage = () => {
    const { id: clinicId } = useParams();
    const [secretaries, setSecretaries] = useState<Secretary[]>([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/clinics/${clinicId}/secretaries`)
            .then((response) => {
                setSecretaries(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar secretários:", error);
            });
    }, [clinicId]);

    const handleView = (id: number) => {
        alert(`Visualizar secretário ${id}`);
    };

    const handleEdit = (id: number) => {
        alert(`Editar secretário ${id}`);
    };

    const handleDelete = (id: number) => {
        alert(`Remover secretário ${id}`);
    };

    return (
        <Container>
            <h1>Secretários da Clínica</h1>
            {secretaries.map((secretary) => (
                <SecretaryCard key={secretary.id}>
                    <h3>{secretary.name}</h3>
                    <p>Horário de Trabalho: {secretary.workingHours}</p>
                    <ButtonGroup>
                        <button onClick={() => handleView(secretary.id)}>Ver</button>
                        <button onClick={() => handleEdit(secretary.id)}>Editar</button>
                        <button onClick={() => handleDelete(secretary.id)}>Remover</button>
                    </ButtonGroup>
                </SecretaryCard>
            ))}
        </Container>
    );
};

export default SecretaryPage;
