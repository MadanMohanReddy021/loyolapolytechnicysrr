import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const FetchMarks = () => {
  // State variables to store input data
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
  const [sem, setsem] = useState("");
   const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    if (name === "start") {
      setstart(value);
    } else if (name === "end") {
      setend(value);
    }else if (name === "sem") {
        setsem(value);
      }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log('hi');
    e.preventDefault();

    // Create the payload to send to the API
    const data = {
      start,
      end,
      sem,
    };

    try {
      
      const response = await fetch("https://warp-dusty-jingle.glitch.me/api/marks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setLoading(true);
      // Handle the response
      if (response.ok) {
        console.log("Data submitted successfully!");
        // Optionally, clear the form inputs
        setstart("");
        setend("");
      } else {
        console.error("Error submitting data", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Fetching........</div>;
  }
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Form Example</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="form-group">
          <label htmlFor="start">Start:</label>
          <input
            type="text"
            id="start"
            name="start"
            value={start}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="end">End:</label>
          <input
            type="text"
            id="end"
            name="end"
            value={end}
            onChange={handleInputChange}
            className="form-control"
            required
          /><label htmlFor="sem">Sem:</label>
          <select
  id="sem"
  name="sem"
  value={sem}
  onChange={handleInputChange}
  className="form-control"
  required
>
  <option value="">Select Semester</option>
  <option value="1YEAR">1st Semester</option>
  <option value="2SEM">2nd Semester</option>
  <option value="3SEM">3rd Semester</option>
  <option value="4SEM">4th Semester</option>
  <option value="5SEM">5th Semester</option>
  <option value="6SEM">6th Semester</option>
  <option value="7SEM">7th Semester</option>
  <option value="8SEM">8th Semester</option>
</select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FetchMarks;
