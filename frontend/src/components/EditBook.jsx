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
      <h2><center>Edit Book details</center></h2>
      <br/>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>TITLE:</td>
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
              <td>AUTHOR:</td>
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
              <td>GENRE:</td>
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
              <td>DESCRIPTION:</td>
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
        <br/><center>
        <button type="submit">Update</button></center>
      </form>
    </div>
  </div>
  );
}

export default EditBook;
