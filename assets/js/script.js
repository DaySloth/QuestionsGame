var startButton = document.querySelector("#start-btn");
var questionElement = document.querySelector("#question");
var startElement = document.querySelector("#start-page");
var h1Tag = document.querySelector("#h1Tag");
var selectionDiv = document.querySelector("#selectionDiv");
var messageDiv = document.createElement("div");
messageDiv.setAttribute("id", "msg");
var timerEl = document.querySelector("#timer");
var highscoreInput = document.createElement("input");
var submitBtn = document.createElement("button");
var scoreEl = document.createElement("h3");



var questionValues = [
    {
        question: "What is Dwights middle name?",
        buttons: ["Kurt", "Tanner", "Liam", "Fart"],
        answer: 0,
    },
    {
        question: "Why did Jim get a haircut?",
        buttons: ["He needed one", "Dwight made fun of him", "Karen said he looked homeless", "Pam said he would look cute"],
        answer: 2,
    },
    {
        question: "What kind of Christmas party did Michael throw for Holley when she came back?",
        buttons: ["Regular Christmas", "Classy Christmas", "Nutcracker Christmas", "Dutch Christmas"],
        answer: 1,
    },
    {
        question: "D",
        buttons: ["Yes", "No", "HELL YEA"],
        answer: 2,
    },
];

var questionOrder = [0, 1, 2, 3, "end"];
var num;

var timerInterval;
var secondsLeft = 60;

var score = 0;

//removes the question from the landing page
questionElement.setAttribute("class", "hide");


startButton.addEventListener("click", startGame);


function startGame(){
    startElement.setAttribute("class", "hide");
    questionElement.setAttribute("class", "show");
    questionElement.setAttribute("class", "container");
    pickQuestion();
    createQuestion(questionValues[num]);
    setTime();
};

function createQuestion(index){
    h1Tag.textContent = index.question;
    for(var i = 0; i < index.buttons.length; i++){
        var buttons = document.createElement("button");
        buttons.textContent = index.buttons[i];
        buttons.setAttribute("data-index", i);
        selectionDiv.appendChild(buttons);
    }
    selectionDiv.appendChild(messageDiv);
};

function displayMessage(type, message) {
    messageDiv.textContent = message;
    messageDiv.setAttribute("class", type);
}


selectionDiv.addEventListener("click", function(){
    var element = event.target;

    if (element.matches("button")){
        var index = element.getAttribute("data-index");
        if(index == questionValues[num].answer){
            displayMessage("success", "Correct");
            score = score + 10;
        } else {
            displayMessage("error", "Wrong");
            score = score - 10;
            secondsLeft = secondsLeft - 10;
        }
        selectionDiv.innerHTML = "";
        pickQuestion();
        console.log("num= "+ num)
        createQuestion(questionValues[num]);
    }
});

function pickQuestion(){
    num = questionOrder.shift();
    if (num == "end"){
        endGame();
    }
    console.log(questionOrder);
};

function setTime(){
        timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            alert("You have failed the test")
            endGame();
        }
    }, 1000);
}

function endGame(){
    clearInterval(timerInterval);
    selectionDiv.innerHTML = "";
    h1Tag.textContent = "End Game";

    highscoreInput.setAttribute("type", "text");
    highscoreInput.setAttribute("name", "highscore");
    highscoreInput.setAttribute("id", "highscoreInput");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "submitBtn");
    submitBtn.textContent = "Submit";
    scoreEl.textContent = "Your score this round: " + score;
    
    selectionDiv.appendChild(highscoreInput);
    selectionDiv.appendChild(submitBtn);
    selectionDiv.appendChild(scoreEl);
    selectionDiv.appendChild(messageDiv);
};

selectionDiv.addEventListener("click", function(){
    var element = event.target;

    if (element.matches("button")){
        var id = element.getAttribute("id");
        if(id == "submitBtn"){
            if(highscoreInput.value == ""){
                displayMessage("error", "Name Cannot be Blank");
            } else {
                localStorage.setItem("name", highscoreInput.value);
                localStorage.setItem("score", score);
                localStorage.setItem("timeRemaining", secondsLeft);
                displayMessage("success", "Info Saved");
            }
        }
    }
});
