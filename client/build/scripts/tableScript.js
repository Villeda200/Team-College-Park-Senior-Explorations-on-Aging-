// Function to fetch and populate the table
async function populateTable() {
  try {
    // Get filter values
    const dayFilter = document.getElementById("dayFilter").value;
    const openTimeFilter = document.getElementById("openTimeFilter").value;
    const closeTimeFilter = document.getElementById("closeTimeFilter").value;
    const zipCodeFilter = document.getElementById("zipCodeFilter").value;

    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (dayFilter) queryParams.append("dayFilter", dayFilter);
    if (openTimeFilter) queryParams.append("openTimeFilter", openTimeFilter);
    if (closeTimeFilter) queryParams.append("closeTimeFilter", closeTimeFilter);
    if (zipCodeFilter) queryParams.append("zipCodeFilter", zipCodeFilter);

    // Fetch data from the server with filters
    const response = await fetch(
      `http://localhost:8800/pantries?${queryParams.toString()}`
    );
    const data = await response.json();

    const tableBody = document.getElementById("organizationTableBody");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Populate rows with fetched data
    if (data.length > 0) {
      data.forEach((pantry) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${pantry.OrganizationName}</td>
            <td>${pantry.DayOfWeek}</td>
            <td>${pantry.OpeningTime}</td>
            <td>${pantry.ClosingTime}</td>
            <td>${pantry.ZipCode || "N/A"}</td>
          `;

        tableBody.appendChild(row);
      });
    } else {
      tableBody.innerHTML =
        "<tr><td colspan='5'>No matching results found.</td></tr>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);

    const tableBody = document.getElementById("organizationTableBody");
    tableBody.innerHTML =
      "<tr><td colspan='5'>Failed to load data. Please try again later.</td></tr>";
  }
}

// Prevent form submission and apply filters dynamically
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("filterForm");

  // Intercept form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload
    populateTable(); // Update table with filters
  });

  // Initial table population
  populateTable();
});
