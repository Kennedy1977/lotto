import { useState, useEffect } from 'react';

const useMondayThursdayPredictions = (draws) => {
    const [mondayPredictions, setMondayPredictions] = useState([]);
    const [thursdayPredictions, setThursdayPredictions] = useState([]);
    const [mondayLifeBall, setMondayLifeBall] = useState(null);
    const [thursdayLifeBall, setThursdayLifeBall] = useState(null);

    const getMostFrequentNumber = (numbers) => {
        const frequency = {};
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });
        return parseInt(Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a])[0]);
    };

    const getMostFrequentNumbers = (numbers, count = 5) => {
        // Create a frequency object
        const frequency = {};
      
        numbers.forEach(num => {
          if (frequency[num]) {
            frequency[num]++;
          } else {
            frequency[num] = 1;
          }
        });
      
        // Convert frequency object to an array and sort by frequency
        const sortedNumbers = Object.keys(frequency)
          .map(num => ({ num: parseInt(num, 10), freq: frequency[num] }))
          .sort((a, b) => b.freq - a.freq || a.num - b.num);
      
        // Return the top 'count' numbers based on frequency
        return sortedNumbers.slice(0, count).map(item => item.num);
      };

    useEffect(() => {
        const mondayDraws = draws.filter(draw => new Date(draw.date).getUTCDay() === 1);
        const thursdayDraws = draws.filter(draw => new Date(draw.date).getUTCDay() === 4);

        setMondayPredictions(getMostFrequentNumbers(mondayDraws.flatMap(draw => draw.numbers)));
        setThursdayPredictions(getMostFrequentNumbers(thursdayDraws.flatMap(draw => draw.numbers)));
        setMondayLifeBall(getMostFrequentNumber(mondayDraws.map(draw => draw.lifeBall)));
        setThursdayLifeBall(getMostFrequentNumber(thursdayDraws.map(draw => draw.lifeBall)));
    }, [draws]);

    return { 
        mondayPredictions, thursdayPredictions, 
        mondayLifeBall, thursdayLifeBall  // <- Return these
    };
};

export default useMondayThursdayPredictions;
