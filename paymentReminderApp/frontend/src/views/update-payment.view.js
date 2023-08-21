import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdatePaymentForm = () => {
  const navigate = useNavigate();

  const {paymentId} = useParams();

  const [paymentData, setPaymentData] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  useEffect(() => {
    const apiUrl = `http://localhost:3002/api/payment-details/${paymentId}`;

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'userid': localStorage.getItem("userId")
    };

    // Fetch data from API
    axios.get(apiUrl, { headers })
      .then((response) => {
        setPaymentData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedPayment = {
      title: formData.title,
      description: formData.description,
      dueDate: new Date(formData.dueDate).toISOString()
    };

    const updateUrl = `http://localhost:3002/api/payment-details/${paymentId}`;

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    };

    // Make PUT request to update API
    axios.put(updateUrl, updatedPayment, { headers })
      .then((response) => {
        console.log('Payment updated:', response.data);
        setFormData({
          title: '',
          description: '',
          dueDate: ''
        });
        navigate("/payments")
      })
      .catch((error) => {
        console.error('Error updating payment:', error);
      });
  };

  return (
    <div>
      <h2>Update Payment</h2>
      {paymentData ? (
        <form onSubmit={handleUpdate}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Update Payment</button>
        </form>
      ) : (
        <p>Loading payment data...</p>
      )}
    </div>
  );
};

export default UpdatePaymentForm;
