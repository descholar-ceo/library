/**
 * 1. We need to add localstorage
 * 2. Return a prper error message
 * 3. Implement the delete button
 */
const newBookForm = document.querySelector('#new-book-form');
const newBookBtn = document.querySelector('#new-book-btn');
const saveBookBtn = document.querySelector('#save-book-btn');
const titleField = document.querySelector('#book-title');
const pagesField = document.querySelector('#book-pages');
const authorField = document.querySelector('#book-author');
const booksListing = document.querySelector('#books-listing');

const myLibrary = [];

function Book(title, pages, author, read) {
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.title = title;
}

function addBookToLibrary(myBook) {
  myLibrary.push(myBook);
}

function removeBookFromLibrary(index, callback) {
  myLibrary.splice(index, 1);
  callback();
}

function updateBookReadStatus(book, callback) {
  if (book.read === 'read') {
    book.read = 'unread';
  } else {
    book.read = 'read';
  }

  callback();
}

function displayBooks() {
  const myLibrarySize = myLibrary.length;
  if (myLibrarySize !== 0) {
    booksListing.innerHTML = '';
    for (let i = 0; i < myLibrarySize; i += 1) {
      const individualBookContainer = document.createElement('div');
      const titleSpan = document.createElement('span');
      const pagesSpan = document.createElement('span');
      const authorSpan = document.createElement('span');
      const readStatusBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');

      individualBookContainer.setAttribute('class', 'individual-book-container');

      titleSpan.textContent = myLibrary[i].title;
      individualBookContainer.appendChild(titleSpan);

      pagesSpan.textContent = myLibrary[i].pages;
      individualBookContainer.appendChild(pagesSpan);

      authorSpan.textContent = myLibrary[i].author;
      individualBookContainer.appendChild(authorSpan);

      readStatusBtn.textContent = myLibrary[i].read;
      readStatusBtn.addEventListener('click', () => {
        updateBookReadStatus(myLibrary[i], displayBooks);
      });
      individualBookContainer.appendChild(readStatusBtn);

      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        removeBookFromLibrary(i, displayBooks);
      });
      individualBookContainer.appendChild(deleteBtn);

      booksListing.appendChild(individualBookContainer);
    }
  } else {
    booksListing.innerHTML = 'No books yet';
  }
}

function startApplication() {
  newBookBtn.addEventListener('click', () => {
    newBookForm.classList.remove('hidden');
    newBookBtn.classList.add('hidden');
  });

  saveBookBtn.addEventListener('click', () => {
    const title = titleField.value;
    const pages = pagesField.value;
    const author = authorField.value;
    const readStatus = document.querySelector('input[name=read-status]:checked').value;

    const myBook = new Book(title, pages, author, readStatus);

    addBookToLibrary(myBook);

    newBookForm.reset();

    displayBooks();
  });
}

displayBooks();
startApplication();