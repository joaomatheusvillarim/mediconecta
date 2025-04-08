import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Title } from "./styles";
import { api } from "../../services/api";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/auth/login", { email, password });

            const { token } = response.data;
            localStorage.setItem("token", token);

            // ✅ redirecionar para o dashboard
            navigate("/dashboard");
        } catch (err: any) {
            console.error("Erro ao fazer login:", err);
            setError("Email ou senha inválidos");
        }
    };

    return (
        <Container>
            <Title>Login</Title>
            <Form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Entrar</button>
                <p onClick={() => navigate("/register")} style={{ cursor: "pointer", color: "blue" }}>
                    Cadastre-se
                </p>
            </Form>
        </Container>
    );
}
