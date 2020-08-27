var startButton = document.querySelector("#start-btn");
var questionElement = document.querySelector("#question");
var startElement = document.querySelector("#start-page");


//removes the question from the landing page
questionElement.setAttribute("class", "hide");


startButton.addEventListener("click", startGame);


function startGame(){
    startElement.setAttribute("class", "hide");
    questionElement.setAttribute("class", "show");
    questionElement.setAttribute("class", "container");
}