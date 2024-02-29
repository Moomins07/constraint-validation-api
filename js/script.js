const bookTitle = document.getElementById('title')
const bookAuthor = document.getElementById('author')
const addBookBtn = document.getElementById('add-book')
const bookTable = document.getElementById('book-table')
const mobileTable = document.getElementById('mobile')

const myLibrary = []

function Book(title, author) {
  this.title = title
  this.author = author
  this.id = Math.random().toString(16).slice(2, 9)
}

function addBookToLibrary(e) {
  e.preventDefault()

  if (bookTitle.value === '' || bookAuthor.value === '') {
    alert('Please fill in all fields!')
  } else {
    const book = new Book(bookTitle.value, bookAuthor.value)
    // book.read = false;
    myLibrary.push(book)
    loadBooks()
  }
}

// I need to compare element id to id in array
function removeBook(e) {
  const id = e.target.closest('tr, .mobile-div').getAttribute('data-id')
  console.log(id)
  findIndex(id)

  // Private function findIndex of id
  function findIndex(id) {
    if (confirm('Are you sure?')) {
      const index = myLibrary.findIndex((book) => id === book.id)
      if (index !== -1) {
        myLibrary.splice(index, 1)
      }
      loadBooks() // Reload books after removing item in array

    } else console.log('Did not remove book')
  }
}

Book.prototype.updateRead = function () {
  this.read = !this.read;
}

function loadBooks() {
  bookTable.innerHTML = ''; //Clears table before re-adding array of books to DOM (stops duplications)
  mobileTable.innerHTML = ''; //Clears table before re-adding array of books to DOM (stops duplications)
  myLibrary.forEach((book) => {
    displayNewBooks(book)
  })
}

function displayNewBooks(book) {
  // Desktop element
  const bookEl = document.createElement('tr');
  bookEl.classList.add('border-b');
  bookEl.setAttribute('data-id', book.id);
  bookEl.innerHTML = `
    
    <td class="py-6">${book.title}</td>
    <td>${book.author}</td>
    <td>
      <button
        class="uppercase tracking-wider text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border-black transform transition duration-250 ease-in-out hover:scale-105 read-btn" style="min-width: 60px";
      >
        read
      </button>
    </td>
    <td class="flex justify-end py-6">
      <button
        id="remove-book"
        class="uppercase tracking-wider text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border-black transform transition duration-250 ease-in-out delete"
      >
        Remove
      </button>
    </td>
  
  `;

  bookTable.appendChild(bookEl);

  // Mobile elements
  const bookElMobile = document.createElement('div');
  bookElMobile.classList.add(
    'border',
    'rounded',
    'p-4',
    'mb-2',
    'space-y-2',
    'flex',
    'flex-col',
    'sm:items-center',
    'text-left',
    'mt-6',
    'mobile-div'
  );
  bookElMobile.setAttribute('data-id', book.id);
  bookElMobile.innerHTML = `
    <div><span class="font-bold">Name: </span>${book.title}</div>
    <div><span class="font-bold">Author: </span>${book.author}</div>
    <div><span class="font-bold">Read: </span><button class='read-btn uppercase tracking-wider text-sm border px-3 py-0 rounded hover:bg-white hover:text-black hover:border-black transform transition duration-250 ease-in-out w-fit' style="min-width: 60px">yes</button></div>
    <button
      class="uppercase tracking-wider text-sm border px-4 py-2 rounded hover:bg-white hover:text-black hover:border-black transform transition duration-250 ease-in-out w-fit sm:px-12 delete"
    >
      Remove
    </button>
    `;

  mobileTable.appendChild(bookElMobile);
}

function checkIfReadOrRemove(e) {
  if (e.target.classList.contains('read-btn')) {
    const id = e.target.closest('[data-id]').getAttribute('data-id');
    const book = myLibrary.find(book => book.id === id);
    console.log(book)
    if (book) {
      book.updateRead();
      e.target.textContent = book.read ? 'no' : 'yes';
    }
  } else if (e.target.classList.contains('delete')) {
    // Logic for handling remove button click
    removeBook(e)
  }
}

function setEventListeners() {
  addBookBtn.addEventListener('click', addBookToLibrary)
  bookTable.addEventListener('click', checkIfReadOrRemove)
  mobileTable.addEventListener('click', checkIfReadOrRemove)
}

function defaultBooks() {
  const lotrBook = new Book('Lord of the Rings', 'Tolkien')
  const cyberpunkBook = new Book('Cyberpunk 2077', 'CD Project Red')
  myLibrary.push(lotrBook)
  myLibrary.push(cyberpunkBook)
}

function init() {
  // Default books that inherit prototype of book
  defaultBooks()
  loadBooks() // load books on content load
  setEventListeners()
}

document.addEventListener('DOMContentLoaded', init)