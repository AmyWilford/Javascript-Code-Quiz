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
let viewHighscoresEl = document.getElementById('viewHighscores');
let resetButton = document.createElement('button');
let clearButton = document.createElement('button');

// Set global variables
let score = 0;
let timer;
let countdown;
let questionIndex;
let currentQuestion;
let currentQuestionText;
let recentScore;

// Array of all question objects
let allQuestions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            {text: '<js>', status: 0},
            {text: '<script>', status: 1},
            {text: '<javascript>', status: 0},
            {text: '<link>', status:0 }
        ]
    },
    {
        question: 'What is the correct syntax for referring to an external script called name.js?',
        answers: [
            {text: '<script access="name.js">', status: 0},
            {text: '<script href="name.js">', status: 0},
            {text: '<script file="name.js">', status: 0},
            {text: '<script src="name.js">', status: 1}
        ]
    },
    {
        question: 'Where is the correct place to insert JavaScript in your HTML file?',
        answers: [
            {text: 'At the bottom of the <body> section before the closing tag', status: 1},
            {text: 'Enter it twice, once in the <head> section and once in the <body> section', status: 0},
            {text: 'The <head> section', status: 0},
            {text: 'You can place it anywhere in the document as long as it is correctly linked', status: 0}
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            {text: 'alertBox("Hello World")', status:0},
            {text: 'msg("Hello World")', status: 0},
            {text: 'alert("Hello World")', status: 1},
            {text: 'attn("Hello World")', status: 0}
        ]
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        answers: [
            {text: '=', status: 1},
            {text: '*', status: 0},
            {text: '-', status: 0},
            {text: '/', status: 0}
        ]
    }
]

// Function to reload page after reset event. Resets initial styles to original game load
function reloadPage(event){
    introEl.setAttribute('style', 'display:block');
    scoreInputEl.setAttribute('style', 'display: none');
    gameScoreEl.setAttribute('style', 'display: none');
    multipleChoiceEl.setAttribute('style', 'display: none')
    console.log('reloading page');
    viewHighscoresEl.textContent = '';
    resetButton.setAttribute('style','display:none');
    countdownEl.textContent ='';
}
    
// Function to set Timer
function setTimer(){
    questionIndex = 0;
    introEl.setAttribute('style','display: none' );
    countdownEl.setAttribute('style','display: block');
    countdown=10;
    timer = setInterval(function(){
    countdownEl.textContent = 'Time: '+ countdown;
    countdown--;
        if (countdown <= 0) {
            endGame();
            countdownEl.textContent ='Your time is up!'
            clearInterval(timer);
        } else if(questionIndex===allQuestions.length) {
            clearInterval(timer);
            countdownEl.textContent =''
        }
    },1000)
}

// function to select right Answer from multiple choice selection
function selectAnswer (event) {
    let selectedAnswerButton = event.target;
    // if the selected answerbutton's value = 1, it is correct
    if (selectedAnswerButton.value == 1){
        validateEl.textContent = 'Correct';
        score++;
    // If the selected answerbutton's value is not 0, it is incorrect - and the timer will have 10 seconds removed
    } else {
        validateEl.textContent = 'Incorrect';
        if (countdown<=5) {
            countdown=0;
        } else {
            countdown= (countdown-10);
        }
    }
    // When an answer button is clicked, the question index will increase by one, to load the next question
    questionIndex++;

    // If the question index = the number of available questions, or if the countdown clock hits zero, run gameEnd function
    if(questionIndex===allQuestions.length || countdown ==0){
        clearInterval(setTimer);
        endGame();
    // Otherwise, show the next question
    } else if(questionIndex<allQuestions.length){
        showQuestion();
    }
 }

// Function to show questions consecutively
function showQuestion() {
    multipleChoiceEl.setAttribute('style', 'display: flex')
    questionEl.setAttribute('style', 'display: block');
    // The question index is set to zero upon game load - which selects the first question in the list of available questions
    currentQuestion = allQuestions[questionIndex];
    // Pulls the text of the question from the array of available question objects
    currentQuestionText = currentQuestion.question;
    // The question element text content displays the question text
    questionEl.textContent = currentQuestionText;
    // Loop through answers linked to each question object and pull their text and status
    for(let i = 0; i<4; i++){
        answerButtons[i].innerText = currentQuestion.answers[i]['text'];
        answerButtons[i].value = currentQuestion.answers[i]['status'];
    }
    // add an event listener to each button to select answer on a click
    answerButtons.forEach(button => {button.addEventListener('click', selectAnswer)})
}

// Function to load end of game
function endGame(){
    countdownEl.setAttribute('style', 'display: none');
    multipleChoiceEl.setAttribute('style', 'display:none')
    questionEl.textContent= 'Quiz Over'
    gameScoreEl.textContent='Your score is: ' + score;
    validateEl.textContent='';
    quizOver='';
    displayScoreInfo();
}

// Function save display score and initial input
function displayScoreInfo(){
    scoreInputEl.setAttribute('style', 'display: block');
    gameScoreEl.setAttribute('style', 'display: block');
}

// Function to clear scores
function clearScores(event){
    window.localStorage.clear();
    viewHighscoresEl.textContent = '';
    console.log('cleared scores');
}

// Function to start the Game
function startGame(){
    setTimer();
    showQuestion();
}

// Event listener to accept and store score and submitted initials on button click
submitEl.addEventListener('click', function(event){
    event.preventDefault();
    questionEl.textContent=''; 
    recentScore = { 
        initials:initialsEl.value,
        score:score,
    }
    let previousScores = JSON.parse(localStorage.getItem('recentScore')) || [];
    if(recentScore.initials.length <= 0){
        alert('Please enter your initials');
    } else {
        previousScores.push(recentScore);
        localStorage.setItem('recentScore', JSON.stringify(previousScores));
        scoreInputEl.setAttribute('style','display: none');
        resetButton.setAttribute('style','display:block');
        resetButton.textContent='Go Home';
        gameHeaderEl.append(resetButton);
    }
    initialsEl.value='';
})

// Event Listener to view highscores from local store when button clicked
highScoreEl.addEventListener('click', function(event){
    // Set display: none of elements which will disappear on click of highscoreEl
    event.preventDefault();
    scoreInputEl.setAttribute('style', 'display:none');
    questionEl.setAttribute('style', 'display:none');
    multipleChoiceEl.setAttribute('style', 'display:none');
    introEl.setAttribute('style','display:none');
    countdownEl.setAttribute('style', 'display: none');
    validateEl.setAttribute('style', 'display: none');
    scoreInputEl.setAttribute('style', 'display: none');

    // Parse through stored high scores - and store in the array previousScores. Lopp through array and log each index of score and initials to newly created <p>. Append to view highscoreEl
    let previousScores = JSON.parse(localStorage.getItem('recentScore')) || [];
    // Reset textContent to empty string at start of event that scores are not logged repetatively over consecutive clicks
    viewHighscoresEl.textContent='';
    for(i =0; i<previousScores.length; i++){
        let initialSection = document.createElement('p')
        initialSection.textContent= 'initials: ' + previousScores[i].initials + ' | score: '+ previousScores[i].score;
        viewHighscoresEl.append(initialSection)
    }
    // Make reset button appear. Set text content and append to game header
    resetButton.setAttribute('style','display:block');
    resetButton.textContent='Go Home';
    gameHeaderEl.append(resetButton);

    // Make clear scores button. Set text content and append to viewHighScoresEl
    clearButton.setAttribute('style','display:block');
    clearButton.setAttribute('style', 'text-align: center');
    clearButton.textContent='ClearScores';
    viewHighscoresEl.append(clearButton);
})

// Event listener to clear scores on click of <clear scores button> 
clearButton.addEventListener('click', clearScores);

// Event listener to reload page on click of <go home button>
resetButton.addEventListener('click', reloadPage);

// Event Listener to start the game on click of <start quiz button>
startButtonEl.addEventListener('click', startGame);
