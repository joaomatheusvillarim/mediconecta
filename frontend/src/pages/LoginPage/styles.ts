import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh; /* altura total da viewport */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Button = styled.button`
  padding: 0.75rem;
  background-color: #0077cc;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const LinkButton = styled.button`
  background: none;
  border: none;
  color: #0077cc;
  font-size: 0.9rem;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0;
`;
