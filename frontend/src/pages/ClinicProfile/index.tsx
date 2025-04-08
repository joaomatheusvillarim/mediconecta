import { useNavigate } from "react-router-dom";
import { Container, Title, InfoBox, NavButton, ButtonsGrid } from "./styles";

const ClinicProfile = () => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <Container>
            <Title>Consultório ABC</Title>

            <InfoBox>
                <p><strong>Endereço:</strong> Rua Exemplo, 123</p>
                <p><strong>Horário de Funcionamento:</strong> 08h às 18h</p>
                <p><strong>Especialidades:</strong> Clínica geral, Cardiologia</p>
                <p><strong>Telefone:</strong> (83) 1234-5678</p>
                <p><strong>Email:</strong> consultorio@exemplo.com</p>
            </InfoBox>

            <ButtonsGrid>
                <NavButton onClick={() => handleNavigate("/doctors")}>Médicos</NavButton>
                <NavButton onClick={() => handleNavigate("/secretaries")}>Secretários</NavButton>
                <NavButton onClick={() => handleNavigate("/patients")}>Pacientes</NavButton>
                <NavButton onClick={() => handleNavigate("/appointments")}>Consultas</NavButton>
                <NavButton onClick={() => handleNavigate("/announcements")}>Avisos</NavButton>
                <NavButton onClick={() => handleNavigate("/join")}>Vincular</NavButton>
            </ButtonsGrid>
        </Container>
    );
};

export default ClinicProfile;
