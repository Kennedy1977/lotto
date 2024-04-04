import { useState, useEffect } from 'react';

const useMostFrequentNumbers = pastDraws => {
    const numbers = pastDraws.flatMap(draw => draw.numbers);
    const [mostFrequentNumbers, setMostFrequentNumbers] = useState([]);
    const count = 5;

    useEffect(() => {
        const frequency = {};
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });
        
        const result = Object.keys(frequency)
            .sort((a, b) => frequency[b] - frequency[a])
            .slice(0, count)
            .map(num => parseInt(num));

        setMostFrequentNumbers(result);
    }, [numbers]);

    return mostFrequentNumbers;
};

export default useMostFrequentNumbers;
