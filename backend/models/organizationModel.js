async function getOperatingHours(db) {
  // Fetch all records from the `organization_operating_hours` view
  try {
    const results = await db('organization_operating_hours').select('*');
    return results;
  } catch (error) {
    console.error("Error fetching operating hours:", error);
    throw error; // Re-throw to handle the error upstream
  }
}

module.exports = {
  getOperatingHours,
};


  