import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <center>
      <div style={{ backgroundColor: "rgba(128, 128, 128, 0.5)", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
        <h2>Add Book to the Collection</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", maxWidth: "500px" }}>
          <div>
            <label>
              Book Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "5px" }}
              />
            </label>
          </div>
          <div>
            <label>
              Author:
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "5px" }}
              />
            </label>
          </div>
          <div>
            <label>
              Genre:
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "5px" }}
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "5px" }}
              ></textarea>
            </label>
          </div>
          <div>
            <button type="submit" style={{ padding: "10px 20px", background: "#005f75", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>Add</button>
          </div>
        </form>
      </div>
    </center>
  </div>  
      
  );
}

export default BookAdd;
