/* switch between dark and light mode */

function switchMode() {
	let moon = document.getElementById("moon");
	let navLinks = document.querySelectorAll("nav ul li a");

	if (moon.className == "moon") {
		moon.className = "sun";
		document.body.style.backgroundColor = "#141D26";
		document.body.style.color = "#FFFFFF";
		// Update menu text color to white
		navLinks.forEach(link => {
			link.style.color = "#FFFFFF";
		});
	} else {
		moon.className = "moon";
		document.body.style.backgroundColor = "#FFFFFF";
		document.body.style.color = "#000000";
		// Update menu text color to black
		navLinks.forEach(link => {
			link.style.color = "#000000";
		});
	}
}	

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

