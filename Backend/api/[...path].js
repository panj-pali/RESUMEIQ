const app = require("../src/app");
const connectDB = require("../src/config/database");

module.exports = async function handler(req, res) {
  const pathname = new URL(req.url, "http://localhost").pathname;

  if (pathname === "/api/health") {
    return app(req, res);
  }

  try {
    await connectDB();
  } catch (error) {
    console.error("API database connection failed:", error);
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      message: "Database unavailable. Check MONGO_URI and database network access.",
    }));
    return;
  }

  return app(req, res);
};
