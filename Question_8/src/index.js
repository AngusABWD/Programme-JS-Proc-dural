// script pour le menu responsive
if ( window.screen.availWidth < 768 ) {
    document.getElementById("navbarContent").classList.add("collapse"); 
}
const collapse = () => {
    if ( window.screen.availWidth < 768 ) {
        document.getElementById("navbarContent").classList.add("collapse"); 
    }
    if ( window.screen.availWidth >= 768 ) {
        document.getElementById("navbarContent").classList.remove("collapse"); 
    }
}
window.onresize = collapse;
// Début de l'exercice
let afficher = false;
let prixPropose = 0;
let prix = 0;
let tentative = 1;
document.getElementById("prix").disabled = true;

//retrait de l'affichage du document
function retirerAffichage() {
    const affichageArticle = document.querySelector("#articlePhoto > img ");
    affichageArticle.remove();
    document.getElementById("articleText").innerHTML = "";
    document.getElementById("affichage").innerHTML = "";  
}
// determination et affichage aléatoire de l'article et de son prix
function determinerArticle() {
    let numeroArticle = Math.floor( Math.random() * 5 ) + 1;
    prix = Math.floor( Math.random() * 100 ) + 1;
    afficher = true;
    switch ( numeroArticle ) {
        case 1 : 
        document.getElementById("articlePhoto").innerHTML = "<img class='w-100' src='./Image/chaise.png' alt='chaise'/>";
        document.getElementById("articleText").innerHTML = "cette chaise ?";
        break;
        case 2 : 
        document.getElementById("articlePhoto").innerHTML = '<img class="w-100" src="./Image/costume-haloween.png" alt="costume"/>';
        document.getElementById("articleText").innerHTML = "ce costume ?";
        break;
        case 3 : 
        document.getElementById("articlePhoto").innerHTML = '<img class="w-100" src="./Image/grill.png" alt="grill"/>';
        document.getElementById("articleText").innerHTML = "ce grill ?";
        break;
        case 4 : 
        document.getElementById("articlePhoto").innerHTML = '<img class="w-100" src="./Image/guitare.png" alt="guitare"/>';
        document.getElementById("articleText").innerHTML = "cette guitare ?";
        break;
        case 5 : 
        document.getElementById("articlePhoto").innerHTML = '<img class="w-100" src="./Image/sac-a-main.jpg" alt="sac"/>';
        document.getElementById("articleText").innerHTML = "ce sac à main ?";
        break;      
    }
}
//gestion de la proposition
function calculResultat() {
    if ( tentative == 11 ) {
        perdu();
    }
    else if ( prixPropose == prix ) {
        gagner();
        }
        else if ( prixPropose > prix ) {
            prixAuDessus();
        }
            else {
                prixAuDessous();
            }
}
function perdu () {
    document.getElementById("affichage").style.color = "red";
    document.getElementById("affichage").innerText = "PERDU !!\nle prix était : " + prix + " €";   
    document.getElementById("form").reset();
    document.getElementById("prix").disabled = true;
}
function prixAuDessus () {
    document.getElementById("affichage").innerText = "Chance n° : " + tentative + "\nVous êtes au dessus du prix";
    document.getElementById("affichage").style.color = "yellow";
}
function prixAuDessous () {
    document.getElementById("affichage").innerText = "Chance n° : " + tentative + "\nVous êtes au dessous du prix";
    document.getElementById("affichage").style.color = "yellow";
}
function gagner () {
    document.getElementById("affichage").innerText = "Bravo Vous avez GAGNÉ !!\nPrix : " + prix + " €";
    document.getElementById("affichage").style.color = "green";
    const affichageArticle = document.querySelector("#articlePhoto > img ");
    affichageArticle.remove();
    document.getElementById("articlePhoto").innerHTML = '<img class="w-100 gagne" src="./Image/gagne.png" alt="gagne"/>';
    document.getElementById("form").reset();
    document.getElementById("prix").disabled = true;
}
//Début de partie
document.getElementById("jouer").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("prix").disabled = false;
    tentative = 1 ;
    if ( afficher ) {      
        retirerAffichage();
        afficher = false;
    }
    determinerArticle ();
});
//collecte des informations du formulaire
document.getElementById("prix").addEventListener("click", function(event) { 
    event.preventDefault();
    prixPropose = Math.floor(document.getElementById("prixPropose").value);
    calculResultat();
    tentative = tentative + 1;
});