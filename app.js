#!/usr/bin/env node

require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const cron = require('node-cron');

const multipart = require('connect-multiparty');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const morgan = require("morgan")
const moment = require("moment");
const chalk  = require("chalk");
const fs = require("fs")



const {
  cronSchedulePerMinute
} = require('./services/schedule/scheduleService')

const { MongoManager } = require("./db");

const indexRouter = require("./routes/index");



require("./globalFunctions");


const mongoManager = new MongoManager({
  useNewUrlParser: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoManager.connect();




app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multipart());
app.use(morgan(function (tokens, req, res) {
  let method = tokens.method(req, res);
  let url = tokens.url(req, res);
  let resptime = `${tokens['response-time'](req, res)} ms`;
  let time = moment().utcOffset(330).format('DD-MM-YYYY, HH:mm:ss A');
  return ` ${chalk.gray(time)}   ${chalk.bold.greenBright(method)} ${chalk.yellowBright(url)}  ${chalk.yellowBright(resptime)} ${chalk.redBright('api-request')}`;
}))





app.use("/api", indexRouter);
app.use("*", function (req, res) {
  res.status(404).json({ success: false, message: "Invalid route!"});
});



cronSchedulePerMinute()
cron.schedule('*/1 * * * *', () => {
  cronSchedulePerMinute()
});

module.exports = app;
