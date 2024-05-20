import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas'
import '../index.css'

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
//   const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const fetchBooks= async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/book/"
        );
        setBooks(response.data);
        // calculateTotalDuration(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchBooks();
  }, []);

//   const calculateTotalDuration = (subscriptions) => {
//     const total = subscriptions.reduce((acc, curr) => acc + parseInt(curr.duration), 0);
//     setTotalDuration(total);
//   };

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
    //   calculateTotalDuration(books.filter((book) => subscription.title !== title));
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

//   const generateCSVReport = () => {
//     const csvData = "Package ID, Package Name, Duration, Description, Category, Start Date, End Date\n";
//     const rows = subscriptions.map((subscription) => (
//       `${subscription.Id},${subscription.packageName},${subscription.duration},${subscription.description},${subscription.category},${subscription.startDate},${subscription.endDate}\n`
//     ));
//     const csvContent = csvData + rows.join("");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedUri);
//     link.setAttribute("download", "subscription_report.csv");
//     document.body.appendChild(link);
//     link.click();
//   };
//   const generatePDFReport = () => {
//     const input = document.getElementById("subscription-table");
//     html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");

//         // Calculate the scale factor to fit the content inside the PDF
//         const scaleFactor = 0.5; // Adjust this value as needed
//         const width = canvas.width * scaleFactor;
//         const height = canvas.height * scaleFactor;

//         const pdf = new jsPDF("p", "mm", "a1");
//         pdf.addImage(imgData, "PNG", 0, 0, width, height);
//         pdf.save("subscription_report.pdf");
//       });
//   };

  return (
    <div className="subscription-list-container">
      <h2 className="subscription-list-header">Book List</h2>
      {/* <p>Total Duration: {totalDuration}</p> */}
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="create-button" onClick={() => handleCreate()}>
        add 
      </button>
      <table className="subscription-table" id="subscription-table">
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>genre</th>
            <th>description</th>   
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
                <button onClick={() => handleEdit(book.title)}>Edit</button>{" "}
                <button onClick={() => handleDelete(book.title)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="report-buttons">
        <button onClick={generateCSVReport}>Download CSV Report</button>
        <button onClick={generatePDFReport}>Download PDF Report</button>
      </div> */}
    </div>
  );
}

export default BookList;
