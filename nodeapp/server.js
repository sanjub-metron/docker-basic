const express = require("express");
const mysql = require("mysql2/promise");
const redis = require("redis");

const app = express();
const PORT = 3000;

// MySQL connection
async function getMysqlConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_NAME || "myappdb",
  });
}

// Redis connection
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || "redis"}:6379`,
});
redisClient.connect().catch(console.error);

app.get("/api", async (req, res) => {
  try {
    const conn = await getMysqlConnection();
    const [rows] = await conn.query("SELECT NOW() as now");
    await conn.end();

    await redisClient.set("last_access", new Date().toISOString());
    const lastAccess = await redisClient.get("last_access");

    res.json({
      mysql_time: rows[0].now,
      redis_last_access: lastAccess,
      message: "Hello from Node.js + MySQL + Redis",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Sanju" },
    { id: 2, name: "Kapil" },
  ]);
});

app.listen(PORT, () => console.log(`Node app running on port ${PORT}`));
