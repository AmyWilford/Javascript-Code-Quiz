// Set variables to access HTML elements
let gameHeaderEl = document.getElementById('game-header');
let highScoreEl = document.getElementById('highscore');
let countdownEl =document.getElementById('countdown');
let introEl = document.getElementById('intro-section');
let startButtonEl = document.getElementById('button-start');
let questionEl = document.getElementById('question');
let answerButtons = document.querySelectorAll('.answer');
let multipleChoiceEl = document.getElementById('multiple-choice');
let validateEl = document.getElementById('validate')
let scoreInputEl = document.getElementById('score-input-section');
let gameScoreEl = document.getElementById('gameScore');
let submitEl = document.getElementById('submit-score');
let initialsEl = document.getElementById('initials');


scoreInputEl.setAttribute('style', 'display: none');
gameScoreEl.setAttribute('style', 'display: none');

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
let score = 0;
let timer;
let countdown;
let answerList;
let questionAnswers;
let lastQuestion = allQuestions.length-1;
let questionIndex = 0;
let currentQuestion;
let currentQuestionText;

// let highscore = localStorage.getItem('score')
// let initials = localStorage.getItem('initials')

// Function to set Timer
function setTimer(){
    introEl.setAttribute('style','display: none' );
    countdown=50;
    timer = setInterval(function(){
    countdownEl.textContent = countdown + ' seconds left';
    highScoreEl.textContent = 'View HighScores';
    countdown--;
        if (countdown == 0) {
            clearInterval(timer);
            countdownEl.textContent ='Your time is up!'
            endGame();
        } else if(questionIndex===allQuestions.length) {
            countdownEl.textContent ='completed in time'
            clearInterval(timer);
        }
    },1000)
}
// function to select right Answer
function selectAnswer (event) {
    let selectedAnswerButton = event.target;
    // log to cosole if correct answer
    console.log(selectedAnswerButton.value);
    // if the selected answerbutton's value = 1
    if (selectedAnswerButton.value == 1){
        validateEl.textContent = 'Correct';
        score++;
    } else {
        validateEl.textContent = 'Incorrect';
        countdown=countdown-5;
    }

    questionIndex++;

    if(questionIndex===allQuestions.length){
        endGame();
    } else if(questionIndex<allQuestions.length){
        showQuestion();
    }
 }

// Function to show questions
function showQuestion() {
    // highScoreEl.textContent = 'Highscore:' + score;
    multipleChoiceEl.setAttribute('style', 'display: flex')
    // Pick the first question in the array of questions
    currentQuestion = allQuestions[questionIndex];
    console.log(currentQuestion)

    currentQuestionText = currentQuestion.question;
    console.log(currentQuestionText);

    questionEl.textContent = currentQuestionText;

    for(let i = 0; i<4; i++){
        answerButtons[i].innerText = currentQuestion.answers[i]['text'];
        console.log(currentQuestion.answers[i]['text']);
        answerButtons[i].value = currentQuestion.answers[i]['status'];
    }
    // add an event listener to each button to select answer on a click
    answerButtons.forEach(button => {button.addEventListener('click', selectAnswer)})
}

// Function to determine game win
function endGame(){
    questionEl.textContent='';
    multipleChoiceEl.textContent='your score: ' +score;
    validateEl.textContent='';
    inputScoreInfo();
}


// Function save initials and score
function inputScoreInfo(){
    scoreInputEl.setAttribute('style', 'display: block');
    gameScoreEl.setAttribute('style', 'display: block');
    
    let recentScore = { 
        initials:initialsEl.value,
        score:score,
    }
    localStorage.setItem('recentScore', JSON.stringify(recentScore));

    // getItem



// Parse  and store  allHighScores = [];

// Push new object to allHighScores = [];

// Set item
    }

function renderScore() {
    let lastScore = JSON.parse(localStorage.getItem('recentScore'));
    console.log(lastScore);
    }


// function renderHighscore() {
//     let initials = localStorage.getItem('initials');
//     let score = localStorage.getItem('score');
//     if(!email || !password) {
//         return;
//     }
//     highScoreEl.textContent = score + ' ' + initials;
// }
// To load highscores upon page reload
// function init() {
//     renderHighscore();
// }

// Function to start the Game
function startGame(){
    setTimer();
    showQuestion();
}
startButtonEl.addEventListener('click', startGame);

// init();

// submitEl.addEventListener('click', function(event) {
//     event.preventDefault();
//     initials = submitEl.value;
    
// }