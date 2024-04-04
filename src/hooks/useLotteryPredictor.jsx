import { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const useLotteryPredictor = () => {
    const [model, setModel] = useState(null);

    const normalizeData = (data) => {
        // Assuming the max number in the dataset is 49 (as common in lotteries)
        return data.map(draw => ({
            date: draw.date,
            numbers: draw.numbers.map(num => num / 49),
            lifeBall: draw.lifeBall / 49
        }));
    };

    const predict = (inputData) => {
        if (!model) {
            console.warn("Model is not trained yet!");
            return null;
        }
    
        const normalizedInput = inputData.map(num => num / 49);  // Normalize the input
        const tensorInput = tf.tensor2d([normalizedInput]);      // Convert to tensor
    
        const prediction = model.predict(tensorInput);
    
        // Convert the prediction from tensor to array and denormalize it
        const denormalizedPrediction = prediction.dataSync().map(value => Math.round(value * 49));
    
        return denormalizedPrediction;
    };    

    const createDataset = (normalizedData) => {
        // This will create a dataset where input is a series of previous draws and output is the next draw
        const inputs = [];
        const labels = [];

        for (let i = 0; i < normalizedData.length - 1; i++) {
            inputs.push(normalizedData[i].numbers);
            labels.push(normalizedData[i + 1].numbers);
        }

        return { inputs: tf.tensor2d(inputs), labels: tf.tensor2d(labels) };
    };

    const trainModel = async (data) => {
        const normalizedData = normalizeData(data);
        const { inputs, labels } = createDataset(normalizedData);

        const lotteryModel = tf.sequential();

        lotteryModel.add(tf.layers.dense({ units: 5, inputShape: [5], activation: 'relu' }));
        lotteryModel.add(tf.layers.dense({ units: 5, activation: 'sigmoid' }));

        lotteryModel.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'meanSquaredError',
            metrics: ['accuracy'],
        });

        await lotteryModel.fit(inputs, labels, {
            epochs: 50,
            validationSplit: 0.2
        });

        setModel(lotteryModel);
    };

    return {
        model,
        predict,
        trainModel,
    };
};

export default useLotteryPredictor;
