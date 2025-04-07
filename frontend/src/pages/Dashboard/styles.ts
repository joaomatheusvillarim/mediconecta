import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
`;

export const UserInfo = styled.div`
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

export const ClinicList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const ClinicCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fff;
`;

export const Button = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  border: none;
  background-color: #0077cc;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;
