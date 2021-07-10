const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//All functions
// Function to show error
function showEror(input,message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Function to show success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Function to check email is right
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// this is event listener for the submit button
form.addEventListener('submit',function(e) {
    e.preventDefault();
    
    if ( username.value === '' ) {
        showEror(username,'Username is required')
    } else {
        showSuccess(username);
    }

    if ( email.value === '' ) {
        showEror(email,'Email is required')
    } else if (!isValidEmail(email.value)) {
        showEror(email,'Email is invalid')
    } else  {
        showSuccess(email);
    }

    if ( password.value === '' ) {
        showEror(password,'Password is required')
    } else {
        showSuccess(password);
    }

    if ( password2.value === '' ) {
        showEror(password2,'Confirm Password is required')
    } else {
        showSuccess(password2);
    }

})