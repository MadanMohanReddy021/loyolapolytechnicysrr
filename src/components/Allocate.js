import React, { useState } from "react";

const Allocate = () => {
  const [message, setMessage] = useState("");

  const handleAllocate = async () => {
    try {
      const response = await fetch("http://backend-upqj.onrender.com/api/allocate");
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error occurred while allocating");
    }
  };

  return (
    <div>
      <button onClick={handleAllocate}>Allocate Results</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Allocate;
