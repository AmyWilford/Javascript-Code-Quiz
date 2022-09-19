// Set variables to access HTML elements
let gameHeaderEl = document.getElementById('game-header');
let highScoreEl = document.getElementById('highscore');
let countdownEl =document.getElementById('countdown');
let startButtonEl = document.getElementById('button-start');
let questionEl = document.getElementById('question');
let multipleChoiceEl = document.getElementById('multiple-choice');
let validateEl = document.getElementById('validate')

// Array of all question objects
let allQuestions = [
    {
        question: 'question 1',
        answers: [
            {text: 'answer 1', status: 1},
            {text: 'answer 2', status: 0},
            {text: 'answer 3', status: 0},
            {text: 'answer 4', status:0 }
        ]
    },
    {
        question: 'question 2',
        answers: [
            {text: 'answer 1', status: 1},
            {text: 'answer 2', status: 0},
            {text: 'answer 3', status: 0},
            {text: 'answer 4', status: 0}
        ]
    },
    {
        question: 'question 3',
        answers: [
            {text: 'answer 1', status: 1},
            {text: 'answer 2', status: 0},
            {text: 'answer 3', status: 0},
            {text: 'answer 4', status: 0}
        ]
    },
    {
        question: 'question 4',
        answers: [
            {text: 'answer 1', status: 1},
            {text: 'answer 2', status: 0},
            {text: 'answer 3', status: 0},
            {text: 'answer 4', status: 0}
        ]
    },
    {
        question: 'question 5',
        answers: [
            {text: 'answer 1', status: 1},
            {text: 'answer 2', status: 0},
            {text: 'answer 3', status: 0},
            {text: 'answer 4', status: 0}
        ]
    }
]

let randomQuestion;
let score;
let isWin = false;
let timer;
let countdown;

// Function to set Timer
function setTimer(){
    startButtonEl.setAttribute('style','display: none' );
    countdown=10;
    timer = setInterval(function(){
        countdownEl.textContent = 'Time remaining: '+countdown;
        highScoreEl.textContent = 'Highscores';
        countdown--;
        if (countdown >=0) {
            if (isWin && countdown >0) {
                clearInterval(timer);
                // winGame();
            }
        }
        if (countdown === 0) {
            clearInterval(timer);
            countdownEl.textContent ='Your time is up!'
            // looseGame();
        }
    },1000)
}
// Function to show questions
function firstQuestion() {
    randomQuestion = allQuestions[Math.floor(Math.random()*allQuestions.length)]
    console.log(randomQuestion);
    let questionIndex = allQuestions.indexOf(randomQuestion);
    questionEl.textContent = allQuestions[questionIndex].question;

}
// when right > show new question
// when wrong > deduct time from the clock

// Function to determine game win
// function winGame(){}

// Function to determine game loss
// function loseGame() {}


// Function save initials and score
// function saveInfo(){}

// Function to start the Game
function startGame(){
    setTimer();
    firstQuestion();
}

startButtonEl.addEventListener('click', startGame);
