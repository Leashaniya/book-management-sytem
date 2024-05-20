const express = require("express");
const router = express.Router();

const {
  addBook,
  getAllBook,
  updateBook,
  deleteBook,
  getBookByTitle,
} = require("../controllers/Book.controller");

router.post("/add", addBook);
router.get("/", getAllBook);
router.put("/update/:title", updateBook);
router.delete("/delete/:title", deleteBook);
router.get("/get/:title", getBookByTitle);

module.exports = router;


