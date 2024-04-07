var mapfill = "#70abf3b2";		 // Couleur de remplissage des régions
var maphover_fill = "#f3b870ac"; // Couleur de survol au passage de la souris
var mapstroke = "#FFFFFF";		 // Couleur des lignes de séparation des régions
var mapstroke_width = 1;		 // Epaisseur des lignes de séparation des régions (en points)
var mapWidthPercentage = 50;     // Largeur de la carte en pourcentage de la largeur de l'écran
var mapHeightPercentage = 80;    // Hauteur de la carte en pourcentage de la hauteur de l'écran

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var mapWidth = (screenWidth * mapWidthPercentage) / 100;
var mapHeight = (screenHeight * mapHeightPercentage) / 100;

var paths = {
Z1: {
title: "Grand Est",
url: "regions/Grand-Est.html"
},
Z2: {
title: "Nouvelle-Aquitaine",
url: "regions/Nouvelle-Aquitaine.html"
},
Z3: {
title: "Auvergne-Rhône-Alpes",
url: "regions/Auvergne-Rhone-Alpes.html"
},
Z4: {
title: "Bourgogne-Franche-Comté",
url: "regions/Bourgogne-Franche-Comte.html"
},
Z5: {
title: "Bretagne",
url: "regions/Bretagne.html"
},
Z6: {
title: "Centre-Val de Loire",
url: "regions/Centre.html"
},
Z7: {
title: "Corse",
url: "regions/Corse.html"
},
Z8: {
title: "Occitanie",
url: "regions/Occitanie.html"
},
Z9: {
title: "Ile-de-France",
url: "regions/Ile-de-France.html"
},
Z10: {
title: "Hauts-de-France",
url: "regions/Hauts-de-France.html"
},
Z11: {
title: "Normandie",
url: "regions/Normandie.html"
},
Z12: {
title: "Pays-de-la-Loire",
url: "regions/Pays-de-la-Loire.html"
},
Z13: {
title: "Provence-Alpes-Côte-d-Azur",
url: "regions/Provence-Alpes-Cote-d-Azur.html"
}
}

// assign IDs to paths
Object.keys(paths).forEach(function(region) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', window[region + 'pat']);
    path.setAttribute('id', region);
    path.setAttribute('fill', mapfill);
    path.setAttribute('stroke', mapstroke);
    path.setAttribute('stroke-width', mapstroke_width);
    document.getElementById("cmap").appendChild(path);
});
