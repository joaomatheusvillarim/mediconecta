import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Button = styled.button<{ danger?: boolean }>`
  padding: 0.75rem;
  background-color: ${({ danger }) => (danger ? '#dc3545' : '#0077cc')};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
