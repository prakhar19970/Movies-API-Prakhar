
const { queryLauncher } = require('../Database Connection/connection.js');


//--------------------------------------------------
function getAllMovies() {
  const sql = 'Select * from Movies ;';
  return queryLauncher(sql);
}


function getMoviesWithID(id) {
  const sql = `Select * from Movies where Rank = ${id};`;
  return queryLauncher(sql);
}

function addNewMovie(movie) {
  const sql = `Insert into Movies (Title,Description,Runtime,Genre,Rating,Metascore,Votes,Gross_Earning_in_Mil,Director,Actor,Year) values('${movie.title}','${movie.description}',${movie.runtime},'${movie.genre}',${movie.rate},${movie.metascore},${movie.vote},${movie.gross},'${movie.dir}','${movie.actor}',${movie.year});`;
  return queryLauncher(sql);
}

function checkMovierank(id) {
  const sql1 = `Select Rank from Movies where Rank =${id} having COUNT(Rank)>0;`;
  return queryLauncher(sql1);
}

function updateMovies(id, object) {
  const sql = `Update Movies set ${object.column}=${object.value} where Rank =${id};`;
  return queryLauncher(sql);
}

function deleteMovies(id) {
  const sql = `DELETE FROM Movies WHERE Rank = ${id};`;
  return queryLauncher(sql);
}

module.exports = {
  deleteMovies, updateMovies, checkMovierank, addNewMovie, getAllMovies, getMoviesWithID,
};
