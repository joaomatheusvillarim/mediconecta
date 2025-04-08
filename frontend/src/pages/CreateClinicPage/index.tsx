import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import {
  Container,
  Form,
  Title,
  Input,
  Button,
} from "./styles";

export default function CreateClinicPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    workingHours: "",
    specialties: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/clinics", formData);
      const clinicId = response.data.id;

      console.log("Consultório criado:", response.data);
      navigate(`/clinics/${clinicId}`); // Redirecionar para a página do consultório
    } catch (error) {
      console.error("Erro ao criar consultório:", error);
      alert("Erro ao criar consultório. Verifique os dados.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Criar Consultório</Title>

        <Input
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          name="address"
          placeholder="Endereço"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <Input
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <Input
          name="workingHours"
          placeholder="Horário de funcionamento"
          value={formData.workingHours}
          onChange={handleChange}
          required
        />

        <Input
          name="specialties"
          placeholder="Especialidades"
          value={formData.specialties}
          onChange={handleChange}
          required
        />

        <Button type="submit">Criar</Button>
      </Form>
    </Container>
  );
}
