console.log("CyberLab запущен 🚀");


/* =================================
   ГЛАВНАЯ СТРАНИЦА
================================= */


const progress = document.querySelector(".progress-fill");


window.addEventListener("load", function () {

    setTimeout(function () {

        if (progress) {

            progress.style.width = "15%";

        }

    }, 500);

});


const cards = document.querySelectorAll(".card");


cards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        console.log("Пользователь навёлся на карточку");

    });

});



/* =================================
   ТЕСТ
================================= */


const questions = [

    {
        question: "Что такое IP-адрес?",

        answers: [
            "Пароль пользователя",
            "Адрес устройства в сети",
            "Название браузера",
            "Тип антивируса"
        ],

        correct: 1
    },


    {
        question: "Что означает DNS?",

        answers: [
            "Система доменных имён",
            "Антивирусная программа",
            "Тип Wi-Fi",
            "Пароль от сети"
        ],

        correct: 0
    },


    {
        question: "Что такое фишинг?",

        answers: [
            "Метод резервного копирования",
            "Вид компьютерной игры",
            "Обман с целью получить данные пользователя",
            "Способ ускорить интернет"
        ],

        correct: 2
    },


    {
        question: "Что делает HTTPS?",

        answers: [
            "Увеличивает скорость компьютера",
            "Защищает передачу данных между браузером и сайтом",
            "Удаляет вирусы",
            "Создаёт пароль"
        ],

        correct: 1
    },


    {
        question: "Что такое MFA?",

        answers: [
            "Многофакторная аутентификация",
            "Тип вируса",
            "Язык программирования",
            "Сетевой кабель"
        ],

        correct: 0
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;



function loadQuestion() {

    const questionElement =
        document.querySelector("#question");

    const answersElement =
        document.querySelector("#answers");

    const numberElement =
        document.querySelector("#question-number");

    const progressElement =
        document.querySelector("#quiz-progress");

    const resultElement =
        document.querySelector("#quiz-result");

    const nextButton =
        document.querySelector("#next-button");


    if (!questionElement) {

        return;

    }


    const question =
        questions[currentQuestion];


    questionElement.textContent =
        question.question;


    numberElement.textContent =
        `Вопрос ${currentQuestion + 1} / ${questions.length}`;


    progressElement.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    answersElement.innerHTML = "";

    resultElement.textContent = "";

    resultElement.className = "";

    nextButton.style.display = "none";


    answered = false;


    question.answers.forEach(function (answer, index) {

        const button =
            document.createElement("button");


        button.textContent = answer;


        button.classList.add("answer-button");


        button.addEventListener("click", function () {

            selectAnswer(index, button);

        });


        answersElement.appendChild(button);

    });

}



function selectAnswer(index, button) {

    if (answered) {

        return;

    }


    answered = true;


    const resultElement =
        document.querySelector("#quiz-result");


    const nextButton =
        document.querySelector("#next-button");


    const question =
        questions[currentQuestion];


    if (index === question.correct) {

        score++;

        resultElement.textContent =
            "Правильно! 🔥";


        resultElement.className =
            "result-success";

    } else {

        resultElement.textContent =
            `Неправильно. Правильный ответ: ${question.answers[question.correct]}`;


        resultElement.className =
            "result-wrong";

    }


    document.querySelector("#score").textContent =
        `${score} баллов`;


    button.classList.add("selected");


    nextButton.style.display =
        "inline-block";

}



function nextQuestion() {

    currentQuestion++;


    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

}



function showResult() {

    const container =
        document.querySelector(".quiz-card");


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    let message;


    if (percentage === 100) {

        message =
            "Отличный результат! 🔥";

    } else if (percentage >= 60) {

        message =
            "Хороший результат! Продолжай изучать Cyber Security.";

    } else {

        message =
            "Неплохо для начала. Повтори материал и попробуй снова.";

    }


    container.innerHTML = `

        <div class="result-screen">

            <div class="card-icon">
                🛡️
            </div>

            <h2>
                Тест завершён!
            </h2>

            <div class="final-score">
                ${score} / ${questions.length}
            </div>

            <p>
                ${percentage}% правильных ответов
            </p>

            <p>
                ${message}
            </p>

            <button
                class="next-button"
                onclick="location.reload()">

                Пройти снова ↻

            </button>

        </div>

    `;

}



loadQuestion();