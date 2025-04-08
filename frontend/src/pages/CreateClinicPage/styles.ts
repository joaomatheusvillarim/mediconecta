import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

export const Form = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
  text-align: center;
  color: #333;
`;

export const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
