const cors = require("cors");

const whitelist = [
  "localhost:3000",
  "192.168.2.24:3000",
  "localhost:3100",
  "localhost:3300",
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
