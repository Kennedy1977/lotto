import React from 'react';
import { Ball, BallsContainer } from './Ball';

const PredictedNumbers = ({ numbers, lifeBall, label }) => {
    if (numbers.length !== 5) return;
    return (
        <div>
            <h3>{label}</h3>
            <BallsContainer>
            {numbers.map((num, index) => (
                <Ball key={index} number={num} />
            ))}
            <Ball number={lifeBall} lifeBall />
            </BallsContainer>
        </div>
    );
}

export default PredictedNumbers;
