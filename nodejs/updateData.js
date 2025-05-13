import fs from 'fs';

// Load the JSON file
const filePath = '../../businesses_large.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// List of real cities in California
const cities = [
    "Montecito",
    "Los Angeles",
    "Santa Barbara",
    "San Diego",
    "Long Beach",
    "Isla Vista",
    "Fresno"
];

// Update each record's city field
data.forEach(record => {
    record.city = cities[Math.floor(Math.random() * cities.length)];
});

// Save the updated JSON back to the file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('City fields updated successfully.');