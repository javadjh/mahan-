const cors = require("cors");

const whitelist = [
  "87.236.215.49:80",
  "87.236.215.49:80",
  "localhost:3100",
  "localhost:3300",
  "localhost",
  "localhost:8080",
  "116.202.210.69:3100",
  "116.202.210.69:3300",
];
module.exports.CorsMiddleware = cors((req, handler) => {
  let options;

  if (whitelist.indexOf(req?.get("host")) !== -1) {
    options = { origin: true };
  } else {
    options = { origin: false };
  }
  handler(null, options);
});
