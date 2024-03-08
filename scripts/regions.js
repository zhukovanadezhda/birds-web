/* region pages */

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