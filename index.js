'use strict';

let questionNumber = 0;
let score = 0;

const QAs = [
  {
    question: "What does kerning mean?", 
    answers: ["the space between words", "the space between letters", "the space between lines", "the central kernel of your design"],
    correctAnswer: "the space between letters"
  },
  {
    question: "Which is NOT a proper file format for raster art?", 
    answers: ["TIFF", "JPG", "EPS", "SVG"], 
    correctAnswer: "SVG"
    },
  {
    question: "What does K in CMYK mean?", 
    answers: ["key", "kit", "kick", "kerning"], 
    correctAnswer: "key"
  },
  {
    question: "Which color space should you design something for print?", 
    answers: ["RGB", "LAB", "CMYK", "gray scale"], 
    correctAnswer: "CMYK"
  },
  {
    question: "What does leading mean?", 
    answers: ["the space between words", "the space between letters", "the space between lines", "when you're design is the leader"],
    correctAnswer: "the space between lines"
  },
  {
    question: "How many fonts should you use in a design?", 
    answers: ["only one", "three or less", "as many as you want", "five"], 
    correctAnswer: "three or less"
  },
  {
    question: "Which font is a serif font?", 
    answers: ["Arial", "Gotham", "Helvetica", "Times New Roman"], 
    correctAnswer: "Times New Roman"
  },
  {
    question: "Which program is best suited to create Vector art?", 
    answers: ["Illustrator", "Photoshop", "Dreamweaver", "Indesign"], 
    correctAnswer: "Illustrator"
  },
  {
    question: "Which term describes how much gray is in a color?", 
    answers: ["hue", "alpha", "saturation", "luminosity"], 
    correctAnswer: "saturation"
  },  
  {
    question: "What is the primary goal of a graphic designer?", 
    answers: ["to design something unique", "to typeset", "to communicate a message effectively", "to design something beautiful"], 
    correctAnswer: "to communicate a message effectively"
  }  
];

//Get the total number of questions
Object.size = function(obj) {
 //   var size = 0, key;
 //   for (key in obj) {
 //       if (obj.hasOwnProperty(key)) size++;
 //   }
    return (QAs.length);
   // return size;
};



let numQs = Object.size(QAs); 


function renderQuestions(qn) {
  let newHtml=""
  for (let i=0; i<(QAs[qn].answers.length); i++) {
    newHtml = newHtml+(`
      <div class="col-6">
        <label class="container">
          <input type="radio" name="answerOption" required value="${QAs[qn].answers[i]}">
            ${QAs[qn].answers[i]}
          </input>
          <span class="checkmark"></span>
        </label>
      </div>`); 
  }
  let returnHtml = `
      <form name="js-quiz" id="js-quiz" action="">
        <div class="qandabox row">
          <div class="col-6 column question left">
            <p>${QAs[qn].question}</p>
          </div>
          <div class="col-6 column right">
            <div class="row">`+newHtml+`
              <div class="col-6">
                <button type="submit" value="Submit Answer" class="button submitanswer"><span>Submit</span></input>
              </div>
            </div>  
          </div>   
        </div>   
      </form>`;
    return returnHtml;
}

//update function
function updateOutput(htmlSelection, item) {
    return $(htmlSelection).html(item);
}

//increment function
function handleIncrement(item) {
  let i = item;
  i = i+1;
  return i;
}

//increment score number and update html output
function handleScore() {
  score = handleIncrement(score);
  updateOutput(".score", score); //or $(".score").text(score); works
}

//increment question number and update html output
function handleQuestionNumber() {
  questionNumber = handleIncrement(questionNumber);
  updateOutput(".questionNumber", questionNumber);
}

//handle num of qs to go on score and question (2/10(10 or however many Qs))
function handleNumQs() {
  updateOutput(".numQs", numQs);
}


function handleStartButton() {
    $('.mainArea').on('click', '#js-start-Button', function (event) {
      handleQuestionNumber();
      updateOutput(".mainArea", (renderQuestions(questionNumber-1)));
      });
}

function handleNextQuestion () {
  $('.mainArea').on('click', '#js-next-question', function (event) {
    if (questionNumber < numQs){  //or QAs.length works
      handleQuestionNumber();
      updateOutput(".mainArea", (renderQuestions(questionNumber-1)));  
    }
    else {
      generateResults();
    }
  });
}

function handleSubmitAnswer() {    
  $('.mainArea').submit('.submitButton', function(event) {
    event.preventDefault();
    let userAnswer = checkAnswer();
    if (userAnswer === true) {
      handleScore();
      generateCorrectFeedback();
    }
    else {
      generateWrongFeedback();
    }
  });
}

function checkAnswer() {
  if (($('input[name=answerOption]:checked').val()) === (QAs[questionNumber-1].correctAnswer)) {
    return true;
  }
  else {
    return false;
  }
}

function generateCorrectFeedback(){
  let cfeedback = "<p>Awesome job... you are correct!</p><button id=\"js-next-question\" class=\"button\"><span>Next</span></button>";
     $( ".mainArea" ).html(cfeedback);
}

function generateWrongFeedback(){
  let wfeedback = "<p>Wrong answer. The correct answer is "+(QAs[questionNumber-1].correctAnswer)+".</p><button id=\"js-next-question\" class=\"button\"><span>Next</span></button>";
     $( ".mainArea" ).html(wfeedback);
}

function generateResults() {
  let finalScore = (score/numQs)*100;
  let final="";
  if (finalScore < 50) {
    final = final+"Nice try but keep studying."
  }
  else if (finalScore > 100) {
    final = final+"Perfect score! You've got the knowledge to be a fantastic designer!"
  }    
  else {
    final = final+"Not perfect but great job!"
  }  
  let results = " You got "+score+" out of "+numQs+" questions.<br/> "+final+"<br/><button id=\"js-restart-button\" class=\"button\"><span>Restart Quiz</span></button>";
  updateOutput(".mainArea", results);
}

function handleRestartButton() {
    $('.mainArea').on('click', '#js-restart-button', function (event) {
      score = 0;
      questionNumber = 0;
      updateOutput(".score", score);
      updateOutput(".questionNumber", questionNumber);
      generateStartingHTML();
     });    
}

function generateStartingHTML(){
  let startingHTML = `<p>Got the basics down to make a great designer? Let's find out!</p>
        <button type="button" id="js-start-Button" class="button center" style="vertical-align:middle"><span>Start Quiz</span></button>`;
     $( ".mainArea" ).html(startingHTML);
}




//callback function for app's document ready
function handleQuiz() {
  generateStartingHTML();
  handleStartButton();
  handleSubmitAnswer();
  handleNextQuestion();
  handleNumQs();
  handleRestartButton();
};

//when the page loads, call `handleQuiz`
$(handleQuiz);

