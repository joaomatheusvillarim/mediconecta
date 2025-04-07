import { useState } from 'react';
import {
    Container,
    Form,
    Title,
    Input,
    Button,
    LinkText
} from './styles';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister() {
        // TODO: enviar dados para a API
        console.log({ name, cpf, email, password });
    }

    return (
        <Container>
            <Form>
                <Title>Cadastro</Title>

                <Input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />

                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button onClick={handleRegister}>Cadastrar</Button>

                <LinkText href="/login">Já tem conta? Faça login</LinkText>
            </Form>
        </Container>
    );
}