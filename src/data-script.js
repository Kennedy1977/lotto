const data = require('./data/data.json');
const fs = require('fs');

const mondayResults = [];
const thursdayResults = [];

data.forEach(record => {
  const dayOfWeek = new Date(record.date).getUTCDay();
  if(dayOfWeek === 1) { 
    mondayResults.push(record);
  } else if(dayOfWeek === 4) { 
    thursdayResults.push(record);
  }
});

// Write Monday Results to monday.json
fs.writeFileSync('./data/monday.json', JSON.stringify(mondayResults, null, 2));

// Write Thursday Results to thursday.json
fs.writeFileSync('./data/thursday.json', JSON.stringify(thursdayResults, null, 2));
