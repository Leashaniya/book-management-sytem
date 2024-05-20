const Book = require("../models/Book.model");
const bcrypt=require("bcrypt");
const expressAsyncHandler=require("express-async-handler");
const validator = require("validator");
require("dotenv").config();

const addBook = expressAsyncHandler(async (req, res) => {
  const { title,author,genre,description } = req.body;

  //Validation
  if (!title || !author || !genre || !description ) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  try {
    const newBook= new Book({
        title,
        author,
        genre,
      description,
    });
    await newBook.save();

    if (newBook) {
      res.status(201).json({
        title: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        description: newBook.description,
        message: "book added successfully",
      });
    } else {
      res.status(400);
      throw new error("Invalid book data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create book" });
  }

});


const getAllBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};



const updateBook = async (req, res) => {
    const booktitle = req.params.title;
  const {title,author,genre,description } = req.body;

  try {
    // Check if all required fields are present
    if (!title || !author || !genre || !description ) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    const book = await Book.findOne({ title: booktitle });

    
    if (!book) {
      return res.status(404).json({ error: "book not found" });
    }

   
    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (description) book.description = description;

    
    await book.save();

    res.status(200).json({
        title: book.title,
        author: book.author,
        genre: book.genre,
        description: book.description,
      message: "book details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update book details" });
}
};


const deleteBook= async (req, res) => {
    const booktitle = req.params.title;
  try {
  
    const deletedBook = await Book.findOneAndDelete({  title: booktitle });

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Book" });
  }
};


const getBookByTitle = async (req, res) => {
  const booktitle = req.params.title; 

  try {
    const book = await Book.findOne({ title: booktitle})
    if (!book) {
      return res.status(404).json({ error: "book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch book" });
  }
};



module.exports = {
  addBook,
  getAllBook,
  updateBook,
  deleteBook,
  getBookByTitle
};
