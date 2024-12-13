  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import "../Pantries.css"; // Import custom CSS

  const Pantries = () => {
    const [pantries, setPantries] = useState([]);
    const [filters, setFilters] = useState({
      dayFilter: "",
      openTimeFilter: "",
      closeTimeFilter: "",
      zipCodeFilter: "",
    });

    useEffect(() => {
      const fetchAllPantries = async () => {
        try {
          const res = await axios.get("http://localhost:8800/pantries");
          setPantries(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchAllPantries();
    }, []);

    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    };

    const filteredPantries = pantries.filter((pantry) => {
      const dayMatch = !filters.dayFilter || pantry.DayOfWeek === filters.dayFilter;
      const openTimeMatch =
        !filters.openTimeFilter || pantry.OpeningTime >= filters.openTimeFilter;
      const closeTimeMatch =
        !filters.closeTimeFilter || pantry.ClosingTime <= filters.closeTimeFilter;
      const zipCodeMatch =
        !filters.zipCodeFilter ||
        (pantry.ZipCode && pantry.ZipCode.toString().includes(filters.zipCodeFilter));
    
      return dayMatch && openTimeMatch && closeTimeMatch && zipCodeMatch;
    });
    

    return (
      <div className="pantries-container">
        <h1 className="pantries-title">Pantries</h1>

        <form className="filter-form">
          {/* Day Filter */}
          <div className="form-group">
            <label htmlFor="dayFilter">Day:</label>
            <select
              id="dayFilter"
              name="dayFilter"
              value={filters.dayFilter}
              onChange={handleFilterChange}
            >
              <option value="">-- Select Day --</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          {/* Open Time Filter */}
          <div className="form-group">
            <label htmlFor="openTimeFilter">Open Time:</label>
            <select
              id="openTimeFilter"
              name="openTimeFilter"
              value={filters.openTimeFilter}
              onChange={handleFilterChange}
            >
              <option value="">-- Select Open Time --</option>
              <option value="06:00:00">6:00 AM</option>
              <option value="08:00:00">8:00 AM</option>
              <option value="09:00:00">9:00 AM</option>
              <option value="10:00:00">10:00 AM</option>
              <option value="12:00:00">12:00 PM</option>
              <option value="14:00:00">2:00 PM</option>
              <option value="16:00:00">4:00 PM</option>
              <option value="18:00:00">6:00 PM</option>
              <option value="20:00:00">8:00 PM</option>
            </select>
          </div>

          {/* Close Time Filter */}
          <div className="form-group">
            <label htmlFor="closeTimeFilter">Close Time:</label>
            <select
              id="closeTimeFilter"
              name="closeTimeFilter"
              value={filters.closeTimeFilter}
              onChange={handleFilterChange}
            >
              <option value="">-- Select Close Time --</option>
              <option value="10:00:00">10:00 AM</option>
              <option value="12:00:00">12:00 PM</option>
              <option value="14:00:00">2:00 PM</option>
              <option value="16:00:00">4:00 PM</option>
              <option value="18:00:00">6:00 PM</option>
              <option value="20:00:00">8:00 PM</option>
              <option value="22:00:00">10:00 PM</option>
            </select>
          </div>

          {/* Zip Code Filter */}
          <div className="form-group">
            <label htmlFor="zipCodeFilter">Zip Code:</label>
            <input
              type="text"
              id="zipCodeFilter"
              name="zipCodeFilter"
              value={filters.zipCodeFilter}
              onChange={handleFilterChange}
              placeholder="Enter Zip Code"
            />
          </div>
        </form>

        {/* Table to Display Pantries */}
        <table className="pantries-table">
          <thead>
            <tr>
              <th>Organization Name</th>
              <th>Day</th>
              <th>Open Time</th>
              <th>Close Time</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {filteredPantries.map((pantry, index) => (
              <tr key={index}>
                <td>{pantry.OrganizationName}</td>
                <td>{pantry.DayOfWeek}</td>
                <td>{pantry.OpeningTime}</td>
                <td>{pantry.ClosingTime}</td>
                <td>{pantry.ZipCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default Pantries;
