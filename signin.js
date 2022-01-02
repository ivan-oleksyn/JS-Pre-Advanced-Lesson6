'use strict';

const getElem = selector => document.querySelector(selector);

/* Variables */
let array, userValid, signIn = document.forms.signIn;

/* Functions */
const ucFirst = (str) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}

const checkValues = () => {
    array = JSON.parse(localStorage.getItem('users'));
    userValid = array.find((user) => user.email === getElem('.sign-in-email').value && user.password === getElem('.sign-in-password').value);
    return userValid;
}

getElem('.sign-in-button').addEventListener('click', function () {
    console.log(localStorage.length);
    if (localStorage.length != 0) {
        checkValues();
        if (userValid) {
            getElem('.profile-title').innerHTML = `${userValid.firstName} ${userValid.lastName}`;
            getElem('.profile-title').classList.add('uc-first');
            getElem('.profile-email').innerHTML = userValid.email;
            getElem('.profile').classList.remove('hide');
            getElem('.form').classList.add('hide');
            signIn.reset();
        } else {
            getElem('.error-sign-in-password').classList.remove('hide');
        }
    }
});

getElem('.profile-button').addEventListener('click', function () {
    getElem('.error-sign-in-password').classList.add('hide');
    getElem('.profile').classList.add('hide');
    getElem('.form').classList.remove('hide');
})