const redirectHome = document.getElementById('redirect_home')
const questionImage = document.getElementById('question-image')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const restartButton = document.getElementById('restart-btn')
const showLeaderboard = document.getElementById('leaderboard')
const gamemodeText = document.getElementById('mode-text')
const corkImage = document.getElementById('cork-flag')
const userName = document.getElementById('user-name')
const userScore = document.getElementById('user-score')
const highScore = document.getElementById('high-score')
const easyMode = document.getElementById('easy-mode')
const hardMode = document.getElementById('hard-mode')
const retroMode = document.getElementById('retro-mode')
const controls = document.getElementById('controls')
const containerElem = document.getElementById('container')

let shuffledQuestions, currentQuestionIndex
var elem = document.getElementById('question-timer');
var timerReset = 20;
var timeLeft = 20;
var timer1 = setInterval(countdown,1500)
var highScoreElem = document.getElementById('best-score');


showLeaderboard.addEventListener('click', showLeaderboard)
easyMode.classList.remove('hide')
easyMode.addEventListener('click', pickEasyMode)
retroMode.classList.remove('hide')
retroMode.addEventListener('click', pickRetroMode)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})



function pickEasyMode() {
    showLeaderboard.classList.add('hide')
    corkImage.classList.add('hide')
    gamemodeText.classList.add('hide')
    easyMode.classList.add('hide')
    hardMode.classList.add('hide')
    retroMode.classList.add('hide')
    userScore.classList.remove('hide')
    highScore.classList.remove('hide')
    elem.innerHTML = timerReset + " seconds remaining"
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    scoreElem.innerHTML = 0;
    setNextQuestion()
}

function pickRetroMode() {
    showLeaderboard.classList.add('hide')
    corkImage.classList.add('hide')
    gamemodeText.classList.add('hide')
    easyMode.classList.add('hide')
    hardMode.classList.add('hide')
    retroMode.classList.add('hide')
    userScore.classList.remove('hide')
    highScore.classList.remove('hide')
    elem.innerHTML = timerReset + " seconds remaining"
    shuffledQuestions = retroquestions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    scoreElem.innerHTML = 0;
    setNextRetroQuestion()
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

function setNextQuestion() {
    timeLeft = timerReset;
    if (currentQuestionIndex >= 5) {
        easygameEnd()
    }
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    nextButton.addEventListener('click', resetTimer())
    highScoreElem.innerHTML = scoreElem.innerHTML;
}

function setNextRetroQuestion() {
    timeLeft = timerReset;
    if (currentQuestionIndex >= 5) {
        retrogameEnd()
    }
    resetState()
    showRetroQuestion(shuffledQuestions[currentQuestionIndex])
    nextButton.addEventListener('click', resetTimer())
    highScoreElem.innerHTML = scoreElem.innerHTML;
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

function showRetroQuestion(question) {
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
    } 
    redirectHome.classList.remove('hide')
    
}

function countdown() {
    elem.innerHTML = timeLeft + ' seconds remaining';
    if (timeLeft == 0) {
        elem.innerHTML = 'Ran out of time!'
        currentQuestionIndex++
        setTimeout(setNextQuestion,2000)
    }
    else{
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
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

function retrogameEnd(){
    questionContainerElement.classList.add('hide')
    highScoreElem.innerHTML = scoreElem.innerHTML;
}

function easygameEnd(){
    questionContainerElement.classList.add('hide')
    highScoreElem.innerHTML = scoreElem.innerHTML;
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

const retroquestions = [
    {
        question: 'Where is this?',
        image: '/static/images/retro/UCC Entrance Retro.jpg',
        answers: [
            { text: 'Blackpool', correct: false },
            { text: 'Franciscan Well', correct: false },
            { text: 'North Monastery School', correct: false },
            { text: 'UCC Entrance', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Youghal Retro.jpg',
        answers: [
            { text: 'Mallow', correct: false },
            { text: 'Bandon', correct: false },
            { text: 'Youghal', correct: true },
            { text: 'Douglas', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/The Lough Retro.jpg',
        answers: [
            { text: 'The Lough', correct: true },
            { text: 'Blackrock', correct: false },
            { text: 'The Lee Fields', correct: false },
            { text: 'Little Island', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/South Mall Retro.jpg',
        answers: [
            { text: 'South Mall', correct: true },
            { text: 'Dillons Cross', correct: false },
            { text: 'Oliver Plunkett St', correct: false},
            { text: 'Washington St', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Patricks Hill Retro.jpg',
        answers: [
            { text: 'Shandon St', correct: false },
            { text: 'Patricks Hill', correct: true },
            { text: 'Barrack St', correct: false },
            { text: 'Donovan Road', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Parnell Place Retro.jpg',
        answers: [
            { text: 'Mercy Hospital', correct: false },
            { text: 'Cork University Hospital', correct: false },
            { text: 'Mahon', correct: false},
            { text: 'Parnell Place', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Mercy Hospital Retro.jpg',
        answers: [
            { text: 'Mercy Hospital', correct: true },
            { text: 'Penrose Dock', correct: false },
            { text: 'Firkin Crane', correct: false},
            { text: 'Paul Street', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Lee Fields Retro.jpg',
        answers: [
            { text: 'Douglas River', correct: false },
            { text: 'The Lough', correct: false },
            { text: 'Lee Fields', correct: true},
            { text: 'Port of Cork', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Grande Parade Retro.jpg',
        answers: [
            { text: 'Merchants Quay', correct: false },
            { text: 'Lapps Quay', correct: false },
            { text: 'Patrick Street', correct: false},
            { text: 'Grande Parade', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Fr Matthew Quay.jpg',
        answers: [
            { text: 'Fr Matthew Quay', correct: true },
            { text: 'Popes Quay', correct: false },
            { text: 'Lower Glamire Road', correct: false},
            { text: 'Grande Parade', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Fitzgeralds Park Retro.jpg',
        answers: [
            { text: 'UCC Green', correct: false },
            { text: 'Fitzgeralds Park', correct: true},
            { text: 'St Finbars', correct: false},
            { text: 'St Annes', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Dominican Church Retro.jpg',
        answers: [
            { text: 'Shandon Bells', correct: false },
            { text: 'North Cathedral', correct: false },
            { text: 'Dominican Church', correct: true},
            { text: 'City Hall', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Brian Boru Bridge Retro.jpg',
        answers: [
            { text: 'Michael Collins Bridge', correct: false },
            { text: 'Brian Boru Bridge', correct: true },
            { text: 'North Gate Bridge', correct: false},
            { text: 'Nano Nagle Bridge', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Blackpool Retro.jpg',
        answers: [
            { text: 'Farrenree', correct: false },
            { text: 'Blackpool', correct: true },
            { text: 'Knocknaheeny', correct: false},
            { text: 'Mayfield', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Ballincollig Retro.jpg',
        answers: [
            { text: 'Jacobs Island', correct: false },
            { text: 'Shanakiel', correct: false },
            { text: 'Ballincollig', correct: true},
            { text: 'Wilton', correct: false }
        ]
    }
]
