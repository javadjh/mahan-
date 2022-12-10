// required external package
const express = require("express");
const winston = require("winston");
const process = require("process");
const schedule = require("node-schedule");
const cors = require("cors");
const glob = require("glob");
const { isValidObjectId } = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
require("express-async-errors");
require("winston-mongodb");
dotenv.config();

// required internal
require("./dbconfig/dbConfig");
const UserModel = require("./model/UserModel");
const { adminDashboard } = require("./handler/user/query/AdminDashboardQuery");
const { searchEngine } = require("./handler/file/query/SearchEngineQuery");
const {
  getFileStatistic,
} = require("./handler/file/query/GetFileStatisticQuery");
const { initProject } = require("./handler/InitProject");
const path = require("path");
const AccessModel = require("./model/AccessModel");
const { OCR } = require("./utility/OCR");
const { CorsMiddleware } = require("./middlewares/cors");
const { headersMiddleware } = require("./middlewares/header");

// ini express and route
const app = express();
app.use(CorsMiddleware);
app.use(headersMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(express.static("config"));

app.use(cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, x-auth-token, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("token", " 3.2.1");
//   next();
// });

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

/*var JavaScriptObfuscator = require('javascript-obfuscator');
let test = JavaScriptObfuscator.obfuscate(``)

fs.writeFileSync("./handler/init.js",test.getObfuscatedCode())*/
// routes
app.get("/init/:id", require("./handler/InitProject"));
app.use("/api/v1", require("./router/RoleRouter"));
app.use("/api/v1", require("./router/AccessRouter"));
app.use("/api/v1", require("./router/UserRouter"));
app.use("/api/v1", require("./router/ArchiveRouter"));
app.use("/api/v1", require("./router/FormRouter"));
app.use("/api/v1", require("./router/PersonRouter"));
app.use("/api/v1", require("./router/LegalPersonRouter"));
app.use("/api/v1", require("./router/ArchiveTreeRouter"));
app.use("/api/v1", require("./router/LogRouter"));
app.use("/api/v1", require("./router/FileRouter"));
app.use("/api/v1", require("./router/DocumentRouter"));
app.use("/api/v1", require("./router/LendRouter"));
app.use("/api/v1", require("./router/FileAlertRoute"));
app.use("/api/v1", require("./router/ApplicantRouter"));
app.use("/api/v1", require("./router/EmailRouter"));
app.use("/api/v1", require("./router/AppSettingRouter"));
app.use("/api/v1", require("./router/SupervisorRouter"));
app.use("/api/v1", require("./router/LibraryRouter"));
app.get("/tt", async (req, res) => {
  const { jsPDF } = require("jspdf");
  let pdf = new jsPDF();
  return res.send("ok");
});

app.get("/dashboard", adminDashboard);

//jobs
schedule.scheduleJob("10 * * * * *", async function () {
  console.log("The answer to life, the universe, and everything!");
  glob(
    "uploads\\\\" + "*",
    { ignore: ["uploads\\\\" + "*.crypt"] },
    async function (err, files) {
      for (let i = 0; i < files.length; i++) {
        if (
          !isValidObjectId(
            files[i].substr(files[i].lastIndexOf("/") + 1, files[i].length - 1)
          )
        ) {
          const stats = await fs.statSync(files[i]);
          const today = new Date();
          const endDate = stats.ctime;
          const minutes = parseInt(
            (Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60)) % 60
          );
          if (minutes > 1) await fs.unlinkSync(files[i]);

          console.log(
            files[i].substr(files[i].indexOf("/") + 1, files[i].length)
          );
        }
      }
    }
  );
});

//config other library
winston.add(new winston.transports.File({ filename: "log.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: process.env.DB_URL,
    level: "error",
  })
);

//set other middleware
app.use(require("./middlewares/ErrorMiddleware"));
process.on("uncaughtException", (uncaughtExceptionError) => {
  winston.error(uncaughtExceptionError);
});
process.on("unhandledRejection", (unhandledRejectionError) => {
  winston.error(unhandledRejectionError);
});

app.get("/", async (req, res) => {
  res.send("this is api route , come back to the client :)");
});

app.listen(process.env.PORT, () => {
  console.log(`http://192.168.1.34:${process.env.PORT}`);
});
