const myQuestions = [
  {
    type: 'boolean',
    difficulty: 'easy',
    category: 'Science: Computers',
    question: 'Ada Lovelace is often considered the first computer programmer.',
    correct_answer: 'True',
    incorrect_answers: ['False'],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Music',
    question:
      'The band Muse released their first album, Showbiz, in what year?',
    correct_answer: '1999',
    incorrect_answers: ['1998', '2000', '2001'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Geography',
    question:
      'All of the following countries have official claims to territory in Antarctica EXCEPT:',
    correct_answer: 'United States',
    incorrect_answers: ['Australia', 'Chile', 'Norway'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Entertainment: Video Games',
    question:
      'Which of these games was NOT a Nintendo Switch launch title in the United States? ',
    correct_answer: 'Voez',
    incorrect_answers: ['Just Dance 2017', 'Snipperclips', 'Fast RMX'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Science &amp; Nature',
    question: 'Which of these is a type of stretch/deep tendon reflex?',
    correct_answer: 'Ankle jerk reflex',
    incorrect_answers: [
      'Gag reflex',
      'Pupillary light reflex',
      'Scratch reflex',
    ],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Entertainment: Video Games',
    question: 'When was the Sega Genesis released in Japan?',
    correct_answer: 'October 29, 1988',
    incorrect_answers: [
      'August 14, 1989',
      'November 30, 1990',
      'September 1, 1986',
    ],
  },
  {
    type: 'boolean',
    difficulty: 'medium',
    category: 'Science &amp; Nature',
    question:
      'Scientists accidentally killed the once known world&#039;s oldest living creature, a mollusc, known to be aged as 507 years old.',
    correct_answer: 'True',
    incorrect_answers: ['False'],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Film',
    question: 'When was the movie &#039;Con Air&#039; released?',
    correct_answer: '1997',
    incorrect_answers: ['1985', '1999', '1990'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Art',
    question: 'Who designed the Chupa Chups logo?',
    correct_answer: 'Salvador Dali',
    incorrect_answers: ['Pablo Picasso', 'Andy Warhol', 'Vincent van Gogh'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Entertainment: Books',
    question:
      'What was the name of the Mysterious Island, in Jules Verne&#039;s &quot;The Mysterious Island&quot;?',
    correct_answer: 'Lincoln Island',
    incorrect_answers: [
      'Vulcania Island',
      'Prometheus Island',
      'Neptune Island',
    ],
  },
];

let questions = [];
let stats = {
  questionsAsked: 0,
  correct: 0,
  correctStreak: 0,
  currentTime: null,
  averageResponseTime: 0,
};

initiateGame();

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('quiz-ans-btn')) {
    Array.from(document.querySelectorAll('.quiz-ans-btn')).forEach(
      btn => (btn.disabled = true),
    );
    event.target.blur();
    const choice = Number(event.target.id.split('-')[2]);
    const responseTime = round((new Date() - stats.currentTime) / 1000, 2);
    stats.averageResponseTime = round(
      (stats.averageResponseTime * (stats.questionsAsked - 1) + responseTime) /
        stats.questionsAsked,
      2,
    );
    const correctAnswerIndex = questions[0].incorrect_answers.length;
    if (choice === correctAnswerIndex) {
      console.log('correct answer');
      event.target.classList.add('pulse', 'correct');
      stats.correct++;
      stats.correctStreak++;
      setTimeout(() => {
        nextQuestion();
      }, 1250);
    } else {
      console.log('incorrect answer');
      event.target.classList.add('shake', 'incorrect');
      stats.correctStreak = 0;
      setTimeout(() => {
        const correctAnswerId = 'quiz-ans-' + correctAnswerIndex;
        document.querySelector('#' + correctAnswerId).classList.add('correct');
        setTimeout(() => {
          nextQuestion();
        }, 1500);
      }, 750);
    }
    displayStats();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('#quiz-play-again-btn')
    .addEventListener('click', function () {
      document
        .querySelector('#quiz-play-again-btn')
        .classList.remove('infinite', 'pulse');
      document.querySelector('#quiz-play-again-btn').classList.add('flipOutX');
      setTimeout(() => {
        document
          .querySelector('#quiz-play-again-btn')
          .classList.remove('flipOutX');
        document.querySelector('#quiz-play-again').style.display = 'none';
        questions = [];
        stats = {
          questionsAsked: 0,
          correct: 0,
          correctStreak: 0,
          currentTime: null,
          averageResponseTime: 0,
        };
        displayStats();
        initiateGame();
      }, 750);
    });
});

function initiateGame() {
  questions = myQuestions.slice();
  displayQuestion(questions[0]);
}

function displayQuestion(questionObject) {
  const quizQuestion = document.querySelector('#quiz-question');
  const quizOptions = document.querySelector('#quiz-options');

  quizQuestion.classList.add('zoomOut');
  quizOptions.classList.add('zoomOut');

  setTimeout(() => {
    quizQuestion.innerHTML = questionObject.question;

    quizQuestion.classList.remove('zoomOut');
    quizOptions.classList.remove('zoomOut');

    quizQuestion.classList.add('zoomIn');
    quizOptions.classList.add('zoomIn');

    setTimeout(() => {
      stats.questionsAsked++;
      stats.currentTime = new Date();

      if (questionObject) {
        const allAnswers = questionObject.incorrect_answers.concat(
          questionObject.correct_answer,
        );
        for (let i = 0; i < allAnswers.length; i++) {
          let button = document.createElement('button');
          button.disabled = true;
          button.id = 'quiz-ans-' + i;
          button.classList.add(
            'btn',
            'quiz-ans-btn',
            'animated',
            i % 2 === 0 ? 'fadeInLeft' : 'fadeInRight',
          );
          button.innerHTML = allAnswers[i];
          quizOptions.appendChild(button);
          setTimeout(() => {
            button.disabled = false;
            button.classList.remove(i % 2 === 0 ? 'fadeInLeft' : 'fadeInRight');
          }, 500);
        }
      } else {
        console.log('Invalid question object or missing answers property.');
      }
    }, 0.01);
  }, 500);
}

function nextQuestion() {
  document.querySelector('#quiz-question').classList.add('fadeOut');

  if (questions.length > 0) {
    const quizOptions = document.querySelector('#quiz-options');
    while (quizOptions.firstChild) {
      quizOptions.removeChild(quizOptions.firstChild);
    }
    questions.shift();
    if (questions.length > 0) {
      displayQuestion(questions[0]);
      setTimeout(() => {
        document.querySelector('#quiz-question').classList.remove('fadeOut');
      }, 500);
    } else {
      document.querySelector('#quiz-play-again').style.display = 'block';
      document.querySelector('#quiz-play-again-btn').classList.add('flipInX');
      setTimeout(() => {
        document
          .querySelector('#quiz-play-again-btn')
          .classList.remove('flipInX');
        document
          .querySelector('#quiz-play-again-btn')
          .classList.add('infinite', 'pulse');
      }, 0);
    }
  }
}

function displayStats() {
  document
    .querySelectorAll('#quiz-stats>div>span')
    .forEach(el => el.classList.add('fadeOut'));
  setTimeout(() => {
    document.querySelector('#rate-span').innerHTML =
      stats.correct + '/' + stats.questionsAsked;
    document.querySelector('#streak-span').innerHTML = stats.correctStreak;
    document.querySelector('#response-time-span').innerHTML =
      stats.averageResponseTime;
    document.querySelectorAll('#quiz-stats>div>span').forEach(el => {
      el.classList.remove('fadeOut');
      el.classList.add('fadeIn');
    });
    setTimeout(() => {
      document
        .querySelectorAll('#quiz-stats>div>span')
        .forEach(el => el.classList.remove('fadeIn'));
    }, 375);
  }, 375);
}

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals)) / Math.pow(10, decimals);
}
