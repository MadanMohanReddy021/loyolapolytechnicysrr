import React, { useState, useEffect } from "react";
import axios from "axios";

const Result = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const hallTicketNumber = localStorage.getItem("hallticketnumber");
      if (!hallTicketNumber) {
        setError("Hall ticket number not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://backend-upqj.onrender.com/api/results/${hallTicketNumber}`
        );
        setResult(response.data);
      } catch (err) {
        setError("Failed to fetch result. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Exam Result</h2>
      {result ? (
        <div>
          <p><strong>Hall Ticket Number:</strong> {result.hallTicketNumber}</p>
          <p><strong>Branch:</strong> {result.branch}</p>
        </div>
      ) : (
        <p>No result found.</p>
      )}
    </div>
  );
};

export default Result;
