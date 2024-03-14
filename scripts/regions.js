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
    var background = document.getElementById('background-image');
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
function openModal(birdName, birdDescription) {
  var modal = document.getElementById('bird-modal');
  var nameField = document.getElementById('bird-name');
  var descriptionField = document.getElementById('bird-description');
  
  nameField.textContent = birdName;
  descriptionField.textContent = birdDescription;
  
  modal.style.display = 'block';
}

// Fonction pour fermer le cadre modal
function closeModal() {
  var modal = document.getElementById('bird-modal');
  modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  var birdCards = document.querySelectorAll('.bird-card');

  birdCards.forEach(function(card) {
    card.addEventListener('click', function() {
      var birdName = card.querySelector('.bird-name').textContent;
      var birdDescription = card.querySelector('.bird-info').textContent;
      openModal(birdName, birdDescription);
    });
  });
});
