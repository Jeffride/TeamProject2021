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

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
versusGamemode.addEventListener('click', versusGameStart)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    versusGamemode.classList.add('hide')
    showLeaderboard.classList.add('hide')
    gamemodeText.classList.add('hide')
    corkImage.classList.add('hide')
    userScore.classList.remove('hide')
    highScore.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}
function shuffleArray(questions){
    for (var i = questions.length - 1; i>0; i--){
        var j = Math.floor(Math.random() * i);
        var temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
    return questions;
}
function versusGameStart() {
    alert("Gamemode not completed yet")
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
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

function backToMenu(){
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

const questions = [
    {
        question: 'Where is this?',
        image: 'https://lh4.googleusercontent.com/-JDeboQvxeEc/T3INOjbbaNI/AAAAAAAABUA/P0CmMj9sJQ8/s640/DSC04794.JPG',
        answers: [
            { text: 'Shandon Street', correct: false },
            { text: 'Franciscan Well', correct: false },
            { text: 'University College Cork', correct: true },
            { text: 'Cork City Hall', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: 'https://b.dmlimg.com/MjM0MWViZTYxNzc4OTgwMmE4ZTdlYzE2NDNkYzIxNTYQjHVLOSwCDG6-Px35laK6aHR0cDovL3MzLWV1LXdlc3QtMS5hbWF6b25hd3MuY29tL21lZGlhbWFzdGVyLXMzZXUvOC8yLzgyNDFjYjRiMTRjZjkyNmQyMWRlMTRhNjE2MjBiOWNjLmpwZ3x8fDcwMGx8fHx8fHx8.jpg',
        answers: [
            { text: 'Douglas', correct: true },
            { text: 'Blackpool', correct: false },
            { text: 'Mayfield', correct: false },
            { text: 'Mallow', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: 'https://mm.aiircdn.com/157/179518.jpg',
        answers: [
            { text: 'South Mall', correct: false },
            { text: 'College Road', correct: false },
            { text: 'Patrick Street', correct: true },
            { text: 'North Cathedral', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/08/fc/38/0b/st-anne-s-shandon-church.jpg',
        answers: [
            { text: "Saint Fin Barre's", correct: false },
            { text: 'Shandon Bells', correct: true },
            { text: 'Holy Trinity', correct: false },
            { text: 'North Cathedral', correct: false }
        ]
    }, 
    {
        question: 'Where is this?',
        image: 'https://images.squarespace-cdn.com/content/v1/54a6fd18e4b0970e0f118b92/1505834199067-3KUUGUG7WVQXEJFLU6RU/ke17ZwdGBToddI8pDm48kJuI8p5FQJ1Eq-llLbNfaL4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcCca5qetNy8fW9VKAsZIuGiDiVgUjVhyhe0jAOzrfh8Y6LNbQCTpT_nm5zc2XNrT_/small+NICHE+Knocknaheeny.png?format=1500w',
        answers: [
            { text: 'Farrenree', correct: false },
            { text: 'Mahon Point', correct: false },
            { text: 'Wilton', correct: false },
            { text: 'Knockanaheeny', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: 'https://www.cork-guide.ie/assets/photos/fitzgeralds_park7.jpg',
        answers: [
            { text: 'Bishopstown Playground', correct: false },
            { text: 'Ballincollig Park', correct: false },
            { text: 'Tramore Valley Park', correct: false },
            { text: 'Fizgeralds Park', correct: true }
        ]
    },
    {
        question: 'Where is this?',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/01/08/93/df/st-patrick-s-hill-climbing.jpg',
        answers: [
            { text: 'Strawberry Hill', correct: false },
            { text: 'Shandon Street', correct: false },
            { text: 'Patricks Hill', correct: true },
            { text: 'Dublin Hill', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: 'https://i.pinimg.com/originals/f7/b9/1c/f7b91cbc9b95df42eb5e8eed0505e9ae.jpg',
        answers: [
            { text: 'Kinsale', correct: false },
            { text: 'Cork Docklands', correct: false },
            { text: 'Cobh', correct: true },
            { text: 'Youghal', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: 'https://photos-a.propertyimages.ie/media/9/6/1/3805169/88ae7ed6-975a-4e48-9a7d-258c3787d8d6_l.jpg',
        answers: [
            { text: 'Blackpool', correct: true },
            { text: 'Douglas', correct: false },
            { text: 'Wilton', correct: false },
            { text: 'Little Island', correct: false }
        ]
    },
    {
        question: 'Where is this?',
        image: 'https://www.gpsmycity.com/img/gd_attr/56514.jpg',
        answers: [
            { text: 'Old Oak', correct: false },
            { text: 'The Oval', correct: true },
            { text: 'Cissie Youngs', correct: false },
            { text: 'The Rock', correct: false }
        ]
    }
]
