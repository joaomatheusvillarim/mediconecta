import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import {
    Container,
    Form,
    Title,
    Label,
    Input,
    Select,
    Button,
    ErrorMessage
} from './styles';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        cpf: '',
        birthday: '',
        sex: '',
        address: '',
        phone: ''
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        const payload = {
            ...form,
            sex: form.sex.toUpperCase().trim(),
            cpf: form.cpf.replace(/\D/g, ''),
            phone: form.phone.replace(/\D/g, ''),
            birthday: form.birthday.trim()
        };

        console.log("Payload enviado para /users:", payload); // 👀 Veja isso no console

        try {
            await api.post('/users', payload);
            alert('Usuário cadastrado com sucesso!');
            navigate('/login');
        } catch (err: any) {
            console.error('Erro ao cadastrar:', err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Erro ao cadastrar. Verifique os dados e tente novamente.');
            }
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Cadastro de Usuário</Title>

                <Label>Nome</Label>
                <Input name="name" value={form.name} onChange={handleChange} required />

                <Label>Email</Label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} required />

                <Label>Senha</Label>
                <Input name="password" type="password" value={form.password} onChange={handleChange} required />

                <Label>CPF</Label>
                <Input name="cpf" value={form.cpf} onChange={handleChange} required />

                <Label>Data de Nascimento</Label>
                <Input name="birthday" type="date" value={form.birthday} onChange={handleChange} required />

                <Label>Sexo</Label>
                <Select name="sex" value={form.sex} onChange={handleChange} required>
                    <option value="">Selecione</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMININO">Feminino</option>
                    <option value="OUTRO">Outro</option>
                </Select>

                <Label>Endereço</Label>
                <Input name="address" value={form.address} onChange={handleChange} required />

                <Label>Telefone</Label>
                <Input name="phone" value={form.phone} onChange={handleChange} required />

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Button type="submit">Cadastrar</Button>
            </Form>
        </Container>
    );
}
