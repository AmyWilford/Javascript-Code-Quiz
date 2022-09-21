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
// let viewHighScores;
let resetButton = document.createElement('button');

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

let score = 0;
let timer;
let countdown;
let questionIndex;
let currentQuestion;
let currentQuestionText;
let recentScore;

scoreInputEl.setAttribute('style', 'display: none');

// Function to reload page after reset event. Resets initial styles to original game load
function reloadPage(event){
    introEl.setAttribute('style', 'display:block');
    scoreInputEl.setAttribute('style', 'display: none');
    gameScoreEl.setAttribute('style', 'display: none');
    multipleChoiceEl.setAttribute('style', 'display: none')
    console.log('reloadingpage');
    viewHighscoresEl.textContent = '';
    resetButton.setAttribute('style','display:none');
    countdownEl.textContent ='';
}
    
// Function to set Timer
function setTimer(){
    questionIndex = 0;
    introEl.setAttribute('style','display: none' );
    countdownEl.setAttribute('style','display: block');
    countdown=60;
    timer = setInterval(function(){
    countdownEl.textContent = 'Time: '+ countdown;
    countdown--;
        if (countdown === 0) {
            endGame();
            countdownEl.textContent ='Your time is up!'
            clearInterval(timer);
        } else if(questionIndex===allQuestions.length) {
            clearInterval(timer);
            countdownEl.textContent =''
        }
    },1000)
}
// function to select right Answer
function selectAnswer (event) {
    let selectedAnswerButton = event.target;
    // log to cosole if correct answer
    console.log(selectedAnswerButton.value);
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

// Function to show questions
function showQuestion() {
    multipleChoiceEl.setAttribute('style', 'display: flex')
    questionEl.setAttribute('style', 'display: block');
    // The question index is set to zero upon game load - which selects the first question in the list of available questions
    currentQuestion = allQuestions[questionIndex];
    console.log(currentQuestion)
    // Pulls the text of the question from the array of available question objects
    currentQuestionText = currentQuestion.question;
    console.log(currentQuestionText);
    // The question element text content displays the question text
    questionEl.textContent = currentQuestionText;
    // Loop through answers linked to each question object and pull their text and status
    for(let i = 0; i<4; i++){
        answerButtons[i].innerText = currentQuestion.answers[i]['text'];
        console.log(currentQuestion.answers[i]['text']);
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

// Function to start the Game
function startGame(){
    setTimer();
    showQuestion();
}
// Event Listener to start the game when the start button is clicked
startButtonEl.addEventListener('click', startGame);

// Event listener to accept and store score and submitted initials on button click
submitEl.addEventListener('click', function(event){
    event.preventDefault();
    questionEl.textContent=''; 
    recentScore = { 
        initials:initialsEl.value,
        score:score,
    }
    let previousScores = JSON.parse(localStorage.getItem('recentScore')) || [];
    previousScores.push(recentScore);
    
    console.log(recentScore);
    localStorage.setItem('recentScore', JSON.stringify(previousScores));
    scoreInputEl.setAttribute('style','display: none');
    resetButton.setAttribute('style','display:block');
    resetButton.textContent='Reset Quiz';
    gameHeaderEl.append(resetButton);
    
})
// Event Listener to view highscores from local store when button clicked
highScoreEl.addEventListener('click', function(event){
    event.preventDefault();
    scoreInputEl.setAttribute('style', 'display:none');
    questionEl.setAttribute('style', 'display:none');
    multipleChoiceEl.setAttribute('style', 'display:none');
    introEl.setAttribute('style','display:none');
    let previousScores = JSON.parse(localStorage.getItem('recentScore')) || [];
    viewHighscoresEl.textContent='';
    for(i =0; i<previousScores.length; i++){
        console.log(previousScores[i]);
        let initialSection = document.createElement('p')
        initialSection.textContent= 'initials: ' + previousScores[i].initials + ' | score: '+ previousScores[i].score;
        viewHighscoresEl.append(initialSection)
    }

    resetButton.setAttribute('style','display:block');
    resetButton.textContent='Reset Quiz';
    gameHeaderEl.append(resetButton);
})

resetButton.addEventListener('click', reloadPage);

