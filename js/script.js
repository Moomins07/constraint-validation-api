//create nodelist for all inputs

//create a function that will pass in a list item and check for all validations that I want to use

//loop through nodelist and apply validation function to each nodelist item


const formInputs = document.querySelectorAll('input');
const submitBtn = document.getElementById('add-book')

function getErrorMessage(field) {
    if (field.validity.valueMissing) {
        return "This field is required.";
    }
    if (field.validity.typeMismatch) {
        return "Please enter a valid " + field.type + ".";
    }
    if (field.validity.tooShort) {
        return `Must be at least ${field.minLength} characters.`;
    }
    if (field.validity.tooLong) {
        return `Must be no more than ${field.maxLength} characters.`;
    }
    if (field.validity.patternMismatch) {
        return "Invalid format.";
    } if (passwordsDoNotMatch(field)) {
        return "Passwords do not match"
    }

    return ''
}



function validateField(input) {

    let errorMessage = getErrorMessage(input)

    const currentEl = input.parentElement
    let errorSpan = currentEl.querySelector('.error-message')


    if (errorMessage) {

        input.style.border = '2px solid red'
        input.classList.add('has-error')
        input.classList.remove('no-error')
        if (!errorSpan) {
            errorSpan = document.createElement('span')
            errorSpan.className = 'error-message'
            errorSpan.textContent = errorMessage
            currentEl.appendChild(errorSpan)
            // currentEl.appendChild(errorSpan);
        } else {
            errorSpan.textContent = errorMessage
        }
    } else {
        input.style.border = '2px solid green'
        input.classList.remove('has-error')
        input.classList.add('no-error')
        if (errorSpan) {
            errorSpan.textContent = '';

        }
    }
}

function passwordsDoNotMatch(input) {
    const password = document.getElementById('password')
    const confirmPassword = document.getElementById('confirm-password')

    if (input.id === 'password' || input.id === 'confirm-password') {

        if (password.value == confirmPassword.value || confirmPassword.value == password.value) {
            password.style.border = '2px solid green'
            confirmPassword.style.border = '2px solid green'
            password.nextElementSibling.textContent = ''
            confirmPassword.nextElementSibling.textContent = ''
        }

        if (password.value !== confirmPassword.value) {
            return true
        }
    }

}

function displayModal() {

    const modalContainer = document.getElementById("modal-container");

    modalContainer.innerHTML = ""; // Clear previous content

    // const modal = document.createElement("div");
    modalContainer.innerHTML = `
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
      <h2 class="text-xl font-semibold">Form submitted successfully!</h2>
      <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onclick="closeModal()">
        Close
      </button>
    </div>
  </div>
`;

    modalContainer.appendChild(modal);

}

function checkIfSubmittedSuccessfully() {
    const allValid = [...formInputs].every(input => input.classList.contains('no-error'));
    if (allValid) {
        displayModal()
    }
}

function closeModal() {
    document.getElementById("modal-container").innerHTML = "";
}

function eventListeners() {
    formInputs.forEach((input) => {

        input.addEventListener('input', () => validateField(input));
    })

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        formInputs.forEach((input) => {
            validateField(input);
        });
        checkIfSubmittedSuccessfully()

    });

}



document.addEventListener('DOMContentLoaded', eventListeners)