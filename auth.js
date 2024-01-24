document.addEventListener('DOMContentLoaded', (event) => {
    const registerbtn = document.querySelector('#Register');
    const loginbtn = document.querySelector('#LoginBtn');
    const signup = document.querySelector('.signup');
    const login = document.querySelector('.login');
    let resetForm = document.querySelector('.reset');
    let forgotBTN = document.querySelector('#forgotPass');

    registerbtn.addEventListener("click", () => {
        login.style.zIndex = 9;
        signup.style.zIndex = -1;
        // resetForm.style.zIndex = -2
    });

    loginbtn.addEventListener("click", () => {
        login.style.zIndex = -1;
        signup.style.zIndex = 9;
        // resetForm.style.zIndex = -2;
    })

    forgotBTN.addEventListener("click", () => {
        login.style.zIndex = -1;
        signup.style.zIndex = -9;
        resetForm.style.zIndex = 7;
    })

});

// Selecting elements 
let signupEmailInp = document.getElementById('signupemailInp');
let loginEmailInp = document.getElementById('loginemailInp');
let signupPassInp = document.getElementById('signuppassInp');
let loginPassInp = document.getElementById('loginpassInp');
let resetEmailInp = document.querySelector('#resetemailInp');
let nameInp = document.getElementById('nameInp');
let signupForm = document.getElementById('signup_form_main');
let resetForm = document.getElementById('reset_form');
let loginForm = document.getElementById('login_form');
let resetLink = document.getElementById('linkSend');

