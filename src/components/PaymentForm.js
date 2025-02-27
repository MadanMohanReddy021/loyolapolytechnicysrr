import React, { useState, useEffect } from 'react';

const PaymentForm = () => {
  // State for form inputs
  const [hallTicket, setHallTicket] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Retrieve hallTicket from localStorage on component mount
  useEffect(() => {
    const storedHallTicket = localStorage.getItem('hallTicket');
    if (storedHallTicket) {
      setHallTicket(storedHallTicket);
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!hallTicket || !transactionId) {
      setError('Hall Ticket and Transaction ID are required.');
      return;
    }
    setError(null);
    setLoading(true);

    // Prepare the payment data
    const paymentData = {
      hallTicket,
      transactionId,
    };

    try {
      // Send the payment data to the backend API
      const response = await fetch('https://backend-upqj.onrender.com/api/submit-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment submission failed.');
      }

      // Handle success response from the backend
      const responseData = await response.json();
      setPaymentStatus('success'); // Update payment status
      alert("payment has been submitted")
      console.log('Payment submission successful:', responseData);
      setHallTicket('');
      setTransactionId('');
    } catch (err) {
        setError(err.message); // Set the error message for display
        console.error('Payment submission failed:', err);
      setPaymentStatus('failure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Application Fee Payment</h2>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {paymentStatus === 'success' && (
                <div className="alert alert-success">
                  Payment submitted successfully!
                </div>
              )}
              {paymentStatus === 'failure' && (
                <div className="alert alert-danger">
                  Payment submission failed. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="hallTicket" className="form-label">
                    Hall Ticket Number:
                  </label>
                  <input
                    type="text"
                    id="hallTicket"
                    name="hallTicket"
                    value={hallTicket}
                    onChange={(e) => setHallTicket(e.target.value)}
                    className="form-control"
                    placeholder="Enter Hall Ticket Number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="transactionId" className="form-label">
                    Transaction ID:
                  </label>
                  <input
                    type="text"
                    id="transactionId"
                    name="transactionId"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="form-control"
                    placeholder="Enter Transaction ID"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Payment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
