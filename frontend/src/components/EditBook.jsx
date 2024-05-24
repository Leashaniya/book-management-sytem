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
    const fetchBook= async () => {
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div>
      <h2>Edit Book details</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>title:</td>
              <td>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  style={{ width: "300px" }} // Adjust the width as needed
                  required
                />
              </td>
            </tr>
            <tr>
              <td>author:</td>
              <td>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  style={{ width: "300px" }} // Adjust the width as needed
                  required
                />
              </td>
            </tr>
            <tr>
              <td>genre:</td>
              <td>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  style={{ width: "300px" }} // Adjust the width as needed
                  required
                />
              </td>
            </tr>
            <tr>
              <td>description:</td>
              <td>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ width: "300px" }} // Adjust the width as needed
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Update</button>
      </form>
    </div>
  </div>
  

  );
}

export default EditBook;
