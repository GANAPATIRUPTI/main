const questions = [
    {
        question: "What is the size of `int` in C?",
        answers: [
            { text: "2 bytes", correct: false },
            { text: "4 bytes", correct: false },
            { text: "Depends on the compiler", correct: true },
            { text: "8 bytes", correct: false },
        ],
    },
    {
        question: "Which keyword is used to declare a constant in C++?",
        answers: [
            { text: "const", correct: true },
            { text: "final", correct: false },
            { text: "static", correct: false },
            { text: "constexpr", correct: false },
        ],
    },
    {
        question: "Which of these is not a valid storage class in C?",
        answers: [
            { text: "auto", correct: false },
            { text: "register", correct: false },
            { text: "volatile", correct: true },
            { text: "extern", correct: false },
        ],
    },
    {
        question: "What is a destructor in C++?",
        answers: [
            { text: "A special function to free resources", correct: true },
            { text: "A function to construct objects", correct: false },
            { text: "A function to initialize data", correct: false },
            { text: "A function to copy objects", correct: false },
        ],
    },
    {
        question: "Which of these is not a fundamental data type in C++?",
        answers: [
            { text: "int", correct: false },
            { text: "float", correct: false },
            { text: "char", correct: false },
            { text: "string", correct: true },
        ],
    },
    {
        question: "What is the default value of a static variable in C?",
        answers: [
            { text: "0", correct: true },
            { text: "Garbage value", correct: false },
            { text: "Null", correct: false },
            { text: "None", correct: false },
        ],
    },
    {
        question: "Which operator is used to access members of a class in C++?",
        answers: [
            { text: ".", correct: true },
            { text: "::", correct: false },
            { text: "->", correct: false },
            { text: "&", correct: false },
        ],
    },
    {
        question: "Which function is the entry point of a C/C++ program?",
        answers: [
            { text: "main()", correct: true },
            { text: "start()", correct: false },
            { text: "begin()", correct: false },
            { text: "init()", correct: false },
        ],
    },
    {
        question: "Which keyword is used to create an object in C++?",
        answers: [
            { text: "new", correct: true },
            { text: "create", correct: false },
            { text: "make", correct: false },
            { text: "allocate", correct: false },
        ],
    },
    {
        question: "Which feature of OOP is supported in C++ but not in C?",
        answers: [
            { text: "Inheritance", correct: true },
            { text: "Functions", correct: false },
            { text: "Pointers", correct: false },
            { text: "Preprocessor directives", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = "Your score: " + score + " out of " + questions.length;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
