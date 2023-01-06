// Generate global variables
const generateBtn = document.querySelector("#generate");
const buttonDiv = document.querySelector(".start-button");
let numberField = document.querySelector("#intro");
let questionField = document.querySelector("#instructions");
let optionsField = document.querySelector("#options");
let optionsList = document.querySelector("#options-list")
let questionNumber = 1;
let count = 0
let correct = 0
let done = false

// Generate timer vairable and set the time available
const timeElement = document.querySelector(".timer");
let secondsLeft = 60
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
    question: "Which pokemon can learn the move fly?", 
    options: ["Pikachu", "Bulbasaur", "Mew", "Vulpix"], 
    answer: "Mew" }
]

// Add event listener to button to start the quiz
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

    optionsList.innerHTML = ""

    numberField.textContent= `Question #${count+1}`;
    questionField.textContent = questionArray[count].question
    
    //Create an unordered list of buttons with the attribute response
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

function finish(){
  done = true
  buttonDiv.innerHTML = ""
  let form = document.createElement("form");
  let type = document.createElement("input");
  const submitBtn = document.createElement("input");

  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "Submit");
  // form.setAttribute("style", "padding: 5px")
  type.setAttribute("id", "initials")
  type.setAttribute("type", "text");

  form.appendChild(type);
  optionsField.appendChild(form);
  form.appendChild(submitBtn);

  optionsList.innerHTML = ""
  numberField.textContent= `You got ${correct}/3 correct. Congraguations!`;
  questionField.textContent = "Please enter your initials"
  submitBtn.addEventListener("click", submitScore)
  
}

function submitScore(){
  let score = []
  let initialField = document.querySelector("#initials").value;
  score = [{name: initialField, score: correct}]
  
  var leaderBoard = JSON.parse(localStorage.getItem("highScores"));
  if (leaderBoard === null){
    leaderBoard = []
  }

  leaderBoard.push(score)
  localStorage.setItem("highScores", JSON.stringify(leaderBoard));
  
  showHighScore(leaderBoard)
}


//Function to list the high scores
function showHighScore(leaderBoard){

}


