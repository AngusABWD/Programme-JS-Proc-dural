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
let billet10 = 0;
let billet5 = 0;
let piece = 0;
let montantAchat = 0;
let montantPaye = 0;
let resulat = false;//pour savoir si un bouton de résulat est affiché ou non

// définition de la fonction afficher
function afficher() {
    const affichage = document.createElement("div");
    document.getElementById("affichage").appendChild(affichage);
    document.querySelector("#affichage > div ").classList.add("h4");  
    const affichageBillet10 = document.createElement("p");
    document.querySelector("#affichage > div").appendChild(affichageBillet10);
    affichageBillet10.innerText = "Nombre de billets de 10 € = " + billet10;
    const affichageBillet5 = document.createElement("p");
    document.querySelector("#affichage > div").appendChild(affichageBillet5);
    affichageBillet5.innerText = "Nombre de billets de 5 € = " + billet5;
    const affichagePiece = document.createElement("p");
    document.querySelector("#affichage > div").appendChild(affichagePiece);
    affichagePiece.innerText = "Nombre de pièces de 1 € = " + piece;
    resulat = true;
}
function afficherErreur() {
    const affichage = document.createElement("div");
    affichage.innerHTML = "<button class='btn btn-danger' type='button'/>Vous n'avez pas assez payé !!</button>";
    document.getElementById("affichage").appendChild(affichage);
    resulat = true;
}
//calcul du rendu monnaie
function calculMonnaie() {
    if ( montantPaye < montantAchat) {//verification que la somme est suffisante
        afficherErreur(); 
    }
    else {
        let monnaie = montantPaye - montantAchat; //calcul de la monnaie à rendre
        while ( monnaie >= 10) {// premiere boucle pour les billet de 10 
            monnaie = monnaie - 10;
            billet10 = billet10 + 1;
        }
        while ( monnaie >= 5) {// seconde boucle pour les billet de 5 ( même si il n'y en aura toujours 1 c'est plus rapide qu'une condition )
            monnaie = monnaie - 5;
            billet5 = billet5 + 1;
        }
        piece = monnaie; // le reste sera forcément en pièces de 1
        afficher();     
    }    
}
//retrait du résultat du document
function retirerResultat() {
    const affichage = document.querySelector("#affichage > div ");
    affichage.remove(); 
    billet10 = 0;//initialisation des variables d'affichage
    billet5 = 0;
    piece = 0;
}

//collecte des informations du formulaire
document.getElementById("monnaie").addEventListener("click", function(event) { 
    event.preventDefault();
    montantAchat = Math.floor(document.getElementById("montantAchat").value);
    montantPaye = Math.floor(document.getElementById("montantPaye").value);
    //pour pouvoir ressaisir après sans reset 
    if ( resulat ) {      
        retirerResultat();
    }
    calculMonnaie();
});