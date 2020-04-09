/*
 NOM : Nollet Antoine
 GROUPE : 11
*/


var SetupListener = function() {
	/* Initialise tous les évènements et éléments (les films) de la page lors du chargement de la page */
	
	/* On charge tous les films dans le catalogue de films */
	loadFilms();
	
	/* On charge les boutons like/dislike */
	loadLikes();
	
	/* On charge l'espace des video bandes-annonces */
	loadSpace();
	
	/* On charge le bouton des liens */
	loadLinks();
	
	insererLeInput();
	
	
	/* Après que tous les affiches de films aient été créées, on les sélectionne par la classe css "film" */
	var lesFilms = document.getElementsByClassName("film");
	
	/* On crée une liste vide, à laquelle on ajoute toutes les images et titres de films. */
	list = []
	for (i=0; i<lesFilms.length; i++) {
    list.push(lesFilms[i].getElementsByTagName("img")[0]);
    list.push(lesFilms[i].getElementsByTagName("h3")[0]);
	}
	
	/* On rajoute à chaque élément de la liste l'évènement qui, lorsqu'on clique sur l'élément, le rajoute aux favoris ou le
	retire si il y été déjà. */
	for (i=0; i<list.length; i++) {
		list[i].addEventListener("click",Favoris);
	}
	
	/* A chaque affiche de film, on va associer des événements */
	for (var i = 0; i < lesFilms.length; i++) {
		/* Lorsque la souris est sur une affiche de film, affiche la synopsis dans l'espace de description de film */
		lesFilms[i].addEventListener("mouseover",Synopsis);
		/* Lorsque la souris n'est sur aucune affiche de film, n'affiche rien dans l'espace de description de film */
		lesFilms[i].addEventListener("mouseout",FinSynopsis);
		/* Lorsque la souris est sur une affiche de film, affiche les boutons like et dislike */
		lesFilms[i].addEventListener("mouseover",BoutonsLike);
		/* Lorsque la souris est sur une affiche de film, affiche le bouton de bande annonce */
		lesFilms[i].addEventListener("mouseover",BoutonLien);
	}
	
	/* On initialise un compteur1 qui va varier entre 1 et 0, selon si l'espace de favori 1 est occupé ou non */
	compteur1 = 0;
	/* On initialise un compteur2 qui va varier entre 1 et 0, selon si l'espace de favori 2 est occupé ou non */
	compteur2 = 0;
	
	/* On sélectionne la case "détails?", l'élément d'id "showDetails" */
	var details = document.getElementById("showDetails");
	/* On lui associe un événement. Lorsqu'on clique sur la case, ça affiche ou non l'espace de description des films. */
	details.addEventListener("click",AfficherDetailOuPas);
	
	/* On sélectionne la case "bandes annonces?", l'élément d'id "showBA" */
	var annonce = document.getElementById("showBA");
	/* On lui associe un événement. Lorsqu'on clique sur la case, ça affiche ou non l'espace de bande annonce des films. */
	annonce.addEventListener("click",AfficherDetailOuPas2);
	
	/* On sélectionne l'espace du filtreur, l'élement d'id "filter" */
	var filtre = document.getElementById("filter");
	/* On lui associe la fonction de filtrage lorsque des touches du claviers sont tapées */
	filtre.addEventListener("keyup",filtrage);
	
	
	
}

/*On lance la fonction SetupListener au lancement de la page */
window.addEventListener("load", SetupListener);

var createFilm = function(index) {
	/* Créer une affiche de film */

	
	/* On crée un élément div qui contiendra l'affiche et le titre du film créé */
	var newfilm = document.createElement("div");
	/* On crée une image qui sera l'affiche du film */
	var newimage = document.createElement("img");
	/* On crée un espace de titre qui contiendra le titre du film */
	var newtitle = document.createElement("h3");
	/* On crée du texte qui sera le titre du film */
	var newcontenttitle = document.createTextNode(filmData[index].title);
	/* On associe la source de l'image créée à l'affiche du film souhaité */
	newimage.src = filmData[index].image;
	/* On pose le titre du film en alt sur cette image */
	newimage.alt = filmData[index].title;
	/* On associe l'id voulu au div contenant le film créé selon l'index rentré en paramètre */
	newfilm.id = index+"-film";
	/* On associe la classe css au div contenant le film créé, chaque film créé aura la même classe css */
	newfilm.className = "film";
	/* On met le texte du titre dans l'espace de titre */
	newtitle.appendChild(newcontenttitle);
	/* On met l'image du film dans le div film */
	newfilm.appendChild(newimage);
	/* On met l'espace de titre dans le div film */
	newfilm.appendChild(newtitle);
	/* Retoune le nouveau film créé */
	return newfilm
}

var loadFilms = function() {
	/* Charge tous les films dans le catalogue */
	
	/* On sélectionne le catalogue de films, l'élément d'id "films" */
	var films = document.getElementById("films");
	/* Pour chaque élément dans filmData, on l'ajoute au catalogue de films */
	for (var i = 0; i < filmData.length; i++) {
		films.appendChild(createFilm(i));
	}
}
	
	

var filtrage = function() {
	/*A pour effet de faire disparaître les films dont le titre ne posséde pas le texte rentré dans le filtre */
	
	/* On sélectionne la conversion en minuscule du texte écrit dans le filtreur */
	var texte = (this.value).toLowerCase();
	
	/* On sélectionne tous les div de classe css "film" qui sont descendants du catalogue de films d'id "films" */
	/* On ne sélectionne justement pas tous les div.film pour que ceux dans l'espace de favoris ne soient pas affectés
	par le filtrage */
	var lesFilms = document.querySelectorAll("#films div.film");
	
	/*  A chaque film dans le catalogue de films, on vérifie que le texte entré en filtrage est dans le titre du film */
	/* Si il y est, le film est affiché, sinon, il ne l'est pas */
	for ( i=0; i < lesFilms.length; i++) {
		/* On sélectionne la conversion en minuscule du titre du film */
		var minus = (lesFilms[i].getElementsByTagName("h3")[0].innerText).toLowerCase();
		/* S'applique si le titre du film contient en effet le texte du filtrage */
		if (minus.includes(texte) == true) {
			/* Affiche le film */
			lesFilms[i].style.display = "";
		}
		/* S'applique si le titre du film ne contient pas le texte du filtrage */
		else if (minus.includes(texte) == false) {
			/* Cache le film */
			lesFilms[i].style.display = "none";
		}
	}
}


var Synopsis = function() {
	/* A pour effet d'afficher la description du film sur le lequel on a mit le curseur de la souris */
	
	/* On sélectionne l'espace de description des films */
	var details = document.getElementById("details");
	/* On récupère l'index du film */
	var i = parseInt(this.id.split("-")[0]);
	/* On affiche la description du film dans l'espace de description des films */
	details.innerHTML = filmData[i].text;
}

var FinSynopsis = function() {
	/* A pour effet de vider l'espace de description des films lorsque le curseur de la souris n'est sur aucun film */
	
	/* On sélectionne l'espace de description des films */
	var details = document.getElementById("details");
	/* On vide l'espace de description des films */
	details.innerHTML = "";
}

var AfficherDetailOuPas = function() {
	/* A pour effet d'afficher la description des films selon si la case "détails ?" est coché ou non */
	
	/* On sélectionne l'espace de description des films */
	var details = document.getElementById("details");
	/* S'applique si la case "details?" est cochée */
	if (this.checked == true) {
		/* Affiche l'espace de description des films */
		details.style.display = "";
	}
	/* S'applique si la case "details?" n'est pas cochée */
	else if (this.checked == false) {
		/* Cache l'espace de description des films */
		details.style.display = "none";
	}
}

var Favoris = function() {
	/* Déplace le film sélectionné dans la liste des favoris. Si il n'y en avait pas, le film sélectionné sera le favoris n°1. Si il y en avait déjà un, le
	film sélectionné sera alors le favoris n°2. Et si il y en avait déjà 2, alors un message d'erreur sera affiché. */
	
	/* On sélectionne l'espace favoris 1 */
	var select1 = document.getElementById("select1");
	/* On sélectionne le "1" de l'espace favoris 1 */
	var span1 = document.querySelector("#select1 span");
	/* On sélectionne l'espace favoris 2 */
	var select2 = document.getElementById("select2");
	/* On sélectionne le "2" de l'espace favoris 2 */
	var span2 = document.querySelector("#select2 span");
	/* On sélectionne le parent du parent du film */
	var papi = this.parentNode.parentNode
	/* S'applique si le parent du parent du film est l'espace favoris 1 */
	if (papi == document.getElementById("select1")) {
		/* On enlève le film de l'espace favoris 1 */
		PlusFavoris1();
	}
	/* S'applique si le parent du parent du film est l'espace favoris 2 */
	else if (papi == document.getElementById("select2")) {
		/* On enlève le film de l'espace favoris 2 */
		PlusFavoris2();
	}
	/* S'applique si l'espace favoris 1 n'est pas occupé */
	else if (compteur1 == 0) {
		/* On insère le film avant le "1" de l'espace favoris 1 */
		select1.insertBefore(this.parentNode, span1);
		/* L'espace favoris 1 est dorénavent occupé */
		compteur1 = 1;
	}
	/* S'applique si l'espace favoris 1 est occupé mais que l'espace favoris 2 ne l'est pas */
	else if (compteur1 == 1 && compteur2 == 0) {
		/* On insère le film avant le "1" de l'espace favoris 2 */
		select2.insertBefore(this.parentNode, span2);
		/* L'espace favoris 2 est dorénavent occupé */
		compteur2 = 1;
	}
	/* S'applique lorsque tous les espaces favoris sont occupés */
	else if (compteur1 == 1 && compteur2 == 1) {
		/* Affiche un message d'erreur */
		window.alert("Deux films ont déjà été sélectionnés en favori, désolé !");
	}
}

var PlusFavoris1 = function() {
	/* Enleve, si il y en a un, le favori n°1 et le remet en dernière place dans le catalogue des films. */
	
	/* On sélectionne le film contenu dans l'espace favoris 1 */
	var film = document.querySelector("#select1 div.film");
	/* On sélectionne le catalogue de films */
	var films = document.getElementById("films");
	/* On ajoute le film dans le catalogue de films, ce qui aura pour effet, à cause de l'id, de le retirer de l'espace favoris 1 */
	films.appendChild(film);
	/* L'espace favoris 1 n'est plus occupé */
	compteur1 = 0;
}

var PlusFavoris2 = function() {
	/* Enleve, si il y en a un, le favori n°2 et le remet en dernière place dans le catalogue des films */
	
	/* On sélectionne le film contenu dans l'espace favoris 2 */
	var film = document.querySelector("#select2 div.film");
	/* On sélectionne le catalogue de films */
	var films = document.getElementById("films");
	/* On ajoute le film dans le catalogue de films, ce qui aura pour effet, à cause de l'id, de le retirer de l'espace favoris 2 */
	films.appendChild(film);
	/* L'espace favoris 2 n'est plus occupé */
	compteur2 = 0;
}

var loadLikes = function() {
	/* On crée les boutons like et dislike */

	/* On crée l'image du bouton like */
	pouceVert = document.createElement("img");
	/* On lui associe la source de l'image du bouton like */
	pouceVert.src = "images/pouce_vert.png";
	/* On lui associe son titre */
	pouceVert.alt = "Bouton Like";
	/* On lui associe son id */
	pouceVert.id = "Like";
	/* On lui fixe une taille initiale */
	pouceVert.style.width = "35px";
	/* On lui fixe une opacité légèrement diminuée */
	pouceVert.style.opacity = "0.5";
	/* On lui fixe une position absolue, par rapport aux films */
	pouceVert.style.position = "absolute";
	/* On le positionne en bas à gauche du film */
	pouceVert.style.bottom = "1%";
	pouceVert.style.left = "1%";
	/* On crée maintenant l'image du bouton dislike */
	pouceRouge = document.createElement("img");
	/* On lui associe la source de l'image du bouton dislike */
	pouceRouge.src = "images/pouce_rouge.png";
	/* On lui associe son titre */
	pouceRouge.alt = "Bouton Dislike";
	/* On lui associe son id */
	pouceRouge.id = "Dislike";
	/* On lui fixe une taille initiale */
	pouceRouge.style.width = "35px";
	/* On lui fixe une opacité légèrement diminuée */
	pouceRouge.style.opacity = "0.5";
	/* On lui fixe une position absolue, par rapport aux films */
	pouceRouge.style.position = "absolute";
	/* On le positionne en bas à droite du film */
	pouceRouge.style.bottom = "1%";
	pouceRouge.style.right = "1%";
}
	
var BoutonsLike = function() {
	/* Rajoute les boutons like et dislike sur l'affiche du film lorsque la souris passe dessus" */
	
	/* On met les pouces Like et Dislike dans le div film en question */
	this.appendChild(pouceVert);
	this.appendChild(pouceRouge);
	/* On change la position de l'affiche de film. De base, ça devrait être relatif... Mais bon, on le rajoute là. */
	/* Car si la position de l'affiche film n'est pas relative, le placement des pouces buggent */
	this.style.position = "relative";
	
	/* On ajoute les évènements aux pouces like et dislike. */
	
	/* Lorsqu'on met la souris sur les pouces, le style change un peu, oui, c'est pas nécessaire. */
	/* Mais c'est marrant ! */
	pouceVert.addEventListener("mouseover",PourLeStyle);
	pouceVert.addEventListener("mouseout",StopLesBetises);
	pouceRouge.addEventListener("mouseover",PourLeStyle);
	pouceRouge.addEventListener("mouseout",StopLesBetises);
	/* Lorsqu'on clique sur le pouce vert, ça like le film */
	pouceVert.addEventListener("click",Like);
	/* Lorsqu'on clique sur le pouce rouge, ça dislike le film */
	pouceRouge.addEventListener("click",Dislike);
}

var PourLeStyle = function() {
	/* Change le style des pouces like et dislike */
	
	/* On augmente légèrement la taille du pouce */
	this.style.width = "43px";
	/* On restaure l'opacité de base du pouce */
	this.style.opacity = "";
}

var StopLesBetises = function() {
	/* On remet les caractéristiques qu'on avait mit au début aux pouces like et dislike */
	
	/* On diminue la taille du pouce */
	this.style.width = "35px";
	/* On diminue de moitié l'opacité du pouce */
	this.style.opacity = "0.5";
}

var Like = function() {
	/* Like le film, et le remet à son état de base si le film était déjà liké */
	
	/* On sélectionne l'espace du titre du film liké */
	espace = this.parentNode.getElementsByTagName("h3")[0];
	/* S'applique lorsque la couleur de l'espace de titre du film liké est déjà vert, en soit, que le film liké était déjà de base liké */
	if (espace.style.backgroundColor == "green") {
		/* On restaure la couleur de fond de base de l'espace de titre du film liké */
		espace.style.backgroundColor = "";
		/* On restaure la couleur du film liké */
		this.parentNode.style.color = "";
		/* On restaure aussi sa couleur de fond */
		this.parentNode.style.backgroundColor = "";
		/* Et on restaure aussi son ombre d'avant */
		this.parentNode.style.boxShadow = "0px 0px 8px 4px rgba(55,55,55,1)";
	}
	/* Sinon, si le film était neutre ou même disliké, on applique ceci */
	else {
		/* On fixe en vert la couleur de fond de l'espace de titre du film liké */
		espace.style.backgroundColor = "green";
		/* On fixe en vert la couleur du film liké */
		this.parentNode.style.color = "green";
		/* On fixe en vert la couleur de fond du film */
		this.parentNode.style.backgroundColor = "green";
		/* On fixe en vert la couleur d'ombre du film */
		this.parentNode.style.boxShadow = "0px 0px 8px 4px green";
	}
	/* On applique donc les évènements qui font apparaître les ombres des films selon si la souris est dessus ou non */
	/* Donc quand on passera la souris sur un film liké, l'ombre qui apparaîtra sera verte */
	this.parentNode.addEventListener("mouseover",CouleurOmbre);
	this.parentNode.addEventListener("mouseout",PlusCouleurOmbre);
}

var Dislike = function() {
	/* Dislike le film, et le remet à son état de base si le film était déjà disliké */
	
	/* On sélectionne l'espace du titre du film disliké */
	espace = this.parentNode.getElementsByTagName("h3")[0];
	/* S'applique lorsque la couleur de l'espace de titre du film liké est déjà rouge, en soit, que le film disliké était déjà de base disliké */
	if (espace.style.backgroundColor == "red") {
		/* On restaure la couleur de fond de base de l'espace de titre du film disliké */
		espace.style.backgroundColor = "";
		/* On restaure la couleur du film disliké */
		this.parentNode.style.color = "";
		/* On restaure aussi sa couleur de fond */
		this.parentNode.style.backgroundColor = "";
		/* Et on restaure aussi son ombre d'avant */
		this.parentNode.style.boxShadow = "0px 0px 8px 4px rgba(55,55,55,1)";
	}
	/* Sinon, si le film était neutre ou même liké, on applique ceci */
	else {
		/* On fixe en rouge la couleur de fond de l'espace de titre du film disliké */
		espace.style.backgroundColor = "red";
		/* On fixe en rouge la couleur du film disliké */
		this.parentNode.style.color = "red";
		/* On fixe en rouge la couleur de fond du film */
		this.parentNode.style.backgroundColor = "red";
		/* On fixe en rouge la couleur d'ombre du film */
		this.parentNode.style.boxShadow = "0px 0px 8px 4px red";
	}
	/* Donc quand on passera la souris sur un film disliké, l'ombre qui apparaîtra sera rouge */
	this.parentNode.addEventListener("mouseover",CouleurOmbre);
	this.parentNode.addEventListener("mouseout",PlusCouleurOmbre);
}
	
var CouleurOmbre = function() {
	/* Lorsque la souris est sur un film, affiche l'ombre associé. Rouge si le film est disliké, vert si il est liké ou neutre si il est neutre */
	
	/* S'applique si le film est liké ou disliké */
	if (this.getElementsByTagName("h3")[0].style.backgroundColor == "red" || this.getElementsByTagName("h3")[0].style.backgroundColor == "green") {
		/* Applique une ombre au film de couleur correspondant à la couleur de l'espace de titre du film sur lequel on met la souris */
		this.style.boxShadow = "0px 0px 8px 4px "+ this.getElementsByTagName("h3")[0].style.backgroundColor;
	}
	/* S'applique si le film n'est ni liké ni disliké */
	else {
		/* Restaure la couleur d'ombre de base lorsque l'on met la souris sur le film */
		this.style.boxShadow = "0px 0px 8px 4px rgba(55,55,55,1)";
	}
}


var PlusCouleurOmbre = function() {
	/* Enlève les ombres du film quand la souris n'est pas dessus */
	
	/* On restaure l'ombre initial du film, c'est à dire qu'on l'enlève, car il n'y en a pas de base */
	this.style.boxShadow = "";
}

var loadLinks = function() {
/* On crée le bouton qui, lorsqu'on appuyera dessus, affichera la bande annonce du film où le bouton a été cliqué */

	/* On crée le bouton */
	bouton = document.createElement("button");
	/* On crée le texte du bouton*/
	push = document.createTextNode("BA");
	/* On met le texte dans le bouton */
	bouton.appendChild(push);
	/* On associe un id au bouton */
	bouton.id = "lien";
	/* On le positionne en bas au milieu du film sur lequel le bouton apparaîtra */
	bouton.style.position = "absolute";
	bouton.style.bottom = "1%";
	bouton.style.transform = "translateX(-50%)";
	bouton.style.right = "35%";
	/* On améliore l'esthétique du bouton créé */
	bouton.style.color = "white";
	bouton.style.backgroundColor = "purple";
	bouton.style.border = "solid 2px black";
	bouton.style.borderRadius = "10px";
}

var BoutonLien = function() {
	/* A pour effet de faire apparaître le bouton lien sur le film sur lequel la souris est posée */
	
	/* On ajoute le bouton au film */
	this.append(bouton);
	/* On fixe la position du film à relatif */
	this.style.position = "relative";
	/* On associe l'évènement qui, lorsque l'on clique sur le bouton, la bande annonce du film apparaît */
	bouton.addEventListener("click",afficheBA);
	/* On associe des évènements qui sont juste là pour l'apparence */
	bouton.addEventListener("mouseover",ChangeCouleur);
	bouton.addEventListener("mouseout",CouleurBase);
}

var ChangeCouleur = function() {
	/* Change la couleur de fond en rouge de ce qui a été sélectionné par la fonction */
	
	/* On change donc la couleur de fond comme ceci */
	this.style.backgroundColor = "red";
}

var CouleurBase = function() {
	/* Rétablis la couleur de fond initiale de ce qui a été sélectionné par la fonction */
	
	/* On rétablis donc la couleur de fond comme ceci */
	this.style.backgroundColor = "purple";
}
	

var afficheBA = function() {
	/* Affiche dans le cadre prévu à cet effet, lorsqu'on clique sur le bouton lien, la bande annonce du film où se trouvait le bouton lien */
	
	/* On récupère l'index du film */
	var i = parseInt(this.parentNode.id.split("-")[0]);
	/* On sélectionne les éléments 'iframe' */
	var lesLiens = document.getElementsByTagName("iframe");
	/* S'applique si la source de l'iframe correspond au lien du film sur lequel le bouton ba se trouve */
	if (lesLiens[0].src == filmData[i].lien) {
		/* Rétablis la source initiale de l'iframe, c'est à dire, plus de source du tout */
		lesLiens[0].src = "";
	}
	/* S'applique si la source de l'iframe ne correspond pas au lien du film sur lequel le bouton ba se trouve */
	else {
		/* Le lien du film sur lequel se trouve le bouton ba devient la source de l'iframe */
		lesLiens[0].src = filmData[i].lien;
	}
	
}

var AfficherDetailOuPas2 = function() {
	/* A pour effet d'afficher la bande annonce des films selon si la case "bandes annonces ?" est coché ou non */
	
	/* On sélectionne les éléments "iframe" */
	var lien = document.getElementsByTagName("iframe");
	/* Il n'y en a qu'un, et en rétablissant sa source initiale, cela revient à ce qu'il n'y ait plus de video dans le iframe (car plus de source du tout) */
	lien[0].src = "";
	/* On sélectionne l'espace de bande annonce des films */
	var BA = document.getElementById("ba");
	/* S'applique si la case "bandes annonces ?" est cochée */
	if (this.checked == true) {
		/* Affiche l'espace de bande annonce des films */
		BA.style.display = "";
	}
	/* S'applique si la case "bandes annonces ?" n'est pas cochée */
	else if (this.checked == false) {
		/* Cache l'espace de bande annonce des films */
		BA.style.display = "none";
	}
}

var loadSpace = function() {
	/* Charge l'espace des bandes-annonces */
	
	/* On crée un div */
	var espace = document.createElement("div");
	/* On lui associe un id */
	espace.id = "ba";
	/* On règle sa taille */
	espace.style.padding = "0px 0px";
	/* On règle son esthétique */
	espace.style.border = "solid 7px white";
	espace.style.backgroundColor = "black";
	/* On règle sa position */
	espace.style.position = "absolute";
	espace.style.transform = "translateY(-50%)";
	espace.style.top = "50%";
	espace.style.right = "5%";
	/* On crée un iframe, dans lequel les videos seront lancées */
	var video = document.createElement("iframe");
	/* On fixe l'esthétique de l'iframe*/
	video.width = "560";
	video.height = "315";
	video.frameborder = "0";
	/* On fixe ses autorisations */
	video.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
	video.allowfullscreen = true;
	/* On met l'iframe dans l'espace des bandes-annonces */
	espace.appendChild(video);
	/* On sélectionne le body */
	var body = document.getElementsByTagName("body")[0]
	/* On met le div créé dans le body */
	body.appendChild(espace);
}

var insererLeInput = function() {
	/* Insere le input "showBA" qui, lorsqu'on cliquera dessus, fera apparaître ou non l'espace de bande annonce */
	
	var catalogue = document.getElementById("catalog");
	var input = document.createElement("input");
	input.type = "checkbox";
	input.id = "showBA";
	input.checked = "checked";
	input.style.marginRight = "33px";
	var texte = document.createTextNode("bandes annonces ? ");
	var filter = document.getElementById("filter");
	catalogue.insertBefore(input,filter);
	catalogue.insertBefore(texte,input);
	
}
	

/*		The end !		*/