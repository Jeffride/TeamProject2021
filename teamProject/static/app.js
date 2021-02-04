/*Setting variables to be able to manipulate the html structure when running JavaScript functions*/ 
const soloGamemode = document.getElementById('solo-btn')
/*const loginButton = document.getElementById('login-btn')
const loginContainer = document.getElementById('login')*/
const versusGamemode = document.getElementById('versus-btn')
const showLeaderboard = document.getElementById('leaderboard-btn')
const nextButton = document.getElementById('next-btn')
const corkImage = document.getElementById('myImg')
const containerElement = document.getElementById('container')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const questionImage = document.getElementById('question-image')
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex
/*loginButton.addEventListener('click', loginSystem)*/
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
soloGamemode.addEventListener('click', startGame)
versusGamemode.addEventListener('click', versusGameStart)
showLeaderboard.addEventListener('click', displayLeaderboard)

/*When the user registers and logs into the system, this menu should disapper 
and another menu for selecting the gamemode should appear*/
/*function loginSystem() {
    loginButton.classList.add('hide')
    containerElement.classList.remove('hide')
    soloGamemode.classList.remove('hide')
    versusGamemode.classList.remove('hide')
    showLeaderboard.classList.remove('hide')
}

/*When the solo gamemode is selected it will randomly select a question for the user to answer,
this will include an image from Google Streetview of a Cork landmark and 4 answers in which 1 is
correct, once an answer is selected the user moves onto another question and so on.*/
function startGame() {
    soloGamemode.classList.add('hide')
    corkImage.classList.add('hide')
    versusGamemode.classList.add('hide')
    showLeaderboard.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

/*This gamemode is still in development*/ 
function versusGameStart() {
    alert("Versus Gamemode Still in progress!")
}

/*This gamemode is still in development*/ 
function displayLeaderboard() {
    alert("Leaderboard Still in progress!")
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

/*Set the question from each round to match up to what has been chosen from the array*/
function showQuestion(question) {
    questionElement.innerText = question.questionCaption
    questionImage.src = question.image
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

/*This function resets if the answer was marked as "Correct" or "Wrong" when moving onto the
next question*/
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

/*When the user is selecting an answer for the questions, it checks the array to see if
it has been marked as "Correct", once it reaches the end of the questions a reset button will appear 
to bring the user back to the first question*/
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        soloGamemode.innerText = 'Restart'
        soloGamemode.classList.remove('hide')
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

const questions = [
    {
        questionCaption: 'Where is this?',
        image: 'https://lh4.googleusercontent.com/-JDeboQvxeEc/T3INOjbbaNI/AAAAAAAABUA/P0CmMj9sJQ8/s640/DSC04794.JPG',
        answers: [
            { text: 'Shandon Street', correct: false },
            { text: 'Franciscan Well', correct: false },
            { text: 'University College Cork', correct: true },
            { text: 'Cork City Hall', correct: false }
        ]
    },
    {
        questionCaption: 'Where is this?',
        image: 'https://mm.aiircdn.com/157/179518.jpg',
        answers: [
            { text: 'South Mall', correct: false },
            { text: 'College Road', correct: false },
            { text: 'Grand Parade', correct: true },
            { text: 'North Cathedral', correct: false }
        ]
    },
    {
        questionCaption: 'Where is this?',
        image: 'https://www.gpsmycity.com/img/gd_attr/56514.jpg',
        answers: [
            { text: 'Old Oak', correct: false },
            { text: 'The Oval', correct: true },
            { text: 'Cissie Youngs', correct: false },
            { text: 'The Rock', correct: false }
        ]
    }
]