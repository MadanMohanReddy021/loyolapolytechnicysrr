import React, { useState } from 'react';
import './Addnotice.css'; 

const Addnotice = () => {
  const [notify, setNotify] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const newData = { notify };

    try {
     
      const response = await fetch('https://warp-dusty-jingle.glitch.me/api/insert-row', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error('Failed to insert row');
      }

      setSuccess(true);
      setNotify('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="addnotice-container">
      <h2>Insert a New Notification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Notification</label>
          <textarea
            type="textarea"
            rows="3"
             cols="70"
            value={notify}
            onChange={(e) => setNotify(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {success && <p className="success">Row inserted successfully!</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Addnotice;
