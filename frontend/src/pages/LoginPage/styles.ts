import styled from 'styled-components';

export const Container = styled.div`
   display: flex;
  justify-content: center;      // Centraliza horizontalmente
  align-items: center;          // Centraliza verticalmente
  height: 100vh;                // Altura total da tela
  width: 100vw;                 // Largura total da tela
  background-color: #f4f4f4;
  position: fixed;              // Fixar para manter centralizado mesmo com scroll
  top: 0;
  left: 0;
`;

export const Form = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 0.75rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

export const LinkText = styled.a`
  text-align: center;
  color: #0077cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;