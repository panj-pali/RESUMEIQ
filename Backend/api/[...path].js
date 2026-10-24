const connectDB = require("../src/config/database");

module.exports = async function handler(req, res) {
  const pathname = new URL(req.url, "http://localhost").pathname;

  if (pathname === "/api/health") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "ok" }));
    return;
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

  try {
    const app = require("../src/app");
    return app(req, res);
  } catch (error) {
    console.error("API handler initialization failed:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      message: "API initialization failed. Check the Vercel function logs.",
    }));
  }
};
