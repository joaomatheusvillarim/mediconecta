import { useState } from 'react';
import { Container, Form, Title, Input, Button, LinkText } from './styles';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        // TODO: lógica de login com API
        console.log({ email, password });
    }

    return (
        <Container>
            <Form>
                <Title>Login</Title>

                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <Button onClick={handleLogin}>Entrar</Button>

                <LinkText href="/register">Cadastre-se</LinkText>
            </Form>
        </Container>
    );
}