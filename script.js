var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");
 
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");



var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("initialDiv");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");



startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);


function newQuiz() {
    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};



function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}


function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
       
        correctAns++;
        
        answerCheck.textContent = "Correct!";
    } else {
    
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

   
    finalScore.textContent = correctAns;
}
viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});


function storeHighScores(event) {
    event.preventDefault();

   
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    
    showHighScores();
}
submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");


    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}
clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});



const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["a. Home Tool Markup", "b. Hyperlinks and Text Markup Tool", "c. None", "d. Hyper Text Markup Language"],
        answer: "d. Hyper Text Markup Language"
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        choices: ["a. P", "b. H6", "c. H1", "d. Heading"],
        answer: "c. H1"
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        choices: ["a. Break", "b. Br", "c. lb", "d. None"],
        answer: "b. Br"
    },
    {
        question: "Choose the correct HTML element to define important text",
        choices: ["a. bold", "b. important", "c. strong", "d. b"],
        answer: "c. strong"
    },
    {
        question: "Which character is used to indicate an end tag?",
        choices: ["a. <", "b. /", "c. *", "d. ^"],
        answer: "b. /"
    },
    {
        question: "How are comments made in html",
        choices: ["a. //", "b. ---", "c. <!---->", "d. none"],
        answer: "c. <!---->"
    },
    {
        question: "Which HTML element is used to specify a header for a document or section? ",
        choices: ["a. head", "b. header", "c. body", "d. nav"],
        answer: "b. header"
    },
    {
        question: "How can you make a numbered list?",
        choices: ["a. ol", "b. list", "c. ul", "d. dl"],
        answer: "a. ol"
    },
    {
        question: "What is the correct HTML for making a text input field?",
        choices: ["a. textfield", "b. input type=textfield", "c. input type=text", "d. textinput type=text"],
        answer: "c. input type=text"
    },
    {
        question: "What is the correct HTML for making a drop-down list?",
        choices: ["a. list", "b. input type=dropdown", "c. select", "d. input type=list"],
        answer: "c. select"
    },
    
];



var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;
var totalTime = 151;