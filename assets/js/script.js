// global variables to be called on
var startButton = document.querySelector("#start-btn");
var questionElement = document.querySelector("#question");
var startElement = document.querySelector("#start-page");
var h2Tag = document.querySelector("#h2Tag");
var selectionDiv = document.querySelector("#selectionDiv");
var messageDiv = document.createElement("div");
messageDiv.setAttribute("id", "msg");
var timerEl = document.querySelector("#timer");
var highscoreInput = document.createElement("input");
var submitBtn = document.createElement("button");
var scoreEl = document.createElement("h3");
//scores variables for local storage
var highscoresList = [];
var scoresObj;
//question objects to choose from
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
        question: "How did Michael propose to Holley?",
        buttons: ["With Candles", "With Gasoline", "With Food", "By taking her to Jamaica"],
        answer: 0,
    },
    {
        question: "What is Jan's daughter's name?",
        buttons: ["Paige", "Ruth", "Hailey", "Astrid"],
        answer: 3,
    },
];
//question order variables and num variable to be called on to select question
var questionOrder = [1, 0, 3, 4, 2, "end"];
var num;
//timer variables
var timerInterval;
var secondsLeft = 60;
//score variable for the end score
var score = 0;

//removes the question from the landing page
questionElement.setAttribute("class", "hide");

//event listener for starting the game
startButton.addEventListener("click", startGame);

//starts game, Hides the landing page and shows the first question
function startGame(){
    startElement.setAttribute("class", "hide");
    questionElement.setAttribute("class", "show");
    questionElement.setAttribute("class", "container");
    selectionDiv.setAttribute ("class", "btn-group-vertical");
    pickQuestion();
    createQuestion(questionValues[num]);
    setTime();
};

//creates question using inputs from the script
function createQuestion(index){
    h2Tag.textContent = index.question;
    for(var i = 0; i < index.buttons.length; i++){
        var buttons = document.createElement("button");
        buttons.textContent = index.buttons[i];
        buttons.setAttribute("data-index", i);
        buttons.setAttribute("class", "btn btn-outline-dark")
        selectionDiv.append(buttons);
    }
    selectionDiv.appendChild(messageDiv);
};

//message display for errors/success messages
function displayMessage(type, message) {
    messageDiv.textContent = message;
    messageDiv.setAttribute("class", type);
}

//listener if you are clicking an answer button
selectionDiv.addEventListener("click", function(){
    var element = event.target;

    if (element.matches("button")){
        //adds data-index for answer checking
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
        //picks a question
        pickQuestion();
        //uses that picked question for the next question to pop up
        createQuestion(questionValues[num]);
    }
});

//picks out the questions from the array
function pickQuestion(){
    //selects question index and deletes from array
    num = questionOrder.shift();
    if (num == "end"){
        endGame();
    }
};

//sets the timer for game
function setTime(){
        timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if(secondsLeft > 30){
            timerEl.setAttribute("class", "green-time");
        } else if(secondsLeft < 15) {
            timerEl.setAttribute("class", "red-time blinking");
        } else {
            timerEl.setAttribute("class", "red-time");
        }


        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            alert("You have ran out of time");
            endGame();
        }
    }, 1000);
}

//runs the end game function
function endGame(){
    //stops timer
    clearInterval(timerInterval);
    //clears display
    selectionDiv.innerHTML = "";
    //inputs all of the required html
    h2Tag.textContent = "End Game";
    var h3El = document.createElement("h3");
    h3El.textContent = "Input your name:";

    highscoreInput.setAttribute("type", "text");
    highscoreInput.setAttribute("name", "highscore");
    highscoreInput.setAttribute("id", "highscoreInput");
    highscoreInput.setAttribute("placeholder", "John Doe");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "submitBtn");
    submitBtn.setAttribute("class", "btn btn-info")
    submitBtn.textContent = "Submit";
    scoreEl.textContent = "Your score this round: " + score;
    messageDiv.textContent = "";
    //adds all elements to the page
    selectionDiv.append(h3El);
    selectionDiv.append(highscoreInput);
    selectionDiv.append(submitBtn);
    selectionDiv.append(scoreEl);
    selectionDiv.append(messageDiv);
};

//event listener for the submit button
selectionDiv.addEventListener("click", function(){
    var element = event.target;
    //checks if you are targeting a button
    if (element.matches("button")){
        //makes sure it is the submit button before doing any actions
        var id = element.getAttribute("id");
        if(id == "submitBtn"){
            //makes sure the users input is in
            if(highscoreInput.value == ""){
                //displays an error if there is no input
                displayMessage("error", "Name Cannot be Blank");
            } else {
                //stores the users scores
                scoresObj = {
                    name: highscoreInput.value,
                    score: score,
                    timeRemaining: secondsLeft,
                };
                displayMessage("success", "Info Saved");
                storeScore();
            }
        }
    }
});

//setting scores to be saved in local storage
function storeScore(){
    //grabs list in the storage
    if(JSON.parse(localStorage.getItem("list")) == null){
        highscoresList.push(scoresObj);
    } else {
        highscoresList = JSON.parse(localStorage.getItem("list"));
        console.log(highscoresList);
        //pushes the new users scores to the array
        highscoresList.push(scoresObj);
    }
    //sets the array back into local storage
    localStorage.setItem("list", JSON.stringify(highscoresList));
    console.log(highscoresList);
}



