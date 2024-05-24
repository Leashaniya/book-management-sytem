import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./BookAdd.css";

const initialState = {
  title: "", 
  author: "", 
  genre: "", 
  description: "", 
};

function BookAdd() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/book/add",
        formData
      );
      console.log(response.data);
      toast.success("book added successfully!"); // Display success toast message
      alert("book added successfully!");
      setFormData(initialState); // Reset form fields using initialState
      navigate("/book/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to add book"); // Display error toast message
    }
  };

  return (
    <div className="main-form">
      <center>
      <h2>Add Book to the Collection</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form1">
      <div className="devb">
      <label>
        Book Title: 
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        </div>
        <div className="devb">
        <label>
        author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </label>
        </div>
        <div className="devb">
        <label>
        genre:
        <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </label></div>
        <div className="devb">
          <label>Description:
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        </div>

        
      
        <div><button type="submit">Add</button></div>
        </div>
        </form>
        </center>
        </div>
      
      
  );
}

export default BookAdd;
