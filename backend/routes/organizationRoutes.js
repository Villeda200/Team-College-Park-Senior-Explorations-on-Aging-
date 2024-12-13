const express = require("express");
const router = express.Router();

// Route to fetch operating hours with optional filters
router.get("/operating-hours", async (req, res) => {
  const { DayOfWeek, OpeningTime, ClosingTime } = req.query; // Extract filters from query string

  try {
    // Start a Knex query
    let query = req.db("organization_operating_hours_zip").select("*");

    // Dynamically apply filters if they are provided
    if (DayOfWeek) query = query.where("DayOfWeek", DayOfWeek);
    if (OpeningTime) query = query.where("OpeningTime", ">=", OpeningTime);
    if (ClosingTime) query = query.where("ClosingTime", "<=", ClosingTime);

    // Execute the query
    const results = await query;

    // Return the results as JSON
    res.status(200).json(results);
  } catch (error) {
    // Handle errors
    console.error("Error fetching operating hours:", error.message);
    res.status(500).json({ error: "Failed to retrieve operating hours" });
  }
});

module.exports = router;
