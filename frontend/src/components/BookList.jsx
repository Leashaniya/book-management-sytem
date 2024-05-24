import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../index.css'

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBooks= async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/book/"
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchBooks();
  }, []);

 

  const handleEdit = (title) => {
    navigate(`/book/update/${title}`);
  };

  const handleCreate = (title) => {
    navigate(`/book/add`);
  };

  const handleDelete = async (title) => {
    try {
      await axios.delete(`http://localhost:8000/book/delete/${title}`);
      setBooks(books.filter((book) => book.title !== title));
      console.log("book deleted successfully!");
      alert("book deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredBooks = books.filter((book) =>
    Object.values(book).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    
    <div className="subscription-list-container"><br/><center>
      <h2 className="subscription-list-header">MY BOOK COLLECTION</h2>
      <br/>
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <br/><br/>
      <button className="create-button" onClick={() => handleCreate()}>
        ADD A BOOK TO THE COLLECTION 
      </button>
      </center>
      <br/>
      <table className="subscription-table" id="subscription-table">
        <thead>
          <tr>
            <th>TITLE</th>
            <th>AUTHOR</th>
            <th>GENRE</th>
            <th>DESCRIPTION</th>   
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.description}</td>
              <td className="action-buttons">
                <br/>
                <button onClick={() => handleEdit(book.title)}>Edit</button><br/>
                <button onClick={() => handleDelete(book.title)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
