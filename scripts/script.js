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
    }
}

// Check if mode is stored in localStorage and apply it on page load
document.addEventListener('DOMContentLoaded', function() {
    let mode = localStorage.getItem('mode');
    if (mode === 'dark') {
        switchMode(); // Apply dark mode
    }
    // If mode is not stored or it's 'light', keep the default light mode
});


/* add stars to the background */

let sky, center;

function dot(i) {
   const size = Math.round(Math.random() + 1);
   const root = document.createElement('span');
   const x = Math.random() * sky.clientWidth;
   const y = Math.random() * sky.clientHeight;
   root.style.top = y + 'px';
   root.style.left = x + 'px';
   root.classList.add('star', `size-${size}`, `axis-${i}`);
   return root;
}

function clear() {
   sky.innerHTML = '';
}

function init() {
   sky = document.querySelector('#sky');
   center = {
      x: sky.clientWidth / 2,
      y: sky.clientHeight / 2,
   };
   clear();
   for (let i = 0; i < 360; i++) sky.appendChild(dot(i));
}

window.onload = init;