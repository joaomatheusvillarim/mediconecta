import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f7f7f7;

  h1 {
    margin-bottom: 2rem;
  }
`;

export const PatientCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.2rem 0;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  button {
    padding: 0.5rem 1rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #1e7e34;
    }
  }
`;
