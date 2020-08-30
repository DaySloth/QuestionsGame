// Setting Global variables to be called
var highscoresDiv = document.getElementById("highscoresDiv");
var newScore = document.createElement("div");
var scoreCard = document.createElement("div");
scoreCard.setAttribute("class", "score-card");
//empty array to input local storage objects
var scoreList = [];
//running function on site to load in the scores
renderScores();



function renderScores(){
    //grabs scores from storage and inputs to the array
    var storedScores = JSON.parse(localStorage.getItem("list"));
    console.log(storedScores);
    scoreList = storedScores;
    highscoresDiv.innerHTML = "";
    //checks if user has stored scores
    if(storedScores === null){
        // if not then it will display no scores
        var noScores = document.createElement("h5");
        noScores.textContent = "No Scores Stored";
        highscoresDiv.appendChild(noScores);
    // if they do have scores it will run a for loop
    } else {
        // runs through the array that was just filled and inputs scores to the screen
        for (var i = 0; i < scoreList.length; i++){
            var userName = document.createElement("h5");
            var userScore = document.createElement("p");
            var timeRemain = document.createElement("p");

            var name = scoreList[i].name;
            var score = scoreList[i].score;
            var timeRemaining = scoreList[i].timeRemaining;
            userName.textContent = "User: " + name;
            userScore.textContent = "Score: " + score;
            timeRemain.textContent = "Time Remaining: " + timeRemaining;
            if(timeRemaining < 30){
                timeRemain.setAttribute("class", "red-time");
            } else {
                timeRemain.setAttribute("class", "green-time");
            }
            newScore.appendChild(userName);
            newScore.appendChild(userScore);
            newScore.appendChild(timeRemain);
            newScore.appendChild(document.createElement("hr"));
            highscoresDiv.appendChild(newScore);
        }
    }
}