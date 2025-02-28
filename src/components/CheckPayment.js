import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const CheckPayment = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch("https://backend-upqj.onrender.com/api/payments");
      const data = await response.json();
      setPayments(data); //  
   // Log  data
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };
  
  const handleDelete = async (hallTicket) => {
    try {
      await fetch(`https://backend-upqj.onrender.com/api/payments/${hallTicket}`, {
        method: "DELETE",
      });
      setPayments(payments.filter((payment) => payment.hallticket !== hallTicket));
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const handleAccept = async (hallTicket) => {
    try {
      await fetch("https://backend-upqj.onrender.com/api/confirmPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hallTicket }),
      });
      setPayments(payments.filter((payment) => payment.hallticket !== hallTicket));
    } catch (error) {
      console.error("Error accepting payment:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center mb-0">Payment Records</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>Hall Ticket</th>
                  <th>Transaction ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment.hallticket}>
                      <td>{payment.hallticket}</td>
                      <td>{payment.transactionid}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleAccept(payment.hallticket)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(payment.hallticket)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-muted">
                      No payment records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckPayment;
