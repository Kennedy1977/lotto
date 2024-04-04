import React from 'react';
import pastDraws from './data/data.json';
import PredictedNumbers from './components/PredictedNumbers';
import useMostFrequentNumbers from './hooks/useMostFrequentNumbers';
import useMostFrequentNumber from './hooks/useMostFrequentNumber';
import useMondayThursdayPredictions from './hooks/useMondayThursdayPredictions';
import styled from 'styled-components';
import MachineLearning from './components/MachineLearning';

const AppContainer = styled.div`
  font-family: Arial;
  background-color: #f5f5f5;
  text-align: center;
  height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const App = () => {
 
  const { 
      mondayPredictions, thursdayPredictions, 
      mondayLifeBall, thursdayLifeBall  // <- Destructure these
  } = useMondayThursdayPredictions(pastDraws);

  // const predictedNumbers = useMostFrequentNumbers(pastDraws);
  // const predictedLifeBall = useMostFrequentNumber(pastDraws);

    return (
        <AppContainer>
            <Title>AI React 'Set for Life' Lotto Predictor</Title>
            {/* <PredictedNumbers
              label="All draws:" 
               numbers={predictedNumbers} 
               lifeBall={predictedLifeBall} 
            /> */}
            <PredictedNumbers 
               label="Predicted Monday Numbers:" 
               numbers={mondayPredictions} 
               lifeBall={mondayLifeBall}  // <- Add this
            />
            <PredictedNumbers 
               label="Predicted Thursday Numbers:" 
               numbers={thursdayPredictions} 
               lifeBall={thursdayLifeBall}  // <- Add this
            />
            <MachineLearning />
        </AppContainer>
    );
}

export default App;
