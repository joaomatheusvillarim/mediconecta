import { useState } from 'react';
import { api } from '../../services/api';
import { Container, Form, Title, Input, Button } from './styles';

export default function CreateClinicPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmit() {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/clinics', {
        name,
        address,
        workingHours,
        specialties,
        phone,
        email
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Clínica criada com sucesso!');
      window.location.href = `/clinics/${response.data.id}`;
    } catch (err) {
      console.error(err);
      alert('Erro ao criar clínica.');
    }
  }

  return (
    <Container>
      <Form>
        <Title>Cadastrar Clínica</Title>

        <Input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="Endereço" value={address} onChange={e => setAddress(e.target.value)} />
        <Input placeholder="Horário de Funcionamento" value={workingHours} onChange={e => setWorkingHours(e.target.value)} />
        <Input placeholder="Especialidades" value={specialties} onChange={e => setSpecialties(e.target.value)} />
        <Input placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

        <Button onClick={handleSubmit}>Criar Clínica</Button>
      </Form>
    </Container>
  );
}
