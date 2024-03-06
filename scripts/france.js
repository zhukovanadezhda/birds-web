var mapfill = "#70ABF3";		// Couleur de remplissage des régions
var maphover_fill = "#70abf386";// Couleur de survol au passage de la souris
var mapstroke = "#FFFFFF";		// Couleur des lignes de séparation des régions
var mapstroke_width = 1;		// Epaisseur des lignes de séparation des régions (en points)
var mapWidth=500;				// Largeur de la carte en pixels
var mapHeight=430;				// Hauteur de la carte en pixels 


var paths = {
Z1: {
title: "Alsace-Champagne-Ardenne-Lorraine",
url: "regions/Grand-Est.html"
},
Z2: {
title: "Aquitaine-Limousin-Poitou-Charentes",
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
title: "Centre",
url: "regions/Centre.html"
},
Z7: {
title: "Corse",
url: "regions/Corse.html"
},
Z8: {
title: "Languedoc-Roussillon-Midi-Pyrénées",
url: "regions/Occitanie.html"
},
Z9: {
title: "Ile-de-France",
url: "regions/Ile-de-France.html"
},
Z10: {
title: "Nord-Pas-de-Calais-Picardie",
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

// Assign IDs to paths
Object.keys(paths).forEach(function(region) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', window[region + 'pat']);
    path.setAttribute('id', region); // Set ID for each path
    path.setAttribute('fill', mapfill);
    path.setAttribute('stroke', mapstroke);
    path.setAttribute('stroke-width', mapstroke_width);
    document.getElementById("cmap").appendChild(path);
});
