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

  // Added this function to App class so items in array are displayed on load
  loadItems() {
    this._myLibrary.forEach((book) => this._displayNewBook(book));
  }

  // Private methods

  // Function to display the newly added book in the DOM
  _displayNewBook(book) {
    const booksEl = document.getElementById('book-table');

    const bookEl = document.createElement('tr');
    bookEl.classList.add('border-b');
    bookEl.setAttribute('data-id', book.id);
    bookEl.innerHTML = `
    <tr class="border-b">
    <td class="py-6">${book.name}</td>
    <td>${book.author}</td>
    <td>
      <button
        class="uppercase tracking-wider text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border-black transform transition duration-250 ease-in-out hover:scale-105"
      >
        Yes
      </button>
    </td>
    <td class="flex justify-end py-6">
      <button
        class="uppercase tracking-wider text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border-black transform transition duration-250 ease-in-out"
      >
        Remove
      </button>
    </td>
  </tr>
  `;

    booksEl.appendChild(bookEl);
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

// addBookBtn.addEventListener('click', function (event) {
//   event.preventDefault();
//   bookTitleInput = bookTitle.value;
//   addBookToLibrary(bookTitleInput);
//   console.log(myLibrary);
// });

const app = new App();
