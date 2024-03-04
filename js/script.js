// Library class to handle library data and private 'state'
class Library {
  constructor() {
    this.myLibrary = []
  }

  getLibrary() {
    return this.myLibrary
  }

  addBook(book) {
    this.getLibrary().push(book)
  }

  removeBook(e) {
    const id = e.target.closest('tr, .mobile-div').getAttribute('data-id')
    this._findIndex(id)

    // Private function findIndex of id
  }


  loadBooks() {
    document.getElementById('book-table').innerHTML = ''
    document.getElementById('mobile').innerHTML = ''
    // this.bookTable.innerHTML = ''; //Clears table before re-adding array of books to DOM (stops duplications)
    // this.mobileTable.innerHTML = ''; //Clears table before re-adding array of books to DOM (stops duplications)
    this.getLibrary().forEach((book) => {
      this._displayNewBooks(book)
    })
  }

  _findIndex(id) {
    if (confirm('Are you sure?')) {
      const index = this.getLibrary().findIndex((book) => id === book.id)
      console.log(index)
      if (index !== -1) {
        this.getLibrary().splice(index, 1)
      }
      this.loadBooks() // Reload books after removing item in array
    } else console.log('Did not remove book')
  }

  _displayNewBooks(book) {
    // Desktop element
    const bookEl = document.createElement('tr');
    const bookTable = document.getElementById('book-table')
    bookEl.classList.add('border-b');
    bookEl.setAttribute('data-id', book.id);
    bookEl.innerHTML = `
    
    <td class="py-6">${book.title}</td>
    <td>${book.author}</td>
    <td>
      <button
        class="uppercase tracking-wider text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border-black transform transition duration-250 ease-in-out hover:scale-105 read-btn" style="min-width: 95px";
      >
        read?
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
    const mobileTable = document.getElementById('mobile')
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

}

// Book class to handle book creations
class Book {
  constructor(title, author) {
    this.title = title
    this.author = author
    this.id = Math.random().toString(16).slice(2, 9)
  }

  updateRead() {
    this.read = !this.read;
  }
}

// App class to handle user interactions and event listeners. Will call upon private data in Library class
class App {
  constructor() {
    document.addEventListener('DOMContentLoaded', this.init.bind(this))
  }

  _defaultBooks() {
    const lotrBook = new Book('Lord of the Rings', 'Tolkien')
    const cyberpunkBook = new Book('Cyberpunk 2077', 'CD Project Red')
    this._library.addBook(lotrBook)
    this._library.addBook(cyberpunkBook)
  }

  _checkIfReadOrRemove(e) {
    if (e.target.classList.contains('read-btn')) {
      const id = e.target.closest('[data-id]').getAttribute('data-id');
      const book = this._library.getLibrary().find(book => book.id === id);

      if (book) {
        book.updateRead();
        e.target.textContent = book.read ? 'unread' : 'read';
      }
    } else if (e.target.classList.contains('delete')) {
      // Logic for handling remove button click
      this._library.removeBook(e)
    }
  }

  _addBookToLibrary(e) {
    const bookTitle = document.getElementById('title')
    const bookAuthor = document.getElementById('author')
    e.preventDefault()

    if (bookTitle.value === '' || bookAuthor.value === '') {
      alert('Please fill in all fields!')
    } else {
      const book = new Book(bookTitle.value, bookAuthor.value)
      // book.read = false;
      this._library.addBook(book)
      bookTitle.value = '';
      bookAuthor.value = '';
      this._library.loadBooks()
    }
  }


  _setEventListeners() {
    document.getElementById('add-book').addEventListener('click', this._addBookToLibrary.bind(this))
    document.getElementById('book-table').addEventListener('click', this._checkIfReadOrRemove.bind(this))
    document.getElementById('mobile').addEventListener('click', this._checkIfReadOrRemove.bind(this))
  }



  init() {
    this._library = new Library()
    this._defaultBooks()
    this._library.loadBooks() // load books on content load
    this._setEventListeners()

  }

}


const app = new App()



// I need to compare element id to id in array






