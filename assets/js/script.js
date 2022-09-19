// Set variables to access HTML elements
let gameHeaderEl = document.getElementById('game-header');
let highScoreEl = document.getElementById('highscore');
let countdownEl =document.getElementById('countdown');
let introEl = document.getElementById('intro-section');
let startButtonEl = document.getElementById('button-start');
let questionEl = document.getElementById('question');
let answerButtons = document.querySelectorAll('answer');
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
let answerList;

// Function to set Timer
function setTimer(){
    introEl.setAttribute('style','display: none' );
    countdownEl.textContent = 'Count Down';
    highScoreEl.textContent = 'Highscores';
    countdown=10;
    timer = setInterval(function(){
    countdownEl.textContent = countdown + ' seconds left';
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
    // Pick random question from list of questions
    randomQuestion = allQuestions[Math.floor(Math.random()*allQuestions.length)]
    console.log(randomQuestion);
    
    // Determine index of question
    let questionIndex = allQuestions.indexOf(randomQuestion);
    console.log(questionIndex);
    
    // Update question-section element with question text
    let selectedQuestion = allQuestions[questionIndex].question;
    questionEl.textContent = selectedQuestion;
    console.log(selectedQuestion);
    for(let i=0; i<4; i++){
       let allAnswers= allQuestions[questionIndex].answers[i]['text'];
       console.log(allAnswers);
        let answerButtons = document.createElement('button');
        answerButtons.textContent = allAnswers;
        multipleChoiceEl.appendChild(answerButtons)
    }
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
