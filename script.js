// Generate global variables
const generateBtn = document.querySelector("#generate");
const buttonDiv = document.querySelector(".start-button");
const highScoreBtn = document.querySelector("#high-score")
let numberField = document.querySelector("#intro");
let questionField = document.querySelector("#instructions");
let optionsField = document.querySelector("#options");
let optionsList = document.querySelector("#options-list")
let viewScores = document.querySelector(".view")
let scoreList = document.querySelector("#score-list")
let questionNumber = 1;
let count = 0
let correct = 0
let done = false
var leaderBoard = []




// Generate timer vairable and set the time available
const timeElement = document.querySelector(".timer");
let secondsLeft = 5
timeElement.textContent = secondsLeft + " seconds";

// An array of objects detailing the questions, options, and answers
const questionArray = [
  {
    question: "What is the first Pokemon in the Kanto Pokedex?", 
    options: ["Pikachu", "Bulbasaur", "Mew", "Vulpix"], 
    answer: "Bulbasaur" },
  
  {
  question: "What is the last Pokemon in the Kanto Pokedex?", 
  options: ["Pikachu", "Bulbasaur", "Mew", "Vulpix"], 
  answer: "Mew" },

  {
    question: "Which pokemon can learn the move Fly?", 
    options: ["Pikachu", "Bulbasaur", "Mew", "Vulpix"], 
    answer: "Mew" }
]

//When on the main page you can either start the quiz, or view the high score page
highScoreBtn.addEventListener("click", showHighScore);
generateBtn.addEventListener("click", startQuiz);

// Start the quiz and the timer
function startQuiz() {
  timer()
  questionGeneration()
  buttonDiv.innerHTML = ""
  checkAnswer()
}

// This function starts the timer counting down
function timer(){
  var countdown = setInterval(function() {
    
    secondsLeft--;
    timeElement.textContent = secondsLeft + " seconds remaining";
    
    if(secondsLeft < 1) {
      clearInterval(countdown);
      if (done === false){
        finish()
      }
    }
  }, 1000);
}

//This will display each new questions and the answers
function questionGeneration(questionNumber){
  if (count+1 <= questionArray.length){
    //Clear previous elements
    scoreList.innerHTML = ""
    optionsList.innerHTML = ""

    numberField.textContent= `Question #${count+1}`;
    questionField.textContent = questionArray[count].question
    
    //Create an unordered list of buttons with the attribute 'response'
    questionArray[count].options.forEach(function (option, idx){
      let li = document.createElement("li");
      let button = document.createElement("button");

      button.setAttribute("response", questionArray[count].options[idx]);
      button.textContent = questionArray[count].options[idx];

      li.appendChild(button);
      optionsList.appendChild(li);
    })
  } else {
    finish()
  }
}

function checkAnswer(){
  optionsList.addEventListener("click", function(event){
    if (event.target.matches("button")){
      if (event.target.getAttribute('response') === questionArray[count].answer){
        rightAnswer()
      } else{
        wrongAnswer()
      }
    }
  })
}

// This funciton will run if the user gets a question right
function rightAnswer(){
  count++
  correct++
  buttonDiv.textContent = "Correct!"
  questionGeneration()
}

// This function will run if the user gets a question wrong
function wrongAnswer(){
  secondsLeft = secondsLeft - 10;
  count++
  buttonDiv.textContent = "Incorrect"
  questionGeneration()
}

//Display score and let user type initials
function finish(){
  done = true
  let form = document.createElement("form");
  let type = document.createElement("input");
  const submitBtn = document.createElement("input");
  buttonDiv.innerHTML = ""
  optionsList.innerHTML = ""

  //Create submit button and text field for user to iput initials
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "Submit");
  // form.setAttribute("style", "padding: 5px")
  type.setAttribute("id", "initials")
  type.setAttribute("type", "text");

  form.appendChild(type);
  optionsField.appendChild(form);
  form.appendChild(submitBtn);
  

  numberField.textContent= `You got ${correct}/3 correct. Congraguations!`;
  questionField.textContent = "Please enter your initials"

  submitBtn.addEventListener("click", submitScore)

}

//Pull scores from local storage, add new score and restore new scores
function submitScore(event){
  event.preventDefault();
  let score = {};
  let initialField = document.querySelector("#initials").value;
  score = {name: initialField, score: correct};
  
  leaderBoard = JSON.parse(localStorage.getItem("highScores"));
  if (leaderBoard === null){
    leaderBoard = []
  };

  leaderBoard.push(score);
  localStorage.setItem("highScores", JSON.stringify(leaderBoard));
  
  showHighScore();
}


//Pull up an ordered list of the high scores
function showHighScore(leaderBoard){
  leaderBoard = JSON.parse(localStorage.getItem("highScores"));
  if (leaderBoard === null){
    leaderBoard = []
  }

  console.log(leaderBoard)

  //Clear previous content
  numberField.textContent = "High Scores"
  questionField.innerHTML = ""
  viewScores.innerHTML = ""
  optionsField.innerHTML = ""

  //Recreate Start Button --- This is a mess. I know this is a mess. It's because earlier I was trying to do everything with the HTML elements I already had instead of just making new ones for all of my new things I wanted to appear.
  buttonDiv.innerHTML = ""
  generateBtn.setAttribute("id", "start");
  generateBtn.setAttribute("class", "btn");
  generateBtn.textContent = "Play again?";
  buttonDiv.appendChild(generateBtn);

  console.log(leaderBoard.name)

  //Create Start Button
  const resetBtn = document.createElement("button");
  resetBtn.setAttribute("id", "reset");
  resetBtn.setAttribute("class", "btn");
  resetBtn.textContent = "Reset High Scores";
  buttonDiv.appendChild(resetBtn);

  //Display high scores
  leaderBoard.forEach(function(score, i){
    let liTag = document.createElement("li");
    let pTag = document.createElement("p");
    scoreList.appendChild(liTag)
    liTag.appendChild(pTag)
    pTag.textContent = `${leaderBoard[i]}, ${i}`
  })


  
  //Reset button
  resetBtn.addEventListener("click", function(){
    console.log(leaderBoard)
    leaderBoard = []
    localStorage.setItem("highScores", JSON.stringify(leaderBoard));
  })
}


//Color on ul will cascade down

  // leaderBoard.sort(function(object1, object2){
  //   (a.score > b.score) ? 1 : -1
  // })
  // list.sort((a, b) => (a.color > b.color) ? 1 : -1)