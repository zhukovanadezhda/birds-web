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
