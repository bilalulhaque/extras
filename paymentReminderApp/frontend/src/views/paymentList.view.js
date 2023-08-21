import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      userid: localStorage.getItem("userId"),
    };

    axios
      .get(`http://localhost:3002/api/payment-details`, { headers })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSecondApiCall = (paymentId) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .patch(
        `http://localhost:3002/api/payment-details/${paymentId}`,
        {},
        { headers }
      )
      .then((response) => {
        console.log("Second API response:", response.data);
        alert("Paid successfully");
        navigate("/payments")
      })
      .catch((error) => {
        console.error("Error fetching data from second API:", error);
      });
  };

  const handleDeleteApiCall = (paymentId) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .patch(
        `http://localhost:3002/api/payment-details/${paymentId}`,
        {},
        { headers }
      )
      .then((response) => {
        console.log("Second API response:", response.data);
        alert("Deleted successfully");
        navigate("/payments")

      })
      .catch((error) => {
        console.error("Error fetching data from second API:", error);
      });
  };

  return (
    <div className="api-data">
      <Link style={{margin: '50px 25px'}} to="/create-payment">Add Payment</Link>
      <br />
      {data !== null ? (
        <div>
          {data.map((item) => (
            <div key={item.id} className="data-card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>
                Due Date:{" "}
                {new Date(item.dueDate._seconds * 1000).toLocaleDateString()}
              </p>
              <p>Paid: {item.paid ? "Yes" : "No"}</p>
              {item.paid == false ? (
                <button onClick={() => handleSecondApiCall(item.id)}>
                  Change Status
                </button>
              ) : (
                <span></span>
              )}
              <button onClick={() => handleDeleteApiCall(item.id)}>
                Delete
              </button>
              <Link to={`/update-payment/${item.id}`}>Update</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default PaymentDetails;
