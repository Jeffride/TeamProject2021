const startButton = document.getElementById('start-btn')
const questionImage = document.getElementById('question-image')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const restartButton = document.getElementById('restart-btn')
const versusGamemode = document.getElementById('versus')
const showLeaderboard = document.getElementById('leaderboard')
const gamemodeText = document.getElementById('mode-text')
const corkImage = document.getElementById('cork-flag')
const userName = document.getElementById('user-name')
const userScore = document.getElementById('user-score')
const highScore = document.getElementById('user-high-score')
const easyMode = document.getElementById('easy-mode')
const hardMode = document.getElementById('hard-mode')
const controls = document.getElementById('controls')

let shuffledQuestions, currentQuestionIndex
var elem = document.getElementById('question-timer');
var timerReset = 20;
var timeLeft = 20;
var timer1 = setInterval(countdown,1500)

startButton.addEventListener('click', startGame)
versusGamemode.addEventListener('click', versusGameStart)
showLeaderboard.addEventListener('click', showLeaderboard)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    versusGamemode.classList.add('hide')
    showLeaderboard.classList.add('hide')
    gamemodeText.innerHTML = "Select Difficulty";
    corkImage.classList.add('hide')
    easyMode.classList.remove('hide')
    hardMode.classList.remove('hide')
    easyMode.addEventListener('click', pickEasyMode)
    hardMode.addEventListener('click', pickHardMode)
}

function pickEasyMode() {
    gamemodeText.classList.add('hide')
    easyMode.classList.add('hide')
    hardMode.classList.add('hide')
    userScore.classList.remove('hide')
    highScore.classList.remove('hide')
    elem.innerHTML = timerReset + " seconds remaining"
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    scoreElem.innerHTML = 0;
    setNextQuestion()
}


function shuffleArray(questions) {
    for (var i = questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
    return questions;
}

function versusGameStart() {
    alert("Other Gamemodes Coming Soon")
}

function setNextQuestion() {
    timeLeft = timerReset;
    if (currentQuestionIndex >= 5) {
        easygameEnd()
    }
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    nextButton.addEventListener('click', resetTimer())
}

function showQuestion(question) {
    resetTimer()
    questionElement.innerText = question.question
    questionImage.src = question.image
    questionImage.style.height = '250px';
    questionImage.style.width = '100%';
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetTimer() {
    timeLeft = timerReset;
    countdown()
}

function countdown() {
    elem.innerHTML = timeLeft + ' seconds remaining';
    if (timeLeft == 0) {
        elem.innerHTML = 'Ran out of time!'
        currentQuestionIndex++
        setTimeout(setNextQuestion,1000)
    }
    else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}

function easygameEnd(){
    questionContainerElement.classList.add('hide')
    
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        calculateScore()
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        restartButton.classList.remove('hide')
        restartButton.addEventListener('click', backToMenu)
    }
}


function backToMenu() {
    restartButton.classList.add('hide')
    questionContainerElement.classList.add('hide')
    startButton.classList.remove('hide')
    versusGamemode.classList.remove('hide')
    showLeaderboard.classList.remove('hide')
    gamemodeText.classList.remove('hide')
    corkImage.classList.remove('hide')
    userScore.classList.add('hide')
    highScore.classList.add('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

var roundScore = 0;
var scoreElem = document.getElementById('new-score');
function calculateScore() {
    roundScore += timeLeft;
    scoreElem.innerHTML = roundScore;
}

const questions = [
    {
        question: 'Where is this?',
        image: '/static/images/easy/UCC.jpg',
        answers: [
            { text: 'Shandon Street', correct: false },
            { text: 'Franciscan Well', correct: false },
            { text: 'University College Cork', correct: true },
            { text: 'Cork City Hall', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/douglas.jpg',
        answers: [
            { text: 'Douglas', correct: true },
            { text: 'Blackpool', correct: false },
            { text: 'Mayfield', correct: false },
            { text: 'Mallow', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/patricksStreet.jpg',
        answers: [
            { text: 'South Mall', correct: false },
            { text: 'College Road', correct: false },
            { text: 'Patrick Street', correct: true },
            { text: 'North Cathedral', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/shandonBells.jpg',
        answers: [
            { text: "Saint Fin Barre's", correct: false },
            { text: 'Shandon Bells', correct: true },
            { text: 'Holy Trinity', correct: false },
            { text: 'North Cathedral', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/knocka.png',
        answers: [
            { text: 'Farrenree', correct: false },
            { text: 'Mahon Point', correct: false },
            { text: 'Wilton', correct: false },
            { text: 'Knockanaheeny', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/fitzgeraldsPark.jpg',
        answers: [
            { text: 'Bishopstown Playground', correct: false },
            { text: 'Ballincollig Park', correct: false },
            { text: 'Tramore Valley Park', correct: false },
            { text: 'Fizgeralds Park', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/patrickshill.jpg',
        answers: [
            { text: 'Strawberry Hill', correct: false },
            { text: 'Shandon Street', correct: false },
            { text: 'Patricks Hill', correct: true },
            { text: 'Dublin Hill', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/cobh.jpg',
        answers: [
            { text: 'Kinsale', correct: false },
            { text: 'Cork Docklands', correct: false },
            { text: 'Cobh', correct: true },
            { text: 'Youghal', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/blackpool.jpg',
        answers: [
            { text: 'Blackpool', correct: true },
            { text: 'Douglas', correct: false },
            { text: 'Wilton', correct: false },
            { text: 'Little Island', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/oval.jpg',
        answers: [
            { text: 'Old Oak', correct: false },
            { text: 'The Oval', correct: true },
            { text: 'Cissie Youngs', correct: false },
            { text: 'The Rock', correct: false }
        ]
    }
]
