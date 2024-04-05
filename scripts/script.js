// Function to switch between dark and light mode
function switchMode() {
    let moon = document.getElementById("moon");
    let navLinks = document.querySelectorAll("nav ul li a");

    if (moon.className == "moon") {
        moon.className = "sun";
        document.body.style.backgroundImage = "url('../styles/images/back_night.jpg')";
        document.body.style.color = "#FFFFFF";
        // Update menu text color to white
        navLinks.forEach(link => {
            link.style.color = "#FFFFFF";
        });
        // Save mode selection to localStorage
        localStorage.setItem('mode', 'dark');
        // Re-initialize stars animation for night mode
        initStars();
    } else {
        moon.className = "moon";
        document.body.style.backgroundImage = "url('../styles/images/back_day.jpg')";
        document.body.style.color = "#000000";
        // Update menu text color to black
        navLinks.forEach(link => {
            link.style.color = "#000000";
        });
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

// Check if mode is stored in localStorage and apply it on page load
document.addEventListener('DOMContentLoaded', function() {
    let mode = localStorage.getItem('mode');
    if (mode === 'dark') {
        switchMode(); // Apply dark mode
    }
    // If mode is not stored or it's 'light', keep the default light mode
});

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
}

window.onload = init;
