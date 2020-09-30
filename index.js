/**
 * 1. We need to add localstorage
 * 2. Return a prper error message
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

      const titleText = document.createTextNode(myLibrary[i].title);
      titleSpan.appendChild(titleText);
      individualBookContainer.appendChild(titleSpan);

      const pagesText = document.createTextNode(myLibrary[i].pages);
      pagesSpan.appendChild(pagesText);
      individualBookContainer.appendChild(pagesText);

      const authorText = document.createTextNode(myLibrary[i].title);
      authorSpan.appendChild(authorText);
      individualBookContainer.appendChild(authorText);

      const readText = document.createTextNode(myLibrary[i].read);
      readStatusBtn.appendChild(readText);
      individualBookContainer.appendChild(readText);

      const deleteText = document.createTextNode('Delete');
      deleteBtn.appendChild(deleteText);
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
