const newBookForm = document.querySelector('#new-book-form');
const newBookBtn = document.querySelector('#new-book-btn');
const saveBookBtn = document.querySelector('#save-book-btn');
const titleField = document.querySelector('#book-title');
const pagesField = document.querySelector('#book-pages');
const authorField = document.querySelector('#book-author');
const booksListing = document.querySelector('#books-listing');

const myLibrary = localStorage.getItem('myLibrary') ? JSON.parse(localStorage.getItem('myLibrary')) : [];

function Book(title, pages, author, read) {
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.title = title;
}

const updateLocalStorage = () => {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

const addBookToLibrary = (myBook) => {
  myLibrary.push(myBook);
  updateLocalStorage();
};

const removeBookFromLibrary = (index, callback) => {
  myLibrary.splice(index, 1);
  updateLocalStorage();
  callback();
};

const updateBookReadStatus = (book, callback) => {
  if (book.read === 'read') {
    book.read = 'unread';
  } else {
    book.read = 'read';
  }
  updateLocalStorage();
  callback();
};

const addBookToDiv = (index) => {
  const individualBookContainer = document.createElement('div');
  const titleSpan = document.createElement('span');
  const pagesSpan = document.createElement('span');
  const authorSpan = document.createElement('span');
  const readStatusBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  individualBookContainer.setAttribute('class', 'individual-book-container');

  titleSpan.textContent = myLibrary[index].title;
  individualBookContainer.appendChild(titleSpan);

  pagesSpan.textContent = myLibrary[index].pages;
  individualBookContainer.appendChild(pagesSpan);

  authorSpan.textContent = myLibrary[index].author;
  individualBookContainer.appendChild(authorSpan);

  readStatusBtn.textContent = myLibrary[index].read;
  readStatusBtn.setAttribute('class', 'btn-status');
  readStatusBtn.addEventListener('click', () => {
    updateBookReadStatus(myLibrary[index], displayBooks);
  });
  individualBookContainer.appendChild(readStatusBtn);

  deleteBtn.textContent = 'Delete';
  deleteBtn.setAttribute('class', 'btn-danger');
  deleteBtn.addEventListener('click', () => {
    removeBookFromLibrary(index, displayBooks);
  });
  individualBookContainer.appendChild(deleteBtn);

  booksListing.appendChild(individualBookContainer);
};

const emptyingDiv = divToEmpty => { divToEmpty.innerHTML = ''; };
const setDefaultTextToDiv = (divToSetDefault, defaultToSet) => {
  divToSetDefault.innerHTML = defaultToSet;
};

const isNoErrors = () => {
  let isError = false;

  const fields = [titleField, pagesField, authorField];
  const invalidFields = [];
  if (!titleField.value) {
    invalidFields.push(titleField);
    isError = true;
  }
  if (!pagesField.value) {
    invalidFields.push(pagesField);
    isError = true;
  }
  if (!authorField.value) {
    invalidFields.push(authorField);
    isError = true;
  }

  for (let i = 0; i < fields.length; i += 1) {
    if (!invalidFields.includes(fields[i])) {
      fields[i].classList.remove('error-field');
    } else {
      invalidFields[i].classList.add('error-field');
    }
  }
  return isError;
};

const displayBooks = () => {
  const myLibrarySize = myLibrary.length;
  if (myLibrarySize !== 0) {
    emptyingDiv(booksListing);
    for (let index = myLibrarySize - 1; index >= 0; index -= 1) {
      addBookToDiv(index);
    }
  } else {
    setDefaultTextToDiv(booksListing, 'No books yet!');
  }
};

const startApplication = () => {
  newBookBtn.addEventListener('click', () => {
    newBookForm.classList.remove('hidden');
    newBookBtn.classList.add('hidden');
  });

  saveBookBtn.addEventListener('click', () => {
    const title = titleField.value;
    const pages = pagesField.value;
    const author = authorField.value;
    const readStatus = document.querySelector('input[name=read-status]:checked').value;

    if (!isNoErrors()) {
      const myBook = new Book(title, pages, author, readStatus);
      addBookToLibrary(myBook);
      newBookForm.reset();
      displayBooks();
    }
  });
};

displayBooks();
startApplication();
