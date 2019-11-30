/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const fs = require('fs');
const con = require('./Database Connection/connection.js');

const rawdata = fs.readFileSync('movies.json');
const movies = JSON.parse(rawdata);

function NAremover(obj) {
  for (const k of Object.keys(obj)) {
    if (obj[k] === 'NA') {
      obj[k] = 0;
    }
  }
  return obj;
}

function insertDataJSONtoSql(obj) {
  const sql = `INSERT INTO Movies values (${obj.Rank},"${obj.Title}","${obj.Description}",${obj.Runtime},"${obj.Genre}",${obj.Rating},${obj.Metascore},${obj.Votes},${obj.Gross_Earning_in_Mil},"${obj.Director}","${obj.Actor}",${obj.Year});`;
  con.query(sql, (error, result) => {
    if (error) throw error;
    console.log('Result', JSON.stringify(result));
  });
}


function enterDatainDirectors(id, obj) {
  const sql = `Insert into Directors Values (${id},'${obj.Director}');`;
  con.query(sql, (error, result) => {
    if (error) throw error;
    console.log('Result', JSON.stringify(result));
  });
}

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  for (let i of movies) {
    if (Object.values(i).includes('NA')) {
      i = NAremover(i);
      insertDataJSONtoSql(i);
    } else {
      insertDataJSONtoSql(i);
    }
  }
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  const sql = 'Create table Directors(id INT, Director Varchar(50));';
  con.query(sql, (error, result) => {
    if (error) throw error;
    console.log('Result', JSON.stringify(result));
  });
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  let count = 0;
  const director = {};
  for (const i of movies) {
    if (!director[i.Director]) {
      count += 1;
      enterDatainDirectors(count, i);
      director[i.Director] = 1;
    }
  }
});
