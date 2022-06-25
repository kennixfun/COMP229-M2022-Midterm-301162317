"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const books_1 = __importDefault(require("../Models/books"));
router.get('/books', (req, res, next) => {
    books_1.default.find((err, books) => {
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
    }).sort({ Title: 1 });
});
router.get('/add', (req, res, next) => {
    res.render('books/details', {
        title: 'Details',
        page: 'details',
        books: ''
    });
});
router.post('/add', (req, res, next) => {
    let newBook = new books_1.default({
        "Title": req.body.Title,
        "Price": req.body.Price,
        "Author": req.body.Author,
        "Genre": req.body.Genre
    });
    books_1.default.create(newBook, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/books');
    });
});
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    books_1.default.findById(id, {}, {}, function (err, booksToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('books/details', { title: 'Edit', page: 'edit', books: booksToEdit });
    });
});
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    let updateBooks = new books_1.default({
        "_id": id,
        "Title": req.body.Title,
        "Price": req.body.Price,
        "Author": req.body.Author,
        "Genre": req.body.Genre
    });
    books_1.default.updateOne({ _id: id }, updateBooks, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/books');
    });
});
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    books_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/books');
    });
});
//# sourceMappingURL=books.js.map