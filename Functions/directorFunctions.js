/* eslint-disable max-len */

const { queryLauncher } = require('../Database Connection/connection.js');

function getAllDirectors() {
  const sql = 'Select * from Directors ;';
  return queryLauncher(sql);
}

function getDirectorsWithID(id) {
  const sql = `Select Director from Directors where id = ${id} ;`;
  return queryLauncher(sql);
  // return queryLauncher(sql);
}

function addNewDirector(name) {
  const sql = `Insert into Directors (Director) values('${name}');`;
  return queryLauncher(sql);
}

function checkDirectorId(id) {
  const sql1 = `Select id from Directors where id =${id} having COUNT(id)>0;`;
  return queryLauncher(sql1);
}
function updateDirector(id, name) {
  const sql2 = `Update Directors set Director ='${name}' where id =${id}`;
  return queryLauncher(sql2);
}

function deleteDirector(id) {
  const sql = `DELETE FROM Directors WHERE id = ${id} ;`;
  return queryLauncher(sql);
}


module.exports = {
  addNewDirector, getAllDirectors, checkDirectorId, getDirectorsWithID, updateDirector, deleteDirector,
};
