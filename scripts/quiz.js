let questions = []; // Global Array of Objects (each Object representing a Question)
let stats = {
  questionsAsked: 0,
  correct: 0,
  correctStreak: 0,
  currentTime: null,
  averageResponseTime: 0
}; // Global stats Object

initiateGame(questions, stats);

/*
// Event Handlers
*/

// Handle click events
document.addEventListener("click", function (event) {
  // This way of handling is useful for dynamically created elements
  if (event.target.classList.contains("quiz-ans-btn")) {
    // Handle ".quiz-ans-btn" click
    Array.from(document.querySelectorAll(".quiz-ans-btn")).forEach(
      (btn) => (btn.disabled = true)
    ); // Disable buttons
    event.target.blur();
    const choice = Number(event.target.id.split("-")[2]);
    const responseTime = round((new Date() - stats.currentTime) / 1000, 2);
    stats.averageResponseTime = round(
      (stats.averageResponseTime * (stats.questionsAsked - 1) + responseTime) /
        stats.questionsAsked,
      2
    );
    if (questions[0].answers[choice].isCorrect) {
      event.target.classList.add("pulse", "correct");
      stats.correct++;
      stats.correctStreak++;
      setTimeout(() => {
        nextQuestion(questions);
      }, 1250);
    } else {
      event.target.classList.add("shake", "incorrect");
      stats.correctStreak = 0;
      setTimeout(() => {
        const correctAnswerId =
          "quiz-ans-" +
          questions[0].answers.findIndex((elem) => elem.isCorrect);
        document.querySelector("#" + correctAnswerId).classList.add("correct");
        setTimeout(() => {
          nextQuestion(questions);
        }, 1500);
      }, 750);
    }
    displayStats(stats);
  }
});
// Attendre que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", function() {
    // Ajouter le gestionnaire d'événements pour le clic sur le bouton "Play Again"
    document.querySelector("#quiz-play-again-btn").addEventListener("click", function () {
        document.querySelector("#quiz-play-again-btn").classList.remove("infinite", "pulse");
        document.querySelector("#quiz-play-again-btn").classList.add("flipOutX");
        setTimeout(() => {
            document.querySelector("#quiz-play-again-btn").classList.remove("flipOutX");
            document.querySelector("#quiz-play-again").style.display = "none";
            questions = [];
            stats = {
                questionsAsked: 0,
                correct: 0,
                correctStreak: 0,
                currentTime: null,
                averageResponseTime: 0
            };
            displayStats(stats);
            initiateGame(questions, stats);
        }, 750);
    });
});

/*
// Auxiliary Functions
*/

// Initiate New Game
function initiateGame(questions, stats) {
  fetch("https://opentdb.com/api.php?amount=10")
    .then(function (res) {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json(); // Read the response as json.
    })
    .then(function (data) {
      for (let i = 0; i < data.results.length; i++) {
        questions.push({
          category: data.results[i].category,
          difficulty: data.results[i].difficulty,
          type: data.results[i].type,
          question: data.results[i].question,
          answers: createAnswersArray(
            data.results[i].correct_answer,
            data.results[i].incorrect_answers
          )
        });
      }
      displayQuestion(questions[0]);
    })
    .catch(function (error) {
      console.log("Looks like there was a problem: \n", error);
    });
}

// Manipulate API Data structure and return an Answers Array
function createAnswersArray(correct_answer, incorrect_answers) {
  const totalAnswers = incorrect_answers.length + 1;
  const correct_answer_index = Math.floor(Math.random() * totalAnswers);
  let answersArray = [];
  for (let i = 0; i < incorrect_answers.length; i++) {
    answersArray.push({
      answer: incorrect_answers[i],
      isCorrect: false
    });
  }
  answersArray.splice(correct_answer_index, 0, {
    answer: correct_answer,
    isCorrect: true
  });
  if (totalAnswers === 2) {
    // => Boolean -> Preferably always show True(1st) - False(2nd) (or Yes - No) -> sort in descending order since both "True" and "Yes" are alphabetically greater than ("False" and "No")
    answersArray.sort((a, b) => a.answer < b.answer);
  }
  return answersArray;
}

// Display Question
function displayQuestion(questionObject) {
    const quizQuestion = document.querySelector("#quiz-question");
    const quizOptions = document.querySelector("#quiz-options");
  
    // Add fadeOut class to question and answers for synchronized fading
    quizQuestion.classList.add("zoomOut");
    quizOptions.classList.add("zoomOut");
  
    setTimeout(() => {
      quizQuestion.innerHTML = questionObject.question;
  
      // Remove fadeOut class to allow fadeIn animation
      quizQuestion.classList.remove("zoomOut");
      quizOptions.classList.remove("zoomOut");
  
      // Add fadeIn class to question and answers for synchronized fading
      quizQuestion.classList.add("zoomIn");
      quizOptions.classList.add("zoomIn");
  
      setTimeout(() => {
        stats.questionsAsked++;
        stats.currentTime = new Date();
        for (let i = 0; i < questionObject.answers.length; i++) {
          let button = document.createElement("button");
          button.disabled = true;
          button.id = "quiz-ans-" + i;
          button.classList.add(
            "btn",
            "quiz-ans-btn",
            "animated",
            i % 2 === 0 ? "fadeInLeft" : "fadeInRight"
          );
          button.innerHTML = questionObject.answers[i].answer;
          quizOptions.appendChild(button);
          setTimeout(() => {
            button.disabled = false;
            button.classList.remove(i % 2 === 0 ? "fadeInLeft" : "fadeInRight");
          }, 1200);
        }
      }, 0.01); // Adjust timing based on your animation duration
    }, 500); // Adjust timing based on your animation duration
  } 


// Remove current question and display next one
function nextQuestion(questions) {
    document.querySelector("#quiz-question").classList.add("fadeOut"); // Add fadeOut class to question for synchronized fading
    for (let i = 0; i < questions[0].answers.length; i++) {
      const answerButton = document.querySelector("#quiz-ans-" + i);
      answerButton.classList.add(i % 2 === 0 ? "fadeOutLeft" : "fadeOutRight");
      answerButton.disabled = true; // Disable answer buttons during animation
    }
    setTimeout(() => {
      const quizOptions = document.querySelector("#quiz-options");
      while (quizOptions.firstChild) {
        quizOptions.removeChild(quizOptions.firstChild);
      }
      if (questions.length > 1) {
        questions.shift();
        displayQuestion(questions[0]);
        setTimeout(() => {
          document.querySelector("#quiz-question").classList.remove("fadeOut"); // Remove fadeOut class from question
        }, 500); // Adjust timing based on your animation duration
      } else {
        document.querySelector("#quiz-play-again").style.display = "block";
        document.querySelector("#quiz-play-again-btn").classList.add("flipInX");
        setTimeout(() => {
          document
            .querySelector("#quiz-play-again-btn")
            .classList.remove("flipInX");
          document
            .querySelector("#quiz-play-again-btn")
            .classList.add("infinite", "pulse");
        }, 1000);
      }
    }, 500); // Adjust timing based on your animation duration
  }
  

// Display Stats
function displayStats(stats) {
  document
    .querySelectorAll("#quiz-stats>div>span")
    .forEach((el) => el.classList.add("fadeOut"));
  setTimeout(() => {
    document.querySelector("#rate-span").innerHTML =
      stats.correct + "/" + stats.questionsAsked;
    document.querySelector("#streak-span").innerHTML = stats.correctStreak;
    document.querySelector("#response-time-span").innerHTML =
      stats.averageResponseTime;
    document.querySelectorAll("#quiz-stats>div>span").forEach((el) => {
      el.classList.remove("fadeOut");
      el.classList.add("fadeIn");
    });
    setTimeout(() => {
      document
        .querySelectorAll("#quiz-stats>div>span")
        .forEach((el) => el.classList.remove("fadeIn"));
    }, 375);
  }, 375);
}

// Auxilliary Rounding Function
function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
} // Note: decimals>=0, Example: round(1.005, 2); -> 1.01
