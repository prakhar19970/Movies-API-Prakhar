/* eslint-disable max-len */

const express = require('express');

const app = express();

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: false })); // support encoded bodies

const movieFunctions = require('../Functions/moviesFunctions');
const directorFunctions = require('../Functions/directorFunctions');


// Movie functions---------->
app.get('/api/movies/', (req, res) => {
  movieFunctions.getAllMovies().then((returnAllMovies) => {
    // console.log(result);
    res.status(200).send(returnAllMovies);
  });
});

app.post('/api/movies/', (req, res) => {
  const { body } = req;
  const movie = {
    title: body.title,
    description: body.description,
    runtime: body.runtime,
    genre: body.genre,
    rate: body.rate,
    metascore: body.metascore,
    vote: body.vote,
    gross: body.gross,
    dir: body.dir,
    actor: body.actor,
    year: body.year,
  };
  movieFunctions.addNewMovie(movie).then((newMovie) => {
    const id = (newMovie.insertId);
    res.status(201).send(`Movie added successfully at ${id} Status Code:${res.statusCode}`);
  }).catch((error) => {
    console.log(error);
    res.statusCode(404);
  });
});

app.put('/api/movies/:movieId', (req, res) => {
  const { body } = req;
  const updatemovie = {
    column: body.column,
    value: body.value,
  };
  const id = req.params.movieId;
  if (id === '' || id === ' ') {
    res.status(400).send(' Bad request enter a correct Id');
  } else {
    movieFunctions.checkMovierank(id).then((returnedRank) => {
      console.log(returnedRank[0].Rank);
      movieFunctions.updateMovies(returnedRank[0].Rank, updatemovie).then((returnUpdatedMovie) => {
        if (returnUpdatedMovie.length === 0) {
          res.sendStatus(404);
        }
        res.status(202).send(`Movie ${body.value} updated successfully at ${id} Status Code:${res.statusCode}`);
      });
    }).catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
  }
});

app.delete('/api/movies/:movieId', (req, res) => {
  const id = req.params.movieId;
  movieFunctions.deleteMovies(id).then((returnDeletedMovie) => {
    if (returnDeletedMovie.length === 0) {
      res.status(400).send(`id ${id} does not exists  Status Code:${res.statusCode}`);
    } else {
      res.status(410).send(`Movie deleted at ${id} Status Code:${res.statusCode}`);
    }
  }).catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
});

app.get('/api/movies/:movieId', (req, res) => {
  movieFunctions.getMoviesWithID(req.params.movieId).then((returnMovieById) => {
    // console.log(result);
    if (returnMovieById.length === 0) {
      res.sendStatus(400);
    } else {
      res.status(200).send(returnMovieById);
    }
  }).catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
});


// Director Functions-------------->

app.get('/api/directors/', (req, res) => {
  directorFunctions.getAllDirectors().then((returnAllDirectors) => {
    res.status(200).send(returnAllDirectors);
  });
});

app.get('/api/directors/:directorId', (req, res) => {
  directorFunctions.getDirectorsWithID(req.params.directorId).then((returnDirectorById) => {
    if (returnDirectorById.length === 0) {
      res.sendStatus(400);
    } else {
      res.status(200).send(`Director : ${returnDirectorById[0].Director}  Status Code:${res.statusCode}`);
    }
  }).catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
});

app.post('/api/directors/', (req, res) => {
  const { name } = req.body;
  // console.log(typeof(name));
  if (name === '' || name === ' ' || typeof (name) === 'number') {
    res.status(400).send(`Bad request enter a name  Status Code:${res.statusCode}`);
  } else {
    directorFunctions.addNewDirector(name).then((result) => {
      if (typeof (result) === 'object') {
        console.log(result);
        const id = (result.insertId);
        res.status(201).send(`Director ${name} added at ${id} Status Code:${res.statusCode}`);
      } else {
        res.status(400).send(`Bad request enter a name Status Code:${res.statusCode}`);
      }
    }).catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
  }
});

app.put('/api/directors/:directorId', (req, res) => {
  const { name } = req.body;
  // console.log(name);
  const id = req.params.directorId;
  if (id === '' || id === ' ') {
    res.status(400).send(' Bad request enter a correct Id');
  } else {
    directorFunctions.checkDirectorId(id).then((returnedId) => {
      console.log(returnedId[0].id);
      directorFunctions.updateDirector(returnedId[0].id, name).then((returnedUpdatedDirector) => {
        console.log(returnedUpdatedDirector);
        res.status(202).send(`Movie ${name} updated successfully at ${id} Status Code:${res.statusCode}`);
      });
    }).catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
  }
});

app.delete('/api/directors/:directorId', (req, res) => {
  const id = req.params.directorId;
  directorFunctions.deleteDirector(id).then((deletedDirector) => {
    if (deletedDirector.length === 0) {
      res.status(400).send(`id ${id} does not exists`);
    } else {
      res.status(410).send(`Director deleted at ${id} Status Code:${res.statusCode}`);
    }
  }).catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
});

app.listen(8080);
