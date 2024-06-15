import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../index.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
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

  const handleCreate = () => {
    navigate('/book/add');
  };

  const handleDelete = async (title) => {
    try {
      await axios.delete(`http://localhost:8000/book/delete/${title}`);
      setBooks(books.filter((book) => book.title !== title));
      console.log("Book deleted successfully!");
      alert("Book deleted successfully!");
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
    <div className="book-list-container">
      <center>
        <h2 className="book-list-header">MY BOOK COLLECTION</h2>
        <div>
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="create-button" onClick={handleCreate}>
            ADD A BOOK TO THE COLLECTION
          </button>
        </div>
      </center>
      <table className="book-table">
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
                <button onClick={() => handleEdit(book.title)}>Edit</button>
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
