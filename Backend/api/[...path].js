const app = require("../src/app");
const connectDB = require("../src/config/database");

module.exports = async function handler(req, res) {
  await connectDB();
  return app(req, res);
};
