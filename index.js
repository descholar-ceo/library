// STORAGE
//     *
//     DISPLAY THEM *
//     ELSE *
//     INITIALIZE AN EMPTY ARRAY *
//     *
//     *
//     2. FUNCTION ADD BOOKS *
//     *
//     *
//     4. UPDATE READ STATUS *
//     *
//     3. DELETE BOOKS *
//     *
//     *
//     /
const BOOK_AUTHOR = document.getElementById("book-author");
const BOOK_TITLE = document.getElementById("book-title");
const BOOK_PAGES = document.getElementById("book-pages");
const NEW_BOOK_FORM = document.getElementById("new-book-form");
const LIBRARY = [];

NEW_BOOK_FORM.addEventListener("submit", function(evt) {
    evt.preventDefault();
    addBookToLibrary();
});

class Book {
    constructor(author, title, noOfPages) {
        this._author = author;
        this._title = title;
        this._pages = noOfPages;
    }

    get writer() {
        return this._author;
    }


    set writer(updatedAuthor) {
        this._author = updatedAuthor;
    }


    set name(updatedName) {
        this._title = updatedName;
    }

    get name() {
        return this._title;
    }

    set noOfPages(updatedNoOfPages) {
        this._pages = updatedNoOfPages;
    }

    get noOfPages() {
        return this._pages;
    }

    get info() {
        return `${this.name} by ${this.writer}, ${this.noOfPages} pages, not read yet`
    }

}

function addBookToLibrary() {
    let newBook = new Book(BOOK_AUTHOR, BOOK_TITLE, BOOK_PAGES);
    LIBRARY.push(newBook);

}