const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'prakhar',
  password: 'Kochikame02@',
  database: 'Movies_Director',
});


function queryLauncher(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, result) => {
      if (error) {
        return reject(error);
      }
      // console.log(JSON.stringify(result));
      return resolve(result);
    });
  });
}
module.exports = { queryLauncher };
