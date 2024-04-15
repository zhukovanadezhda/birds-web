var audio;

function showPage(pageId) {
	// Hide all pages
	var pages = document.getElementsByClassName("cv_page");
	for (var i = 0; i < pages.length; i++) {
	  pages[i].style.display = "none";
	}
	// Show the selected page
	document.getElementById(pageId).style.display = "block";
  }
  
  window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var background = document.querySelector('.background-img');
    var opacity = 1 - scrollPosition / 500; // Change 500 to adjust fade-out speed
    
    if (opacity >= 0) {
        background.style.opacity = opacity;
    }
});


function scrollToContent() {
  window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
  });
}

function expandCard(card) {
card.style.transform = 'scale(1.05)';
}

function shrinkCard(card) {
card.style.transform = 'scale(1)';
}

// Fonction pour ouvrir le cadre modal
function openModal(birdName, birdDescription, birdImageUrl) {
  var modal = document.getElementById('bird-modal');
  var nameField = document.getElementById('bird-name');
  var descriptionField = document.querySelector('.bird-text'); // Updated to select the text div
  var imageField = document.querySelector('.bird-image'); // Select the image div

  nameField.textContent = birdName;
  descriptionField.textContent = birdDescription;
  imageField.innerHTML = ''; // Clear previous image
  if (birdImageUrl) {
      var image = document.createElement('img');
      image.src = birdImageUrl;
      image.alt = 'Bird Image';
      imageField.appendChild(image);
  }
  
  modal.style.display = 'block';
}

// Fonction pour fermer le cadre modal
function closeModal() {
  var modal = document.getElementById('bird-modal');
  modal.style.display = 'none';
  if (audio) {
    audio.pause(); // Pause the audio if it exists
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var birdCards = document.querySelectorAll('.bird-card');

  birdCards.forEach(function(card) {
    card.addEventListener('click', function() {
      var birdName = card.querySelector('.bird-name').textContent;
      var birdDescription = card.querySelector('.bird-info').textContent;
      var birdImageUrl = card.querySelector('.bird-image-inner').getAttribute('src'); 
      openModal(birdName, birdDescription, birdImageUrl);
    });
  });
});

function toggleCard(birdName, birdFamily, birdSize, birdWeight, birdSong, birdHabitat, birdDescription) {
  var modal = document.getElementById("bird-modal");
  var nameCell = document.getElementById("bird-name-cell");
  var familyCell = document.getElementById("bird-family-cell");
  var sizeCell = document.getElementById("bird-size-cell");
  var weightCell = document.getElementById("bird-weight-cell");
  var songCell = document.getElementById("bird-song-cell");
  var habitatCell = document.getElementById("bird-habitat-cell");
  var descriptionCell = document.getElementById("bird-description-cell");

  // Remplir les cellules du tableau avec les informations spécifiques de l'oiseau
  nameCell.textContent = birdName;
  familyCell.textContent = birdFamily;
  sizeCell.textContent = birdSize;
  weightCell.textContent = birdWeight;
  songCell.textContent = birdSong;
  habitatCell.textContent = birdHabitat;
  descriptionCell.textContent = birdDescription;

// Créer le lecteur audio
audio = new Audio(birdSong);

audio.addEventListener("loadedmetadata", function() {
  duration.textContent = "0:00 / " + formatTime(audio.duration);
});

  // Créer le bouton de lecture/pause
  var playButton = document.createElement("button");
  playButton.textContent = "Play";
  playButton.classList.add("play-button"); // Ajouter une classe pour le style CSS
  playButton.addEventListener("click", function() {
      if (audio.paused) {
          audio.play();
          playButton.textContent = "Pause";
      } else {
          audio.pause();
          playButton.textContent = "Play";
      }
  });

// Ajouter le bouton de lecture au champ birdSong
songCell.innerHTML = ""; // Effacer le contenu existant
songCell.appendChild(playButton);

// Mettre à jour la barre de progression de l'audio
var progressBar = document.createElement("div");
progressBar.classList.add("progress-bar");
var progressFilled = document.createElement("div");
progressFilled.classList.add("progress-filled");
progressBar.appendChild(progressFilled);
songCell.appendChild(progressBar);

// Mettre à jour la durée de l'audio
var duration = document.createElement("p");
duration.classList.add("duration");
duration.textContent = "0:00 / " + formatTime(audio.duration);
songCell.appendChild(duration);

// Mettre à jour la barre de progression et la durée de l'audio lors de la lecture
audio.addEventListener("timeupdate", function() {
    var progress = (audio.currentTime / audio.duration) * 100;
    progressFilled.style.width = progress + "%";
    duration.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
});

// Fonction pour formater le temps en minutes et secondes
function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Afficher ou masquer le modal
modal.style.display = modal.style.display === "none" ? "block" : "none";
}

document.addEventListener('DOMContentLoaded', function() {
  AOS.init();
});
