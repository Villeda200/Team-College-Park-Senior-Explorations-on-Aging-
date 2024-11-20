// Fetch data with optional filters
async function fetchOperatingHours(filters = {}) {
  try {
    // Build query string from filters
    const params = new URLSearchParams(filters).toString();

    // Fetch data from the backend
    const response = await fetch(`/organizations/operating-hours?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Populate the table with the filtered data
    populateTable(data);
  } catch (error) {
    console.error("Error fetching operating hours:", error);
  }
}

// Function to populate the table with fetched data
function populateTable(data) {
  const tableBody = document.getElementById("organizationTableBody");

  // Clear existing rows in case of re-render
  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='4'>No results found</td></tr>";
    return;
  }

  // Add rows for each organization operating hour
  data.forEach(row => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${row.OrganizationName || 'N/A'}</td>
      <td>${row.DayOfWeek || 'N/A'}</td>
      <td>${row.OpeningTime || 'N/A'}</td>
      <td>${row.ClosingTime || 'N/A'}</td>
    `;
    tableBody.appendChild(tableRow);
  });
}

// Handle form submission to apply filters
document.getElementById("filterForm").addEventListener("submit", event => {
  event.preventDefault();

  // Get values from dropdowns
  const day = document.getElementById("dayFilter").value;
  const openTime = document.getElementById("openTimeFilter").value;
  const closeTime = document.getElementById("closeTimeFilter").value;

  // Build filters object
  const filters = {};
  if (day) filters.DayOfWeek = day; // Matches backend query parameter
  if (openTime) filters.OpeningTime = openTime;
  if (closeTime) filters.ClosingTime = closeTime;

  // Fetch data with the specified filters
  fetchOperatingHours(filters);
});

// Fetch all data on initial page load
fetchOperatingHours();





  