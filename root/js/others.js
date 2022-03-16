const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.side-bar');
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show-sidebar');
});
const messageContainer = document.querySelector('.message');

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const form = document.querySelector('.contact-form');
const submitBtn = document.querySelector('#submit-btn');
const resetBtn = document.querySelector('#reset-btn');
const agreeCheckbox = document.querySelector('#agree');

let setMessage = false;
let message = { type: '', text: '' };

function validateEmail(email) {
    var regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}
email.addEventListener('input', () => {
    if (!validateEmail(email.value)) {
        setMessage = true;
        message = { type: 'message red-info', text: 'Email is not valid!' };
        if (setMessage) {
            messageContainer.innerText = message.text;
            messageContainer.className = message.type;
        }
    } else {
        setMessage = false;
        messageContainer.className = 'hidden';
    }
});

resetBtn.addEventListener('click', () => {
    name.value = '';
    email.value = '';
    form.reset();
    setMessage = false;
    messageContainer.className = 'hidden';
});

form.addEventListener('input', (e) => {
    if (name.value && email.value && validateEmail(email.value) && agreeCheckbox.checked) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('disabled');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.add('disabled');
    }
});
