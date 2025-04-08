import styled from 'styled-components';

export const Container = styled.div`
  max-width: 500px;
  margin: 100px auto;
  text-align: center;
  padding: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 24px;
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #2196f3;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #1976d2;
  }
`;
