import React, { useState, useEffect } from 'react';

const DataTable = () => {
  // Step 1: Initialize state to store fetched data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Step 2: Fetch data from backend (assuming an API endpoint exists)
  useEffect(() => {
    // Replace with the URL of your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('https://backend-upqj.onrender.com/api/students'); // Example URL
        if (!response.ok) {
          throw new Error('Data fetch failed');
        }
        const result = await response.json();
        setData(result); // Set data to state
      } catch (error) {
        setError(error.message); // Handle error if fetching fails
      } finally {
        setLoading(false); // Stop loading when the request is complete
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Step 3: Render the table
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data Table</h1>
      <table border="1">
        <thead>
          <tr>
            <th>PIN.NO</th>
            <th>NAME</th>
            <th>BRANCH</th>
            <th>SEM</th>
            <th>MARKS</th>
            <th>Grand Total</th>
             <th>Result</th>
            <th>Month &amp Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.pinnumber}</td>
              <td>{item.name}</td>
              <td>{item.branch}</td>
              <td>{item.semester}</td>
              <td>
    {item.marks
      .filter(mark => mark.subcode !== "Grand Total" && mark.subcode !== "Result" && mark.subcode !== "Month & Year" && mark.subcode)
      .map((mark, markIndex) => (
        <div key={markIndex}>
          <strong>{mark.subcode}:</strong> {mark.marks.join(", ")}
        </div>
      ))}
  </td>

  {/* Grand Total */}
  <td>
    {item.marks
      .filter(mark => mark.subcode === "Grand Total")
      .map((mark, markIndex) => (
        <div key={markIndex}>
           {mark.marks.join(", ")}
        </div>
      ))}
  </td>

  {/* Result */}
  <td>
    {item.marks
      .filter(mark => mark.subcode === "Result")
      .map((mark, markIndex) => (
        <div key={markIndex}>
         {mark.marks.join(", ")}
        </div>
      ))}
  </td>

  {/* Month & Year */}
  <td>
    {item.marks
      .filter(mark => mark.subcode === "Month & Year")
      .map((mark, markIndex) => (
        <div key={markIndex}>
         {mark.marks.join(", ")}
        </div>
      ))}
  </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
