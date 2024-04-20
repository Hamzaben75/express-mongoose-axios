require("dotenv").config();
const express = require('express');
// Connect
require('../db/db');
const Book = require('./Book');
const app = express();
const port = 3000;
app.use(express.json());
app.post('/book', async (req, res) => {
  try {
    const newBook = new Book({...req.body});
    await newBook.save();
    res.send('New Book added successfully!');
  } catch (err) {
    res.status(500).send('Internal Server Error!');
  }
});

app.get('/books', (req, res) => {
    Book.find()
      .then((books) => {
        if (books.length === 0) {
          res.send(books);
        } else {
          res.status(404).send('Books not found');
        }
      })
      .catch((err) => {
        res.status(500).send('Internal Server Error!');
      });
  });

  app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id)
     .then((book) => {
        if (book) {
          res.json(book);
        } else {
          res.status(404).send('Book not found');
        }
      })
     .catch((err) => {
        res.status(500).send('Internal Server Error!');
      });
  });

  app.delete('/book/:id', (req, res) => {
    Book.findOneAndRemove(req.params.id)
      .then((book) => {
        if (book) {
          res.json({ message: 'Book deleted Successfully!' });
        } else {
          res.status(404).send({ message: "Book Not found!" });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Internal Server Error!' });
      });
  });
  
  app.listen(port, () => {
    console.log(`Up and Running on port ${port} - This is Book service*`);
  });