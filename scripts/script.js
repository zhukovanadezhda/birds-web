function switchMode() {
    let moon = document.getElementById("moon");
    let navLinks = document.querySelectorAll("nav ul li a");
	let footerText = document.querySelectorAll(".footer-text, .footer-list li a, .footer-text-cr");
    let container = document.querySelector(".container");
    let footer = document.querySelector(".footer"); // Select the footer element
    let menu = document.querySelector(".top-page-container"); // Select the menu element


    if (moon.className == "moon") {
        moon.className = "sun";
        document.body.style.backgroundImage = "url('../styles/images/back_night.jpg')";
        menu.style.backgroundImage = "url('../styles/images/back_night.jpg')";
		document.body.style.backgroundColor = "#070B17";
        document.body.style.color = "#FFFFFF";
        container.style.backgroundColor = "#070B17"; // Background color of the container in night mode
        // Update menu text color to white
        navLinks.forEach(link => {
            link.style.color = "#FFFFFF";
        });
        // Update footer text color to white
        footerText.forEach(text => {
            text.style.color = "#FFFFFF";
        });
        // Set padding color to match the background color
        footer.style.padding = "15px";
        footer.style.backgroundColor = "#070B17"; // Set footer background color to match container
        // Save mode selection to localStorage
        localStorage.setItem('mode', 'dark');
        // Re-initialize stars animation for night mode
        initStars();
    } else {
        moon.className = "moon";
        document.body.style.backgroundImage = "url('../styles/images/back_day.jpg')";
        menu.style.backgroundImage = "url('../styles/images/back_day.jpg')";
		document.body.style.backgroundColor = "#FFFFFF";
        document.body.style.color = "#000000";
        container.style.backgroundColor = ""; // Reset background color of the container in day mode
        // Update menu text color to black
        navLinks.forEach(link => {
            link.style.color = "#000000";
        });
        // Update footer text color to default
        footerText.forEach(text => {
            text.style.color = "#555";
        });
        // Reset padding color to default (white)
        footer.style.padding = "15px";
        footer.style.backgroundColor = ""; // Reset footer background color
        // Save mode selection to localStorage
        localStorage.setItem('mode', 'light');
        // Clear stars animation for day mode
        clearStars();
    }
}

// Function to initialize stars animation for night mode
function initStars() {
    if (!document.getElementById('star')) {
        for (let i = 0; i < 360; i++) {
            sky.appendChild(dot(i)); // Create new stars
        }
    }
}

// Function to clear stars animation
function clearStars() {
    let stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.parentNode.removeChild(star);
    });
}

// Function to create a star element
function dot(i) {
    const size = Math.round(Math.random() + 1);
    const root = document.createElement('span');
    root.id = 'star';
    const x = Math.random() * sky.clientWidth;
    const y = Math.random() * sky.clientHeight;
    root.style.top = y + 'px';
    root.style.left = x + 'px';
    root.classList.add('star', `size-${size}`, `axis-${i}`);
    return root;
}

// Function to initialize stars animation on page load
function init() {
    sky = document.querySelector('#sky');
    center = {
        x: sky.clientWidth / 2,
        y: sky.clientHeight / 2,
    };
    initStars(); // Initialize stars animation
}

// Check if mode is stored in localStorage and apply it on page load
document.addEventListener('DOMContentLoaded', function() {
    let mode = localStorage.getItem('mode');
    if (mode === 'dark') {
        switchMode(); // Apply dark mode
    } else {
        clearStars(); // Clear stars if mode is light
    }
});

// Call init() function when the page loads
init();