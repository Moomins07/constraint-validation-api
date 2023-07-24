// Library class to contain information and public methods that will interact with private properties

class Library {
  constructor() {
    this._myLibrary = [];
  }

  // Public methods
  addBook(book) {
    this._myLibrary.push(book);
    this._displayNewBook(book);
    console.log(`Adding ${book} to "myLibrary" array`);
  }

  removeBook(id) {
    const index = this._myLibrary.findIndex((book) => book.id === id);
    if (index !== -1) {
      this._myLibrary.splice(index, 1);
    }
  }

  // Added this function to App class so items in array are displayed on load
  loadItems() {
    this._myLibrary.forEach((book) => this._displayNewBook(book));
  }

  // Private methods

  // Function to display the newly added book in the DOM
  _displayNewBook(book) {
    // Desktop element
    const booksEl = document.getElementById('book-table');

    const bookEl = document.createElement('tr');
    bookEl.classList.add('border-b');
    bookEl.setAttribute('data-id', book.id);
    bookEl.innerHTML = `
    
    <td class="py-6">${book.name}</td>
    <td>${book.author}</td>
    <td>
      <button
        class="uppercase tracking-wider text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border-black transform transition duration-250 ease-in-out hover:scale-105 read-btn"
      >
        yes
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

    booksEl.appendChild(bookEl);

    // Mobile elements

    const booksElMobile = document.getElementById('mobile');

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
    <div><span class="font-bold">Name: </span>${book.name}</div>
    <div><span class="font-bold">Author: </span>${book.author}</div>
    <div><span class="font-bold">Read: </span><button class='read-btn uppercase tracking-wider text-sm border px-3 py-0 rounded hover:bg-white hover:text-black hover:border-black transform transition duration-250 ease-in-out w-fit sm:px-12'>yes</button></div>
    <button
      class="uppercase tracking-wider text-sm border px-4 py-2 rounded hover:bg-white hover:text-black hover:border-black transform transition duration-250 ease-in-out w-fit sm:px-12 delete"
    >
      Remove
    </button>
    `;

    booksElMobile.appendChild(bookElMobile);
  }
}

class Book {
  constructor(name, author) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.author = author;
  }
}

// App class that will essentially be the 'whole' app - This will be instantiated at bottom of code
class App {
  constructor() {
    this._bookLibrary = new Library();
    this._bookLibrary.loadItems();
    this._loadEventListeners();
    this._setDarkMode();
  }

  _loadEventListeners() {
    document
      .getElementById('theme-toggle')
      .addEventListener('click', this._toggleMode.bind(this));
    document
      .getElementById('link-form')
      .addEventListener('submit', this._newBook.bind(this));

    document
      .getElementById('add-book')
      .addEventListener('submit', this._newBook.bind(this));
    document
      .getElementById('book-table')
      .addEventListener('click', this._removeBook.bind(this));
    document
      .getElementById('mobile')
      .addEventListener('click', this._removeBook.bind(this));

    document
      .getElementById('mobile')
      .addEventListener('click', this._checkIfRead.bind(this));
    document
      .getElementById('book-table')
      .addEventListener('click', this._checkIfRead.bind(this));
  }

  _removeBook(e) {
    if (e.target.classList.contains('delete')) {
      {
        if (confirm('Are you sure?')) {
          const id = e.target
            .closest('.border-b, .mobile-div')
            .getAttribute('data-id');
          this._bookLibrary.removeBook(id);
          const elementsToRemove = document.querySelectorAll(
            `[data-id="${id}"]`
          );
          elementsToRemove.forEach((el) => el.remove());
        }
      }
    }
  }

  _newBook(e) {
    e.preventDefault();
    const bookTitle = document.getElementById('title');
    const authorName = document.getElementById('author');

    if (bookTitle.value === '' || authorName.value === '') {
      alert('Please fill in all fields');
      return;
    }

    const book = new Book(bookTitle.value, authorName.value);
    this._bookLibrary.addBook(book);

    bookTitle.value = '';
    authorName.value = '';
    console.log(this._bookLibrary._myLibrary);
  }

  _checkIfRead(e) {
    if (e.target.classList.contains('read-btn')) {
      console.log('clicked');
      if (e.target.textContent.trim() == 'yes') {
        e.target.textContent = 'no';
      } else {
        e.target.textContent = 'yes';
      }
    }
  }

  _toggleMode() {
    const themeToggleDarkIcon = document.getElementById(
      'theme-toggle-dark-icon'
    );
    const themeToggleLightIcon = document.getElementById(
      'theme-toggle-light-icon'
    );
    // Toggle icon
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // If is set in localstorage
    if (localStorage.getItem('color-theme')) {
      // If light, make dark and save in localstorage
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    } else {
      // If not in localstorage
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
    // DARK / LIGHT MODE BUTTON
  }

  _setDarkMode() {
    const themeToggleLightIcon = document.getElementById(
      'theme-toggle-light-icon'
    );
    const themeToggleDarkIcon = document.getElementById(
      'theme-toggle-dark-icon'
    );
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      // Show light icon
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      themeToggleDarkIcon.classList.remove('hidden');
    }
  }
}

const app = new App();
