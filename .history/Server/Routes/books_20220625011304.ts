// modules required for routing
import express from 'express';
import { Callback, CallbackError } from 'mongoose';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/books', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  }).sort({Title: 1});

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    
    res.render('books/details', {
      title: 'Details',
      page: 'details',
      books: ''
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let newBook = new book
    ({
        "Title": req.body.Title,
        "Price": req.body.Price,
        "Author": req.body.Author,
        "Genre": req.body.Genre
    });

    book.create(newBook, function(err: CallbackError)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }
      res.redirect('/books');
    })
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;

    book.findById(id, {}, {}, function (err, booksToEdit)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }
      res.render('books', {title: 'Edit', page: 'edit', books: booksToEdit})
    });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


//module.exports = router;
