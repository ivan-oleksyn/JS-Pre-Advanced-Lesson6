'use strict';
const getElem = selector => document.querySelector(selector);

/* Variables */
let testFirstName;
let testLastName;
let testEmail;
let testPassword;
let firstName;
let lastName;
let email;
let pass;
let users = [];
let includeEmail;
let form = document.forms.signUp;
let inputArr = document.querySelectorAll('.input');

/* RegExp */
let nameRegExp = /^[a-zA-Z]{2,20}$/;
let emailRegExp = /^[0-9a-zA-Z-.]+@[a-zA-Z]+\.+[a-zA-Z]/;
let passRegExp = /^[a-zA-Z0-9]{8,15}$/;

/* Functions */
const createObject = () => {
    let user = {
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'password': pass
    }
    return user;
}

const checkEmail = () => {
    let arr = JSON.parse(localStorage.getItem('users'));
    includeEmail = arr.some((user) => user.email === getElem('.email').value);
    getElem('.email').dataset.value = includeEmail;
    return includeEmail;
}

const resetData = () => {
    form.reset();
    getElem('.valid-icon-fn').classList.add('hide');
    getElem('.valid-icon-ln').classList.add('hide');
    getElem('.valid-icon-email').classList.add('hide');
    getElem('.valid-icon-pass').classList.add('hide');
    getElem('.error-email').classList.add('hide');
    getElem('.first-name').classList.remove('border');
    getElem('.first-name').classList.remove('border-error');
    getElem('.last-name').classList.remove('border');
    getElem('.last-name').classList.remove('border-error');
    getElem('.email').classList.remove('border-error');
    getElem('.email').classList.remove('border');
    getElem('.password').classList.remove('border');
    getElem('.password').classList.remove('border-error');
    for (let i = 0; i < inputArr.length; i++) {
        inputArr[i].dataset.value = "";
    }
    testFirstName = false;
    testLastName = false;
    testEmail = false;
    testPassword = false;
}

const validInput = (iconClass, errorIconClass) => {
    getElem(iconClass).classList.remove('hide');
    getElem(errorIconClass).classList.add('hide');
};

const invalidInput = (iconClass, errorIconClass) => {
    getElem(iconClass).classList.add('hide');
    getElem(errorIconClass).classList.remove('hide');
};

const borderStyle = () => {
    if (getElem('.first-name').dataset.value) {
        getElem('.first-name').classList.add('border');
    } else {
        getElem('.first-name').classList.add('border-error');
    }
    if (getElem('.last-name').dataset.value) {
        getElem('.last-name').classList.add('border');
    } else {
        getElem('.last-name').classList.add('border-error');
    }
    if (getElem('.email').dataset.value) {
        getElem('.email').classList.add('border-error');
    } else {
        getElem('.email').classList.add('border');
    }
    if (getElem('.password').dataset.value) {
        getElem('.password').classList.add('border');
    } else {
        getElem('.password').classList.add('border-error');
    }
}

getElem('.first-name').addEventListener('input', function () {
    testFirstName = nameRegExp.test(getElem('.first-name').value);
    if (testFirstName) {
        validInput('.valid-icon-fn', '.error-icon-fn');
        firstName = getElem('.first-name').value
    } else {
        invalidInput('.valid-icon-fn', '.error-icon-fn');
    }
    getElem('.first-name').dataset.value = testFirstName;
});
getElem('.last-name').addEventListener('input', function () {
    testLastName = nameRegExp.test(getElem('.last-name').value);
    if (testLastName) {
        validInput('.valid-icon-ln', '.error-icon-ln');
        lastName = getElem('.last-name').value
    } else {
        invalidInput('.valid-icon-ln', '.error-icon-ln');
    }
    getElem('.last-name').dataset.value = testLastName;
})
getElem('.email').addEventListener('input', function () {
    testEmail = emailRegExp.test(getElem('.email').value);
    if (testEmail) {
        validInput('.valid-icon-email', '.error-icon-email');
        email = getElem('.email').value
    } else {
        invalidInput('.valid-icon-email', '.error-icon-email');
    }
})
getElem('.password').addEventListener('input', function () {
    testPassword = passRegExp.test(getElem('.password').value);
    if (testPassword) {
        validInput('.valid-icon-pass', '.error-icon-pass');
        pass = getElem('.password').value
    } else {
        invalidInput('.valid-icon-pass', '.error-icon-pass');
    }
    getElem('.password').dataset.value = testPassword;
})
getElem('.sign-up-button').addEventListener('click', function () {
    if (testFirstName && testLastName && testEmail && testPassword && localStorage.length < 1) {
        users = [];
        users.push(createObject());
        localStorage.setItem('users', JSON.stringify(users));
        resetData();
    } else {
        checkEmail();
        if (includeEmail) {
            includeEmail = false;
            getElem('.error-email').classList.remove('hide');
            invalidInput('.valid-icon-email', '.error-icon-email');
            borderStyle();
        } else {
            const newUser = createObject();
            let users1 = JSON.parse(localStorage.getItem('users'));
            users1.push(newUser);
            localStorage.setItem('users', JSON.stringify(users1));
            resetData();
        }
    }
});