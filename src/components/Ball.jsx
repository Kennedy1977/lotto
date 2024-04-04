import React from 'react';
import styled from 'styled-components';

const BallSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 24px;
  margin: 0 10px;
  padding: 10px;
  border-radius: 50%;
  background-color: ${props => props["data-lifeball"] ? '#E91E63' : '#4CAF50'};
  color: #fff;
`;

export const BallsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const Ball = ({ number, lifeBall }) => {
    return <BallSpan data-lifeball={lifeBall}>{number}</BallSpan>;
}
