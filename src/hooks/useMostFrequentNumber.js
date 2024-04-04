import { useState, useEffect } from 'react';

const useMostFrequentNumber = (pastDraws) => {
    const numbers = pastDraws.map(draw => draw.lifeBall);
    const [mostFrequentNumber, setMostFrequentNumber] = useState(null);

    useEffect(() => {
        const frequency = {};
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });

        const result = parseInt(Object.keys(frequency)
            .sort((a, b) => frequency[b] - frequency[a])[0]);

        setMostFrequentNumber(result);
    }, [numbers]);

    return mostFrequentNumber;
};

export default useMostFrequentNumber;
