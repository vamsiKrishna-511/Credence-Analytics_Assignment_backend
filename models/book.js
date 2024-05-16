// server.js

const mongoose = require('mongoose');

// Book Model
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // This will store the URL of the image
  summary: { type: String, required: true }
});

const Book = mongoose.model('Book', bookSchema);
 
module.exports=Book