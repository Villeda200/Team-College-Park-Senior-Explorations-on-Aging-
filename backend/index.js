import cors from "cors";
import express from "express";
import knex from "knex";
import mysql from "mysql";
import path from "path";
import { fileURLToPath } from "url";

const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "iConsult2024",
    database: "inst490",
  },
});

const app = express();
app.use(cors());
app.use(express.json());

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static public HTML files (moved to public-static folder)
app.use(
  "/static-pages",
  express.static(path.join(__dirname, "../client/public-static"))
);
app.use(
  "/public",
  express.static(path.join(__dirname, "../client/public"))
);
// Routes for public static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public-static/index.html"));
});

app.get("/organizations", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/public-static/organizations.html")
  );
});

app.get("/map", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public-static/map.html"));
});

// Serve React app (build folder)
app.use("/app", express.static(path.join(__dirname, "../client/build")));
app.get("/app/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// GET endpoint for querying pantries with filters
app.get("/pantries", async (req, res) => {
  const { dayFilter, openTimeFilter, closeTimeFilter, zipCodeFilter } =
    req.query;

  try {
    console.log("Route /pantries is being hit...");

    // Build query with filters
    let query = db("organization_operating_hours_Zip").select("*");

    if (dayFilter) {
      query = query.where("DayOfWeek", dayFilter);
    }
    if (openTimeFilter) {
      query = query.where("OpeningTime", ">=", openTimeFilter);
    }
    if (closeTimeFilter) {
      query = query.where("ClosingTime", "<=", closeTimeFilter);
    }
    if (zipCodeFilter) {
      query = query.where("ZipCode", "like", `%${zipCodeFilter}%`);
    }

    // Debug the generated query
    console.log("Generated query:", query.toString());

    const data = await query;
    console.log("Query Result:", data);
    res.json(data);
  } catch (err) {
    console.error("Error fetching pantries:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch pantries", details: err.message });
  }
});

// POST endpoint for adding pantry data
app.post("/pantries", async (req, res) => {
  try {
    console.log("Route /pantries is being hit for POST...");

    const {
      backendOrganizationName,
      backendDayOfWeek,
      backendOpeningTime,
      backendClosingTime,
      backendZipCode,
    } = req.body;

    if (
      !backendOrganizationName ||
      !backendDayOfWeek ||
      !backendOpeningTime ||
      !backendClosingTime ||
      !backendZipCode
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Start a transaction
    await db.transaction(async (trx) => {
      // Step 1: Check or insert into `organizations`
      let organization = await trx("organizations")
        .select("OrganizationID")
        .where("Name", backendOrganizationName)
        .first();

      if (!organization) {
        const [newOrganizationID] = await trx("organizations").insert(
          { Name: backendOrganizationName },
          ["OrganizationID"]
        );
        organization = { OrganizationID: newOrganizationID };
      }

      // Step 2: Insert a new row into `addresses`
      await trx("addresses").insert({
        Zip_Code: backendZipCode,
      });

      // Step 3: Retrieve the DayID based on backendDayOfWeek
      const day = await trx("days")
        .select("DayID")
        .where("day", backendDayOfWeek)
        .first();

      if (!day) {
        throw new Error(
          `Day "${backendDayOfWeek}" not found in the days table`
        );
      }

      // Step 4: Insert into `operatinghours`
      await trx("operatinghours").insert({
        OrganizationID: organization.OrganizationID,
        DayID: day.DayID,
        OpenTime: backendOpeningTime,
        CloseTime: backendClosingTime,
      });
    });

    console.log("Data inserted successfully");
    res.status(201).json({ message: "Data inserted successfully" });
  } catch (err) {
    console.error("Error posting to pantries:", err);
    res
      .status(500)
      .json({ error: "Failed to post to pantries", details: err.message });
  }
});

// Start the server
const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Public pages available at:
    - http://localhost:${PORT}/
    - http://localhost:${PORT}/organizations
    - http://localhost:${PORT}/map`);
  console.log(`React app available at:
    - http://localhost:${PORT}/app`);
});
