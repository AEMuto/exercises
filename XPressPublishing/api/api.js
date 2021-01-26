const { Router } = require("express");
const express = require("express");

const apiRouter = express.Router();
const artistRouter = require("./artists");
const serieRouter = require("./series");

apiRouter.use("/artists", artistRouter);
apiRouter.use("/series", serieRouter);

module.exports = apiRouter;
