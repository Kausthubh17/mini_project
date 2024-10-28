const fs = require('fs');
const mongoose = require('mongoose');
const csv = require('csv-parser');
const College = require('/Users/kausthubhpeddibhotla/Documents/Web Development /mini_project/Back/college.js'); // Adjust the path as needed

mongoose.connect('mongodb://localhost:27017/college-rankings', {
  // Deprecated options removed
}).then(() => {
  console.log('Connected to MongoDB');
  importData();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});


const importData = () => {
    const results = [];
  
    fs.createReadStream('/Users/kausthubhpeddibhotla/Documents/Data_set(project)/TSEAMCET_2023_FINALPHASE(new).csv') // Update this path
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          await College.deleteMany({});
          console.log('Existing data cleared');
  
          for (const item of results) {
            const parseValue = (field) => {
              return field && typeof field === 'string' ? parseFloat(field.trim()) || null : null;
            };
  
            const collegeData = {
              name: item['Institute Name'] || null,
              ocB: parseValue(item["OCB"]),
              ocG: parseValue(item['OCG']),
              bcaB: parseValue(item['BC_AB']),
              bcaG: parseValue(item['BC_AG']),
              bcbB: parseValue(item['BC_BB']),
              bcbG: parseValue(item['BC_BG']),
              bccB: parseValue(item['BC_CB']),
              bccG: parseValue(item['BC_CG']),
              bcdB: parseValue(item['BC_DB']),
              bcdG: parseValue(item['BC_DG']),
              bceB: parseValue(item['BC_EB']),
              bceG: parseValue(item['BC_EG']),
              scB: parseValue(item['SCB']),
              scG: parseValue(item['SCG']),
              stB: parseValue(item['STB']),
              stG: parseValue(item['STG']),
              egoB: parseValue(item['EWSGO']),
              egoG: parseValue(item['EWSG']),
              branch: item['Branch Name'] || null,
            };
  
            // Log each entry to check if data is being parsed correctly
            console.log('Importing:', collegeData);
  
            // Create new college entry
            const college = new College(collegeData);
            await college.save();
          }
  
          console.log('Data imported successfully');
        } catch (error) {
          console.error('Error importing data:', error);
        } finally {
          mongoose.connection.close();
        }
      });
  };
  