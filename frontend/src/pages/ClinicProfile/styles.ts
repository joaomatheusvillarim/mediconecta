import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

export const InfoBox = styled.div`
  background-color: #f1f1f1;
  padding: 20px;
  text-align: left;
  border-radius: 8px;
  margin-bottom: 30px;
`;

export const ButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

export const NavButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 14px 10px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
