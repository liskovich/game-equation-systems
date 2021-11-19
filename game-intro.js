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
        question: 'Why do we need Systems of equations?',
        choice1: 'Solve for values of 2+ variables',
        choice2: 'Solve for values of 1 variable',
        choice3: 'Find the sum',
        choice4: 'I have no idea',
        answer: 1,
    },
    {
        question: 'Which brackets are used in these systems?',
        choice1: '[',
        choice2: '(',
        choice3: '{',
        choice4: ',',
        answer: 3,
    },
    {
        question: 'There is only one way how to solve these?',
        choice1: 'yes',
        choice2: 'no',
        choice3: 'I have no idea',
        choice4: 'maybe',
        answer: 2,
    },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
} 

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter === MAX_QUESTIONS) { // >
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('theory-4.html'); // put a '/' symbol in front
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