import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import './login.css'

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:8000/user/login",
          formData
        );
        console.log(response.data);
        const { userId } = response.data;
        toast.success("Logged in successfully!");
        alert(" You have Logged in successfully!");
        navigate(`/user/get/${userId}`);
        localStorage.setItem('userId', userId);
  
      } catch (error) {
        console.error("Login error:", error.response.data.error);
        toast.error("Login error!");
  
      }
    };
  
    return (
      <div className="container">
        <h2>CustomerLogin</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="inputClass"
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="inputClass"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <p>
          Don't have an account? <Link to="/user/signup">Signup</Link>
        </p>
        </form>
        <ToastContainer />
  
      </div>
      
    );
  };
  

export default Login
