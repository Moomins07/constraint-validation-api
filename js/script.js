//create nodelist for all inputs

//create a function that will pass in a list item and check for all validations that I want to use

//loop through nodelist and apply validation function to each nodelist item


const formInputs = document.querySelectorAll('input');

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
    }

    return ''
}

function addErrorElement(errorText, input) {
    const currentEl = document.activeElement.parentElement
    const parent = input.querySelector('.parent')

    const span = document.createElement('span')
    span.className = '.error-message'
    span.textContent = errorText

    if (!parent.querySelector('.error-message')) {
        currentEl.appendChild(span)
    }
}


function validateField(input) {


    console.log(getErrorMessage(input))

    let errorMessage = getErrorMessage(input)

    if (errorMessage) {
        input.style.border = '2px solid red'
        addErrorElement(errorMessage)
    } else {
        errorMessage.textContent = ''
        input.style.border = '2px solid green'
    }
}


formInputs.forEach((input) => {

    input.addEventListener('input', () => validateField(input));
})