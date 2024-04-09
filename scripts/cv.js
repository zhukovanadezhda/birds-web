function checkAnswer(button) {
    // correct answer is the button with id= "correctAnswer"
    const correctAnswer = document.getElementById('correctAnswer').textContent;
    const userAnswer = button.textContent;
    const feedback = document.createElement('div');

    if (userAnswer === correctAnswer) {
        feedback.style.backgroundColor = "rgba(112, 243, 143, 1)";
        feedback.textContent = "Oui, tu as raison ! Pas encore...";
    } else {
        feedback.style.backgroundColor = "rgba(243, 143, 112, 1)";
        feedback.textContent = "Ce n'est pas un mensonge !";
    }    

    // Position the feedback above the clicked button, accounting for page scroll
    feedback.classList.add('feedback');
    feedback.style.width = button.offsetWidth + 'px'; // Set width to match button
    feedback.style.height = button.offsetHeight + 'px'; // Set height to match button
    const buttonRect = button.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    feedback.style.top = buttonRect.top + scrollTop - feedback.offsetHeight + 'px';
    feedback.style.left = buttonRect.left + 'px';
    document.body.appendChild(feedback); // Append feedback to the body
    setTimeout(() => {
        feedback.remove();
    }, 1000); // Remove feedback after 1 second
}


function showPage(pageId) {
    // Hide all cv_page divs
    var pages = document.getElementsByClassName('cv_page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    
    // Display the selected page
    var selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
}