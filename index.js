const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://gshiva0018:gshiva0018@cluster0.rnm60yk.mongodb.net/CredenceCURD?retryWrites=true&w=majority&appName=Cluster0")
  .then(res => console.log("db is Connect"))
  .catch(err => console.log(err));

app.post('/books', async (req, res) => {
  try {
    const newBook = new Book({
      name: req.body.name,
      image: req.body.image, // Expecting image URL
      summary: req.body.summary
    });
    const book = await newBook.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all books
app.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a book
app.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      book.name = req.body.name;
      book.image = req.body.image; // Expecting image URL
      book.summary = req.body.summary;
      const updatedBook = await book.save();
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Book deleted' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, (req, res) => console.log("server listening"));
