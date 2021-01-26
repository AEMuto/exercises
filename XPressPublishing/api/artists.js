const express = require("express");
const artistRouter = express.Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

artistRouter.param("artistId", (req, res, next, artistId) => {
  db.get(
    `SELECT * FROM Artist WHERE id = $artistId`,
    { $artistId: artistId },
    (err, artist) => {
      if (err) {
        next(err);
      } else if (artist) {
        req.artist = artist;
        next();
      } else {
        res.sendStatus(404);
      }
    }
  );
});

artistRouter.get("/", (req, res, next) => {
  db.all(
    `SELECT * FROM Artist WHERE is_currently_employed = 1`,
    (err, artists) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ artists: artists });
      }
    }
  );
});

artistRouter.get("/:artistId", (req, res, next) => {
  res.status(200).json({ artist: req.artist });
});

artistRouter.post("/", (req, res, next) => {
  const artistToCreate = req.body.artist;
  const name = artistToCreate.name;
  const dateOfBirth = artistToCreate.dateOfBirth;
  const biography = artistToCreate.biography;
  const isCurrentlyEmployed = artistToCreate.isCurrentlyEmployed === 0 ? 0 : 1;

  if (!name || !dateOfBirth || !biography) {
    return res.sendStatus(400);
  }

  const sql = `INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) 
  VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)`;

  const values = {
    $name: name,
    $dateOfBirth: dateOfBirth,
    $biography: biography,
    $isCurrentlyEmployed: isCurrentlyEmployed,
  };

  db.run(sql, values, function (err) {
    if (err) {
      next(err);
    } else {
      db.get(
        `SELECT * FROM Artist WHERE id = ${this.lastID}`,
        (err, artist) => {
          res.status(201).json({ artist: artist });
        }
      );
    }
  });
});

artistRouter.put("/:artistId", (req, res, next) => {
  const artistToCreate = req.body.artist;
  const artistId = req.params.artistId;
  const name = artistToCreate.name;
  const dateOfBirth = artistToCreate.dateOfBirth;
  const biography = artistToCreate.biography;
  const isCurrentlyEmployed = artistToCreate.isCurrentlyEmployed;

  if (
    !artistId ||
    !name ||
    !dateOfBirth ||
    !biography ||
    !isCurrentlyEmployed
  ) {
    return res.sendStatus(400);
  }

  const sql = `UPDATE Artist 
  SET name = $name, date_of_birth = $dateOfBirth, biography = $biography, is_currently_employed = $isCurrentlyEmployed
  WHERE id = $id`;

  const values = {
    $id: artistId,
    $name: name,
    $dateOfBirth: dateOfBirth,
    $biography: biography,
    $isCurrentlyEmployed: isCurrentlyEmployed,
  };

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Artist WHERE id = ${artistId}`, (err, artist) => {
        res.status(200).json({ artist: artist });
      });
    }
  });
});

artistRouter.delete("/:artistId", (req, res, next) => {
  const artistId = req.params.artistId;
  const sql = `UPDATE Artist
  SET is_currently_employed = 0
  WHERE id = ${artistId}`;
  db.run(sql, (err) => {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Artist WHERE id = ${artistId}`, (err, artist) => {
        res.status(200).json({ artist: artist });
      });
    }
  });
});

module.exports = artistRouter;
