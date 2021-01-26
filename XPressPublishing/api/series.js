const express = require("express");
const issueRouter = require("./issues");
const serieRouter = express.Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

serieRouter.use("/:seriesId/issues", issueRouter);

// Router param for handling specified serieId
serieRouter.param("seriesId", (req, res, next, seriesId) => {
  db.get(
    `SELECT * FROM Series WHERE Series.id = $seriesId`,
    { $seriesId: seriesId },
    (err, series) => {
      if (err) {
        next(err);
      } else if (series) {
        req.series = series;
        next();
      } else {
        res.sendStatus(404);
      }
    }
  );
});

// Get all serie in the db
serieRouter.get("/", (req, res, next) => {
  db.all(`SELECT * FROM Series`, (err, series) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ series: series });
    }
  });
});

// Work with the router param to attach specified serieId on the request object
serieRouter.get("/:seriesId", (req, res, next) => {
  res.status(200).json({ series: req.series });
});

// Update handler
serieRouter.post("/", (req, res, next) => {
  const serieToCreate = req.body.series;
  const name = serieToCreate.name;
  const description = serieToCreate.description;

  if (!name || !description) {
    return res.sendStatus(400);
  }

  const sql = `INSERT INTO Series (name, description) VALUES ($name, $description)`;
  const values = {
    $name: name,
    $description: description,
  };

  db.run(sql, values, function (err) {
    if (err) {
      next(err);
    } else {
      db.get(
        `SELECT * FROM Series WHERE Series.id = ${this.lastID}`,
        (err, serie) => {
          res.status(201).json({ series: serie });
        }
      );
    }
  });
});

serieRouter.put("/:seriesId", (req, res, next) => {
  const serieToCreate = req.body.series;
  const serieId = req.params.seriesId;
  const name = serieToCreate.name;
  const description = serieToCreate.description;

  if (!name || !description) {
    return res.sendStatus(400);
  }

  const sql = `UPDATE Series
  SET name = $name, description = $description WHERE Series.id = $serieId`;
  const values = {
    $name: name,
    $description: description,
    $serieId: serieId,
  };

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
      db.get(
        `SELECT * FROM Series WHERE Series.id = ${serieId}`,
        (err, serie) => {
          res.status(200).json({ series: serie });
        }
      );
    }
  });
});

module.exports = serieRouter;
