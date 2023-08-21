import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/signin`,
        formData
      );

      if (response.data.statusCode == 200) {
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.uid);
        navigate('payments');

      }
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div className="signin-form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Sign In</button>
        <Link to="/signup">SignUp</Link>
      </form>
    </div>
  );
};

export default SignIn;
