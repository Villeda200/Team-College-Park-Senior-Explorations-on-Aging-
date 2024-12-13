const knex = require("knex");
const express = require("express");
const path = require("path");
const organizationRoutes = require("./routes/organizationRoutes");
const PORT = process.env.PORT || 3131;

const app = express();
const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "iConsult2024",
    database: `inst490`,
  },
});

// Middleware to make the database connection available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files from the client folder
app.use(express.static(path.join(__dirname, "../client")));

// Routes
// Route to serve the homepage (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.use("/organizations", organizationRoutes);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});

module.exports = db;
