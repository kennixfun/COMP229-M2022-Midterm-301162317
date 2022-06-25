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
    });
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
        "Title": req.body.booksTitle,
        "Price": req.body.booksPrice,
        "Author": req.body.booksAuthor,
        "Genre": req.body.booksGenre
    });
    books_1.default.create(newBook, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/books');
    });
});
router.get('/:id', (req, res, next) => {
});
router.post('/:id', (req, res, next) => {
});
router.get('/delete/:id', (req, res, next) => {
});
//# sourceMappingURL=books.js.map