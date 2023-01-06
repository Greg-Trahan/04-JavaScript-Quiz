// Generate global variables
const generateBtn = document.querySelector("#generate");
const buttonDiv = document.querySelector(".start-button");
let numberField = document.querySelector("#intro");
let questionField = document.querySelector("#instructions");
let optionsField = document.querySelector("#options");
let optionsList = document.querySelector("#options-list")
let questionNumber = 1;
let count = 0

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
  //Open first question at question 1
}

// This function starts the timer counting down
function timer(){
  var countdown = setInterval(function() {
    
    secondsLeft--;
    timeElement.textContent = secondsLeft + " seconds remaining";
    
    if(secondsLeft < 0) {
      clearInterval(countdown);
      //When timer hits 0 take to to scorepage
    }

  }, 1000);
}

//This will display each new questions and the answers
function questionGeneration(questionNumber){
  console.log(count)
  console.log(questionArray.length)
  if (count+1 <= questionArray.length){

    //Clear previous elements
    buttonDiv.innerHTML = ""
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

    checkAnswer()
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
  buttonDiv.innerHTML = ""
  optionsList.innerHTML = ""

  numberField.textContent= `You got ${count+1}/10 correct`;
  questionField.textContent = "Please enter your initials"
}

//Function to list the high scores
function showHighScore(){
  scores = [
    {name: "Gary", score: 50},
    {name: "Gary", score: 50},
    {name: "Gary", score: 50},
    {name: "Gary", score: 50}
  ]
  //Store as a string
  //Parse and display
}


