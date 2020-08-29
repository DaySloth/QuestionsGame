var highscoresDiv = document.getElementById("highscoresDiv");
var newScore = document.createElement("div");

var scoreList = [];

renderScores();



function renderScores(){
    var storedScores = JSON.parse(localStorage.getItem("list"));
    scoreList = storedScores;
    highscoresDiv.innerHTML = "";

    for (var i = 0; i < scoreList.length; i++){
        var userName = document.createElement("h5");
        var userScore = document.createElement("p");
        var timeRemain = document.createElement("p");

        var name = scoreList[i].name;
        var score = scoreList[i].score;
        var timeRemaining = scoreList[i].timeRemaining;
        highscoresDiv.appendChild(newScore);
        userName.textContent = "User: " + name;
        userScore.textContent = "Score: " + score;
        timeRemain.textContent = "Time Remaining: " + timeRemaining;
        newScore.appendChild(userName);
        newScore.appendChild(userScore);
        newScore.appendChild(timeRemain);
        newScore.appendChild(document.createElement("hr"));
    }
}