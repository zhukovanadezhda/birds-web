const myQuestions = [
  {
    type: 'boolean',
    difficulty: 'easy',
    category: 'Animals',
    question: 'Tous les oiseaux savent voler.',
    correct_answer: 'Faux',
    incorrect_answers: ['Vrai'],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Animal',
    question: 'Quel est cet oiseau ?',
    image: '../styles/Oiseaux/Merle_noir.jpg',
    correct_answer: 'Merle noir',
    incorrect_answers: ['Pigeon ramier', 'Mésange charbonnière', 'Coucou gris'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Animal',
    question: 'Quel est cet oiseau ?',
    image: '../styles/Oiseaux/pic_epeiche.jpg',
    correct_answer: 'Pic épeiche',
    incorrect_answers: ['Pic vert', 'Pic noir', 'Pic mar'],
  },
  {
    type: 'boolean',
    difficulty: 'medium',
    category: 'Animal',
    question: "En France, la période de nidification des oiseaux s'étend de mi-Mars à mi-Août.",
    correct_answer: 'Vrai',
    incorrect_answers: ['Faux'],
  },
  {
    type: 'boolean',
    difficulty: 'medium',
    category: 'Animal',
    question: 'Cet oiseau est-il le préféré de Nadya ou de Théo ? (Le Martin-pêcheur)',
    image: '../styles/Oiseaux/Martin_pecheur.jpg',
    correct_answer: 'Théo',
    incorrect_answers: ['Nadya'],
  },
  {
    type: 'multiple',
    difficulty: 'hard',
    category: 'Animal',
    question: 'Quel est cet oiseau ?',
    image: '../styles/Oiseaux/Sitelle_Torchepot.jpg',
    correct_answer: 'Sitelle torchepot',
    incorrect_answers: ["Verdier d'Europe", 'Mésange bleue', 'Pouillot véloce'],
  },
  {
    type: 'boolean',
    difficulty: 'easy',
    category: 'Animal',
    question: "Il n'y a pas de corbeaux à Paris.",
    image: '../styles/Oiseaux/Grand_Corbeau.jpg',
    correct_answer: 'True',
    incorrect_answers: ['False'],
  },
  {
    type: 'multiple',
    difficulty: 'hard',
    category: 'Animal',
    question: "Quel oiseau n'existe pas ?",
    correct_answer: 'Galinette cendrée',
    incorrect_answers: ['Bouscarle de cetti', 'Bruant zizi', 'Chevalier cul-blanc'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Animal',
    question: 'Quel est cet oiseau ?',
    image: '../styles/Oiseaux/Buse_variable.jpg',
    correct_answer: 'Buse variable',
    incorrect_answers: ['Milan noir', 'Aigle royal', 'Faucon pelerin'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Animal',
    question: "Quel oiseau n'existe pas en France ?",
    correct_answer: 'Héron goliath',
    incorrect_answers: ["Ouette d'Egypte", 'Perruche à collier', 'Tourterelle turque'],
  },
];

// Fonction pour mélanger un tableau
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Mélanger le tableau de questions
shuffleArray(myQuestions);

// Mélanger les réponses pour chaque question
myQuestions.forEach(question => {
  shuffleArray(question.incorrect_answers);
});

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
  const quizImage = document.querySelector('#quiz-image');
  quizQuestion.innerHTML = '';
  quizOptions.innerHTML = '';

  quizQuestion.classList.add('zoomOut');
  quizOptions.classList.add('zoomOut');

  setTimeout(() => {
    quizQuestion.innerHTML = questionObject.question;

    if (questionObject.image) {
      const image = document.createElement('img');
      image.src = questionObject.image;
      image.className = 'fadeIn animated';
      quizImage.innerHTML = '';
      quizImage.appendChild(image);
    } else {
      quizImage.innerHTML = ''; // Clear if no image
    }

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
        shuffleArray(allAnswers); // Shuffle the combined answers
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
  }, 1000);
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