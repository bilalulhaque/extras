import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreatePaymentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPayment = {
      title: formData.title,
      description: formData.description,
      dueDate: new Date(formData.dueDate).toISOString(),
    };

    const apiUrl = "http://localhost:3002/api/payment-details";

    const headers = {
      Authorization:
        `Bearer ${localStorage.getItem("token")}`,
      userid: localStorage.getItem("userId"),
    };

    axios
      .post(apiUrl, newPayment, { headers })
      .then((response) => {
        console.log("Payment created:", response.data);
        setFormData({
          title: "",
          description: "",
          dueDate: "",
        });
        navigate("/payments")
      })
      .catch((error) => {
        console.error("Error creating payment:", error);
      });
  };

  return (
    <div>
      <h2>Create Payment</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create Payment</button>
      </form>
    </div>
  );
};

export default CreatePaymentForm;
