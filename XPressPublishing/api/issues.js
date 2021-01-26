const express = require("express");
const issueRouter = express.Router({ mergeParams: true });
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

issueRouter.param("issueId", (req, res, next, issueId) => {
  db.get(
    `SELECT * FROM Issue WHERE Issue.id = $issueId`,
    {
      $issueId: issueId,
    },
    (err, issue) => {
      if (err) {
        next(err);
      } else if (issue) {
        req.issue = issue;
        next();
      } else {
        res.sendStatus(404);
      }
    }
  );
});

issueRouter.get("/", (req, res, next) => {
  db.all(
    `SELECT * FROM Issue WHERE Issue.series_id = $seriesId`,
    {
      $seriesId: req.params.seriesId,
    },
    (err, issues) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ issues: issues });
      }
    }
  );
});

issueRouter.post("/", (req, res, next) => {
  const issueToCreate = req.body.issue;
  const name = issueToCreate.name;
  const number = issueToCreate.issueNumber;
  const date = issueToCreate.publicationDate;
  const artistId = issueToCreate.artistId;
  const seriesId = req.params.seriesId;

  db.get(
    `SELECT * FROM Artist WHERE Artist.id = $artistId`,
    { $artistid: artistId },
    (err, artist) => {
      if (err) {
        next(err);
      } else {
        if (!name || !number || !date || !artistId) {
          return res.sendStatus(404);
        }
        db.run(
          `INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id)
      VALUES ($name, $number, $date, $artistId, $seriesId)`,
          {
            $name: name,
            $number: number,
            $date: date,
            $artistid: artistId,
            $seriesId: seriesId,
          },
          function (err) {
            if (err) {
              next(err);
            } else {
              db.get(
                `SELECT * FROM Issue WHERE Issue.id = ${this.lastID}`,
                (err, issue) => {
                  res.status(201).json({ issue: issue });
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = issueRouter;
