// Set variables to access HTML elements
let gameHeaderEl = document.getElementById('game-header');
let highScoreEl = document.getElementById('highscore');
let countdownEl =document.getElementById('countdown');
let startButtonEl = document.getElementById('button-start');
let questionEl = document.getElementById('question');
let multipleChoiceEl = document.getElementById('multiple-choice');
let validateEl = document.getElementById('validate')

let questions = [

]
let score;
let isWin = false;
let timer;
let countdown;



// Function to set Timer
function setTimer(){
    countdown=10;
    timer = setInterval(function(){
        countdownEl.textContent = countdown;
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
// function showQuestions{}

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
    startButtonEl.addEventListener('click', setTimer);
}

startGame();