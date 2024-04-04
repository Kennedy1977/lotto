import React, { useState } from 'react';
import useLotteryPredictor from '../hooks/useLotteryPredictor';
import pastDraws from '../data/data.json';

const MachineLearning = () => {

    const [predictionResult, setPredictionResult] = useState(null);
    const { model, trainModel, predict } = useLotteryPredictor();
  

    const handleTrain = async () => {
      const data = pastDraws;
      await trainModel(data);
  };

  const handlePredict = () => {
      if (model) {
          const lastDraw = [6,12,13,15,41];
          const result = predict(lastDraw);
          setPredictionResult(result);
      }
  };


    return <div>
            <h2>Lottery Predictor</h2>
            <button onClick={handleTrain}>Train Model</button>
            <button onClick={handlePredict}>Predict Next Draw</button>
            { predictionResult && <div>Next Draw Prediction: {predictionResult.join(",")}</div> }
        </div>;
};

export default MachineLearning;