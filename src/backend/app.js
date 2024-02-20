const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000'); // Replace with the origin of your Vue.js app
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//calculate total winrate..

const ACTIVE_CHARACTER = 'DEFECT';

app.get('/winrate', (req, res) => {
  let wins = 0;
  let loses = 0;
  let percentage = 0;
  fs.readdir('./DEFECT', (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    files.forEach((file) => {
      const filepath = path.join(`./${ACTIVE_CHARACTER}`, file);

      fs.readFile(filepath, 'utf-8', (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        let run = JSON.parse(result);
        run.killed_by ? loses++ : wins++;
        if (wins + loses === files.length) {
          percentage = (wins / (wins + loses)) * 100;
          console.log('###DEFECT###');
          console.log(
            `WINS: ${wins} - LOSES: ${loses} - WIN PERCENTAGE: ${percentage.toFixed(
              2
            )}%`
          );
          res.json({ percentage: percentage.toFixed(2) });
        }
      });
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
