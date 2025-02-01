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

// function addErrorElement(errorText) {
//     const currentEl = document.activeElement.parentElement
//     const parent = document.querySelector('.parent')
//     const errorSpan = currentEl.querySelector('.error-message')



//     const span = document.createElement('span')
//     span.className = 'error-message'
//     span.textContent = errorText



//     if (getErrorMessage && !errorSpan) {
//         currentEl.appendChild(span)
//         console.log(currentEl.lastElementChild)
//     } else if (!getErrorMessage && errorSpan) {
//         errorSpan.textContent = ''
//     }

// }


function validateField(input) {

    let errorMessage = getErrorMessage(input)

    const span = document.createElement('span')
    const currentEl = document.activeElement.parentElement
    const errorSpan = currentEl.querySelector('.error-message')

    if (errorMessage) {
        console.log(errorMessage)
        span.className = 'error-message'
        span.textContent = errorMessage
        input.style.border = '2px solid red'
        if (!errorSpan) {
            currentEl.appendChild(span)
        }
    } else {
        console.log(errorMessage)
        input.style.border = '2px solid green'
        if (errorSpan) {
            errorSpan.remove()
        }

        // span.textContent = errorMessage
    }
}


formInputs.forEach((input) => {

    input.addEventListener('input', () => validateField(input));
})