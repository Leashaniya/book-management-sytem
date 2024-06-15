import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditBook() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/book/get/${title}`
        );
        const bookData = response.data;
        setFormData(bookData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchBook();
  }, [title]);

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
      await axios.put(
        `http://localhost:8000/book/update/${title}`,
        formData
      );
      console.log("book details updated successfully!");
      alert("book details updated successfully!");
      navigate("/book/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <center>
        <div style={{ backgroundColor: "rgba(128, 128, 128, 0.5)", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
          <h2>Edit Book Details</h2>
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
              <button type="submit" style={{ padding: "10px 20px", background: "#005f75", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>Update</button>
            </div>
          </form>
        </div>
      </center>
    </div>
  );
}

export default EditBook;
