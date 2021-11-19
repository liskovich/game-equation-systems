const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Find X and Y: x + y = 5 and 3x - 2y = 0',
        choice1: 'X = 0, Y = 5',
        choice2: 'X = 2, Y = 3',
        choice3: 'X = 0.5, Y = 33',
        choice4: 'X = 110, Y = -2',
        answer: 2,
    },
    {
        question: 'Find X and Y: 3x + y = 11 and 9x - y = 1',
        choice1: 'X = 8.9, Y = 5',
        choice2: 'X = 0, Y = 4',
        choice3: 'X = 1, Y = 8',
        choice4: 'X = -3, Y = 5',
        answer: 3,
    },
    {
        question: 'In which case can you use system of equations?',
        choice1: 'Do calculations to launch a rocket',
        choice2: 'Cook something',
        choice3: 'To ride a bicycle',
        choice4: 'I have no idea',
        answer: 1,
    },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = JSON.parse(localStorage.getItem('mostRecentScore'));
    availableQuestions = [...questions];
    incrementScore(0);
    getNewQuestion();
} 

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter === MAX_QUESTIONS) { // >
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html'); // put a '/' symbol in front
    }

    //questionCounter++;
    progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${ (questionCounter / MAX_QUESTIONS) * 100}%`;

    //const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionCounter]; //questionIndex
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    //availableQuestions.splice(questionCounter, 1); //questionIndex
    
    questionCounter++;
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();