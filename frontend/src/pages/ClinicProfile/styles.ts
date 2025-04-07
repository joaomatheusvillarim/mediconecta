import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
`;

export const Section = styled.section`
  margin-top: 2rem;
`;

export const SubTitle = styled.h2`
  margin-bottom: 0.5rem;
`;

export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

export const Card = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;
