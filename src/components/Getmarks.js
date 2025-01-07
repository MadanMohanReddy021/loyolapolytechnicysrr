import React, { useState, useEffect } from "react";

const MarksTable = () => {
  const [data, setData] = useState([]); // State to store parsed data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://backend-upqj.onrender.com/api/students"); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        // Clean and parse marks data, and filter out the "Result" subcode
        const cleanedData = result.map((item) => {
          let marks = item.marks ? item.marks : [];

          // If marks are a string, parse them
          if (typeof marks === 'string') {
            marks = JSON.parse(marks.replace(/""/g, '"')); // Handle the double-quote issue
          }

          // Filter out the "Result" and "Month & Year" subcodes in the marks array
          const filteredMarks = marks.filter(mark => mark.subcode !== "Result" && mark.subcode !== "Month & Year");
          
          return {
            ...item,
            marks: filteredMarks,
          };
        });

        setData(cleanedData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only on component mount

  // Handling loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Student Marks</h2>
      <table>
        <thead>
          <tr>
            <th>Pinnumber</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Subcode</th>
            <th>Marks</th>
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
                {item.marks.map((mark, markIndex) => (
                  <div key={markIndex}>
                    {/* Check if the mark contains HTML and render it safely */}
                    {mark.marks.some(m => m.includes('<center>')) ? (
                      <div dangerouslySetInnerHTML={{ __html: mark.marks.join(", ") }} />
                    ) : (
                      mark.marks.join(", ")
                    )}
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

export default MarksTable;
