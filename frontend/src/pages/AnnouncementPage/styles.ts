import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  text-align: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-size: 28px;
  }
`;

export const CreateButton = styled.button`
  padding: 10px 18px;
  background-color: #4caf50;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.div`
  background: #f9f9f9;
  padding: 16px;
  border-radius: 10px;
  text-align: left;

  h3 {
    margin: 0;
  }

  p {
    margin: 8px 0;
  }

  small {
    color: #555;
  }
`;
