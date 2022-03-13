import { quizData } from './data.js';
const questionContainer = document.querySelector('.question');
const submitBtn = document.querySelector('#btn-submit');
const skipBtn = document.querySelector('#btn-skip');
const questionTracker = document.querySelector('#question-tracker');
const messageContainer = document.querySelector('.message');
const questionOptions = questionContainer.getElementsByTagName('input');
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.side-bar');

let index = 0;
let message = { type: '', text: '' };
let setMessage = false;

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show-sidebar');
});

const nextQuestion = () => {
    if (index === quizData.length) {
        skipBtn.setAttribute('disabled', 'true');
        skipBtn.classList.add('disabled');
        setMessage = true;
        message = { type: 'message info', text: 'You have completed the quiz!' };
        if (setMessage) {
            messageContainer.innerText = message.text;
            messageContainer.className = message.type;
        }
        setTimeout(() => {
            setMessage = false;
            messageContainer.className = 'hidden';
        }, 1500);
    } else {
        index++;
        disableSubmitBtn();
    }
};
const renderQuiz = () => {
    const questionNumber = quizData[index].id;
    const question = quizData[index].question;
    const answers = quizData[index].answers;
    submitBtn.innerText = 'Submit';

    const innerFormat = answers.map((answer, index) => {
        return `<li>
                                  <input type='radio' name='question-options' value=${answer.toLowerCase()} id=option-${
            index + 1
        } />
                                  <label for=option-${index + 1}>${answer}</label>
                              </li>`;
    });
    const questionHTML = `
                    <h2>Question ${questionNumber}</h2>
                    <p class="question-text">${question}</p>
                    <ul class="options">
                      ${innerFormat.join('')}
                    </ul>`;

    questionTracker.innerHTML = `Question ${questionNumber} of ${quizData.length}`;
    questionContainer.innerHTML = questionHTML;

    Array.from(questionOptions).forEach((item) => {
        item.addEventListener('change', () => {
            submitBtn.removeAttribute('disabled');
            submitBtn.classList.remove('disabled');
        });
    });
};

const disableSubmitBtn = () => {
    submitBtn.setAttribute('disabled', 'true');
    submitBtn.classList.add('disabled');
};

const checkAnswer = () => {
    let selectedOption = '';

    for (let i = 0; i < questionOptions.length; i++) {
        if (questionOptions[i].checked) {
            selectedOption = questionOptions[i].value;
        }
    }
    if (selectedOption === quizData[index].correctAnswer.toLocaleLowerCase()) {
        message = { type: 'message green-info', text: 'Correct Answer!' };
        messageContainer.innerText = message.text;
        messageContainer.className = message.type;
        setTimeout(() => {
            nextQuestion();
            renderQuiz();
        }, 1700);
    } else {
        message = { type: 'message red-info', text: 'Wrong Answer!' };
        messageContainer.innerText = message.text;
        messageContainer.className = message.type;
    }

    setTimeout(() => {
        setMessage = false;
        messageContainer.className = 'hidden';
    }, 1500);
};

skipBtn.addEventListener('click', () => {
    nextQuestion();
    renderQuiz();
});

submitBtn.addEventListener('click', checkAnswer);

document.addEventListener('DOMContentLoaded', () => renderQuiz());
