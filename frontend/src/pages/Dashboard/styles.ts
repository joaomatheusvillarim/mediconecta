import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
`;

export const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const ClinicsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ClinicCard = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  background: #f9f9f9;
`;

export const CreateButton = styled.button`
  margin-bottom: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
