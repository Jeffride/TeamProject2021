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
const easyMode = document.getElementById('easy-mode')
const hardMode = document.getElementById('hard-mode')
const retroMode = document.getElementById('retro-mode')
const controls = document.getElementById('controls')
const containerElem = document.getElementById('container')
const userInfo = document.getElementById('user-info')
const timerElem = document.getElementById('question-timer')
const endButton = document.getElementById('endGame')
const submitButton = document.getElementById('submit')
const wrongAnswer = document.getElementById('wrong-answer')
let shuffledQuestions, currentQuestionIndex
var elem = document.getElementById('question-timer');
var timerReset = 20;
var timeLeft = 20;
var timer1;

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
    document.getElementById('endGame').setAttribute('onclick', "easygameEnd()")
    endButton.classList.remove('hide')
    showLeaderboard.classList.add('hide')
    corkImage.classList.add('hide')
    gamemodeText.classList.add('hide')
    easyMode.classList.add('hide')
    hardMode.classList.add('hide')
    retroMode.classList.add('hide')
    userScore.classList.remove('hide')
    elem.innerHTML = timerReset + " seconds remaining"
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    scoreElem.innerHTML = 0;
    setNextQuestion()
}

function pickRetroMode() {
    document.getElementById('endGame').setAttribute('onclick', "retrogameEnd()")
    endButton.classList.remove('hide')
    document.body.style.backgroundImage = "url('https://st.depositphotos.com/1022027/2484/i/950/depositphotos_24841573-stock-photo-old-newspaper-background.jpg')";
    containerElem.style.backgroundColor = "#a9a29e";
    timerElem.style.backgroundColor = "#477b65";
    userInfo.style.backgroundColor = "#477b65";
    showLeaderboard.classList.add('hide')
    corkImage.classList.add('hide')
    gamemodeText.classList.add('hide')
    easyMode.classList.add('hide')
    hardMode.classList.add('hide')
    retroMode.classList.add('hide')
    userScore.classList.remove('hide')
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
    nextButton.addEventListener('click', restart())
}

function setNextRetroQuestion() {
    timeLeft = timerReset;
    if (currentQuestionIndex >= 5) {
        retrogameEnd()
    }
    resetState()
    showRetroQuestion(shuffledQuestions[currentQuestionIndex])
    nextButton.addEventListener('click', restart())
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

function restart() {
    timer1 = setInterval(countdown, 900)
    answerButtonsElement.classList.remove('hide')
    wrongAnswer.classList.add('hide')
}

function selectAnswer(e) {
    clearInterval(timer1);
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    selectedButton.disabled = true;
    if (selectedButton){
        if (correct) {
            calculateScore()
        }
        else{
            answerButtonsElement.classList.add('hide')
            wrongAnswer.classList.remove('hide')
            wrongAnswer.innerHTML = "That answer was incorrect, better luck next time!"
        }
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }
    redirectHome.classList.remove('hide')
    document.getElementById("endGame").style.display="block";

}

function countdown() {
    elem.innerHTML = timeLeft + ' seconds remaining';
    if (timeLeft == 0) {
        elem.innerHTML = 'Ran out of time!'
        currentQuestionIndex++
        setTimeout(setNextQuestion, 2000)
    }
    else {
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
var endScore = 0;
var scoreElem = document.getElementById('new-score');
function calculateScore() {
    roundScore += timeLeft;
    scoreElem.innerHTML = roundScore + 1;
    endScore = roundScore;
}

function retrogameEnd() {
    questionContainerElement.classList.add('hide')
    var retroHighScore = endScore;
    document.getElementById("id_high_score").value = endScore+1;
    //Variable for leaderboard 
    document.getElementById("scoreform").style.display = "block";
    document.getElementById("id_high_score").value = retroHighScore;
    submitButton.classList.remove('hide')
}

function easygameEnd() {
    questionContainerElement.classList.add('hide')
    var easyHighScore = endScore;
    document.getElementById("id_high_score").value = endScore+1;
    //Variable for leaderboard 
    document.getElementById("scoreform").style.display = "block";
    document.getElementById("id_high_score").value = easyHighScore;
    submitButton.classList.remove('hide')
}

//PAGE LOADING INSTRUCTIONS
window.onload = function(){
    document.getElementById("endGame").style.display="none";
    var form = document.getElementById("scoreform");
    form.elements[1].readOnly = true;
}
const questions = [
    {
        question: 'Where is this?',
        image: '/static/images/easy/UCC.jpg',
        answers: [
            { text: 'Shandon Street', notcorrect: false },
            { text: 'Franciscan Well', notcorrect: false },
            { text: 'University College Cork', correct: true },
            { text: 'Cork City Hall', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/douglas.jpg',
        answers: [
            { text: 'Douglas', correct: true },
            { text: 'Blackpool', notcorrect: false },
            { text: 'Mayfield', notcorrect: false },
            { text: 'Mallow', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/patricksStreet.jpg',
        answers: [
            { text: 'South Mall', notcorrect: false },
            { text: 'College Road', notcorrect: false },
            { text: 'Patrick Street', correct: true },
            { text: 'North Cathedral', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/shandonBells.jpg',
        answers: [
            { text: "Saint Fin Barre's", notcorrect: false },
            { text: 'Shandon Bells', correct: true },
            { text: 'Holy Trinity', notcorrect: false },
            { text: 'North Cathedral', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/knocka.png',
        answers: [
            { text: 'Farrenree', notcorrect: false },
            { text: 'Mahon Point', notcorrect: false },
            { text: 'Wilton', notcorrect: false },
            { text: 'Knockanaheeny', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/fitzgeraldsPark.jpg',
        answers: [
            { text: 'Bishopstown Playground', notcorrect: false },
            { text: 'Ballincollig Park', notcorrect: false },
            { text: 'Tramore Valley Park', notcorrect: false },
            { text: 'Fizgeralds Park', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/patrickshill.jpg',
        answers: [
            { text: 'Strawberry Hill', notcorrect: false },
            { text: 'Shandon Street', notcorrect: false },
            { text: 'Patricks Hill', correct: true },
            { text: 'Dublin Hill', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/cobh.jpg',
        answers: [
            { text: 'Kinsale', notcorrect: false },
            { text: 'Cork Docklands', notcorrect: false },
            { text: 'Cobh', correct: true },
            { text: 'Youghal', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/blackpool.jpg',
        answers: [
            { text: 'Blackpool', correct: true },
            { text: 'Douglas', notcorrect: false },
            { text: 'Wilton', notcorrect: false },
            { text: 'Little Island', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/easy/oval.jpg',
        answers: [
            { text: 'Old Oak', notcorrect: false },
            { text: 'The Oval', correct: true },
            { text: 'Cissie Youngs', notcorrect: false },
            { text: 'The Rock', notcorrect: false }
        ]
    }
]

const retroquestions = [
    {
        question: 'Where is this?',
        image: '/static/images/retro/UCC Entrance Retro.jpg',
        answers: [
            { text: 'Blackpool', notcorrect: false },
            { text: 'Franciscan Well', notcorrect: false },
            { text: 'North Monastery School', notcorrect: false },
            { text: 'UCC Entrance', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Youghal Retro.jpg',
        answers: [
            { text: 'Mallow', notcorrect: false },
            { text: 'Bandon', notcorrect: false },
            { text: 'Youghal', correct: true },
            { text: 'Douglas', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/The Lough Retro.jpg',
        answers: [
            { text: 'The Lough', correct: true },
            { text: 'Blackrock', notcorrect: false },
            { text: 'The Lee Fields', notcorrect: false },
            { text: 'Little Island', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/South Mall Retro.jpg',
        answers: [
            { text: 'South Mall', correct: true },
            { text: 'Dillons Cross', notcorrect: false },
            { text: 'Oliver Plunkett St', notcorrect: false },
            { text: 'Washington St', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Patricks Hill Retro.jpg',
        answers: [
            { text: 'Shandon St', notcorrect: false },
            { text: 'Patricks Hill', correct: true },
            { text: 'Barrack St', notcorrect: false },
            { text: 'Donovan Road', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Parnell Place Retro.jpg',
        answers: [
            { text: 'Mercy Hospital', notcorrect: false },
            { text: 'Cork University Hospital', notcorrect: false },
            { text: 'Mahon', notcorrect: false },
            { text: 'Parnell Place', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Mercy Hospital Retro.jpg',
        answers: [
            { text: 'Mercy Hospital', correct: true },
            { text: 'Penrose Dock', notcorrect: false },
            { text: 'Firkin Crane', notcorrect: false },
            { text: 'Paul Street', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Lee Fields Retro.jpg',
        answers: [
            { text: 'Douglas River', notcorrect: false },
            { text: 'The Lough', notcorrect: false },
            { text: 'Lee Fields', correct: true },
            { text: 'Port of Cork', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Grande Parade Retro.jpg',
        answers: [
            { text: 'Merchants Quay', notcorrect: false },
            { text: 'Lapps Quay', notcorrect: false },
            { text: 'Patrick Street', notcorrect: false },
            { text: 'Grande Parade', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Fr Matthew Quay.jpg',
        answers: [
            { text: 'Fr Matthew Quay', correct: true },
            { text: 'Popes Quay', notcorrect: false },
            { text: 'Lower Glamire Road', notcorrect: false },
            { text: 'Grande Parade', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Fitzgeralds Park Retro.jpg',
        answers: [
            { text: 'UCC Green', notcorrect: false },
            { text: 'Fitzgeralds Park', correct: true },
            { text: 'St Finbars', notcorrect: false },
            { text: 'St Annes', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Dominican Church Retro.jpg',
        answers: [
            { text: 'Shandon Bells', notcorrect: false },
            { text: 'North Cathedral', notcorrect: false },
            { text: 'Dominican Church', correct: true },
            { text: 'City Hall', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Brian Boru Bridge Retro.jpg',
        answers: [
            { text: 'Michael Collins Bridge', notcorrect: false },
            { text: 'Brian Boru Bridge', correct: true },
            { text: 'North Gate Bridge', notcorrect: false },
            { text: 'Nano Nagle Bridge', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Blackpool Retro.jpg',
        answers: [
            { text: 'Farrenree', notcorrect: false },
            { text: 'Blackpool', correct: true },
            { text: 'Knocknaheeny', notcorrect: false },
            { text: 'Mayfield', notcorrect: false }
        ]
    },
    {
        question: 'Where is this?',
        image: '/static/images/retro/Ballincollig Retro.jpg',
        answers: [
            { text: 'Jacobs Island', notcorrect: false },
            { text: 'Shanakiel', notcorrect: false },
            { text: 'Ballincollig', correct: true },
            { text: 'Wilton', notcorrect: false }
        ]
    }
]

var object = document.getElementById('geotag');

object.onclick=function(){
  var x = Math.floor(Math.random()*300);
  var y = Math.floor(Math.random()*300);
  object.style.top = x + 'px';
  object.style.left = y + 'px';
};
