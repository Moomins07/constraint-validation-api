const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const addBookBtn = document.getElementById('add-book');
const bookTitle = document.getElementById('title');

// DARK / LIGHT MODE BUTTON
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

// Listen for toggle button click
themeToggleBtn.addEventListener('click', toggleMode);

function toggleMode() {
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
}

// BOOK LIBRARY LOGIC
let myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(`Adding ${book} to "myLibrary" array`);
}

addBookBtn.addEventListener('click', function (event) {
  event.preventDefault();
  bookTitleInput = bookTitle.value;
  addBookToLibrary(bookTitleInput);
  console.log(myLibrary);
});

const arr1 = [1, 2, 3, 4, 5];

const arr2 = [5, 6, 7, 8, 9, 10];

console.log(arr1, arr2);
arr2.shift();
const arr3 = [...arr1, ...arr2];

console.log(arr3);
