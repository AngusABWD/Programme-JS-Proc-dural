// ce jeux n'est pas conçu pour mobile ( glisser / coller )
let enigme;
let tour;
let tabPion=[];
let tabEnigme= [];
let tabPionLigne = [];
let enigmeCouleur;
let pionCouleur;
let testEnigme = false;
const tabCouleur = ["rouge","vert","jaune","bleu","blanc","violet"];

//Objet pour les compteurs de pion de chaque couleur qui permettrons de vérifier si des pions dans une ligne
//placés au mauvais emplacement sont multiples
class NombreDePion {
    constructor ( tab) {
        this.tab = tab;
    }
    test (couleur) {
    let compteur = 0;
        for ( i=0 ; i<4 ; i++ ) {
            if ( this.tab[i] == couleur ){
                compteur = compteur + 1;
            }
        } 
    return compteur;       
    }
}
let nombreDePionEnigme = new NombreDePion(tabEnigme);
let nombreDePion = new NombreDePion(tabPionLigne);

//Objet pour les couleur à découvrir ( Enigme )
class Enigme {
    constructor(id) {
        this.id = id;
    }
    selection() {
        //definition aléatoire de la couleur
        const aleatoire = Math.floor(Math.random() * 6) + 1;

        switch(aleatoire) {
            case 1 :
            enigme = "<div class='ball rouge'></div>";
            break;
            case 2 :
            enigme = "<div class='ball vert'></div>";
            break;
            case 3 :
            enigme = "<div class='ball jaune'></div>";
            break;
            case 4 :
            enigme = "<div class='ball bleu'></div>";
            break;
            case 5 :
            enigme = "<div class='ball blanc'></div>";
            break;
            case 6 :
            enigme = "<div class='ball violet'></div>";
            break;
        }
        const affichage = document.querySelector("#" + this.id + " > div");
        affichage.remove();
        const element = document.createElement("div");
        element.innerHTML= enigme;
        document.getElementById(this.id).appendChild(element);
    }
}
const enigme1 = new Enigme("enigme1");
const enigme2 = new Enigme("enigme2");
const enigme3 = new Enigme("enigme3");
const enigme4 = new Enigme("enigme4");

// fonction de gestion du glisser coller sur la ligne active "able"
function dragStart(event) {
    event.dataTransfer.clearData();
    event.dataTransfer.setData("text/plain", event.target.id);
}
//Permet d'identifier une zone de dépot
function dropZone(event,id) {
    if ( document.getElementById(id).classList.contains("able")) {
    event.preventDefault();
    document.getElementById(id).style.transform = "scale(1.3)";
    setTimeout( function() { 
        document.getElementById(id).style.transform = "scale(1)";
        }, 800);
    }
}
//permet de déposer un pion en retirant le précédent et de le cloner afin qu'il soit réutilisable
function drop(event, idCible) { 
    event.preventDefault();  
    if ( document.getElementById(idCible).classList.contains("able")) {
    const affichage = document.querySelector("#" + idCible + " > div");  
    const id = event.dataTransfer.getData("text")
    const draggableElement = document.querySelector("#" + id + " > div");
    const draggableElementClone = draggableElement.cloneNode(false);
    document.getElementById(idCible).appendChild(draggableElement);  
    document.getElementById(id).appendChild(draggableElementClone);
    affichage.remove();
    }
}
//Voir si on a gagner , perdu ou si on passe au tour suivant
function testGagneOuFin() {
    let compteBon = 0;
    for ( i=0; i<4; i++ ) {
        if ( tabPion[i] == 2 ) {
            compteBon = compteBon + 1; 
        }
    }
    if ( compteBon == 4 ) {
        gagner();
    }
    else if ( tour == 12 ) {
            perdu();
        }
        else {
            tour = tour + 1;
            passerAuTourSuivant(tour);
        }
}
function perdu() {
    document.getElementById("score").innerText = "Perdu";
    document.getElementById("final").innerText= "PERDU !!";
    document.getElementById("final").style.color = "red";
    montrerEnigme();
}
function gagner() {
    let score = 13 - tour;
    document.getElementById("score").innerText = score;
    document.getElementById("final").innerText= "GAGNÉ votre score   " + score;
    document.getElementById("final").style.color = "green";
    montrerEnigme();
}
//Permet d'autoriser le dépot dans la ligne devenu courante
function passerAuTourSuivant() {
    tabPion=[];
    for ( i=1; i<5; i++) {
    document.getElementById("affichage" + i + "-" + tour).classList.add("able");
    document.getElementById("final").innerText= "Tour\nn° " + tour;
    document.getElementById("final").style.color = "#9f653e";
    }
}
//Permet d'interdir le dépot dans la ligne devenu précédente
function tourPrecedent(){
    for ( i=1; i<5; i++) {
    document.getElementById("affichage" + i + "-" + tour).classList.remove("able");
    }
}
//Raz du tableau de test des pions
function effacerLesPions() {
    document.getElementById("score").innerText = "";
    document.getElementById("final").innerText= "";
    tabPion=[];
    for ( i=1; i<13; i++) {
        for ( j=1; j<5; j++) {
            const affichage = document.querySelector("#affichage" + j + "-" + i + " > div");
            affichage.remove();
            const element = document.createElement("div");
            document.getElementById("affichage" + j + "-" + i).appendChild(element);
        }
    }
    for ( i=1; i<13; i++) {
        for ( j=1; j<5; j++) {
        if ( document.getElementById("affichageMin" + j + "-" + i).classList.contains("rouge") ) {
            document.getElementById("affichageMin" + j + "-" + i).classList.remove("rouge");
        }
        else if ( document.getElementById("affichageMin" + j + "-" + i).classList.contains("blanc") ) {
                document.getElementById("affichageMin" + j + "-" + i).classList.remove("blanc");
            }
        }
    }
}
//créer un tableau TabPion qui retourne les valeur des pions suivant la régle du MasterMind
// 2 si le piont est bien placé
// 1 si il est à une autre place ( mais en vérifiant que le nombre de 1 soit egale au nombre de pions a découvrir pour la même couleur)
// 0 si il n'est pas dans les pions à decouvrir ou si il y a deja le nombre de piont de cette couleur à decouvrir de compter
function comparerLesPions() {
    for ( i=1; i<5; i++) {
        enigmeCouleur = document.querySelector("#enigme" + i + " div > div");
        enigmeCouleur = attribuerCouleur(enigmeCouleur);     
        pionCouleur = document.querySelector("#affichage" + i + "-" + tour + " > div");
        pionCouleur = attribuerCouleur(pionCouleur);
        tabEnigme[i-1] = enigmeCouleur;
        tabPionLigne[i-1] = pionCouleur;
    }
    let compteurPionRouge = nombreDePion.test("rouge");
    let compteurEnigmeRouge = nombreDePionEnigme.test("rouge");
    let compteurPionVert = nombreDePion.test("vert");
    let compteurEnigmeVert = nombreDePionEnigme.test("vert");
    let compteurPionJaune = nombreDePion.test("jaune");
    let compteurEnigmeJaune = nombreDePionEnigme.test("jaune");
    let compteurPionBleu = nombreDePion.test("bleu");
    let compteurEnigmeBleu = nombreDePionEnigme.test("bleu");
    let compteurPionBlanc = nombreDePion.test("blanc");
    let compteurEnigmeBlanc = nombreDePionEnigme.test("blanc");
    let compteurPionViolet = nombreDePion.test("violet");
    let compteurEnigmeViolet = nombreDePionEnigme.test("violet");

    for (i=0; i<4; i++)   {
        if ( tabPionLigne[i] == tabEnigme[i] ) {
            tabPion[i] = 2;
            compteurPionRouge = retraitPionValide("rouge", compteurPionRouge);
            compteurEnigmeRouge = retraitPionValide("rouge", compteurEnigmeRouge);
            compteurPionVert = retraitPionValide("vert", compteurPionVert);
            compteurEnigmeVert = retraitPionValide("vert", compteurEnigmeVert);
            compteurPionJaune = retraitPionValide("jaune", compteurPionJaune);
            compteurEnigmeJaune = retraitPionValide("jaune", compteurEnigmeJaune);
            compteurPionBleu = retraitPionValide("bleu", compteurPionBleu);
            compteurEnigmeBleu = retraitPionValide("bleu", compteurEnigmeBleu);
            compteurPionBlanc = retraitPionValide("blanc", compteurPionBlanc);
            compteurEnigmeBlanc = retraitPionValide("blanc", compteurEnigmeBlanc);
            compteurPionViolet = retraitPionValide("violet", compteurPionViolet);
            compteurEnigmeViolet = retraitPionValide("violet", compteurEnigmeViolet);
        }
        else {
            tabPion[i] = 0;
        }
    } 
    //chaque boucle doit être effectuée après la fin de la précedente pour ne pas que les variables
    // s'écrasent, ainsi nous ferons un test indépendant pour chaque couleur si l'element du tableau 
    // n'est pas affecté ( 0 )  
    testPion("rouge",compteurPionRouge, compteurEnigmeRouge);
    testPion("vert",compteurPionVert, compteurEnigmeVert);
    testPion("jaune",compteurPionJaune, compteurEnigmeJaune);
    testPion("bleu",compteurPionBleu, compteurEnigmeBleu);
    testPion("blanc",compteurPionBlanc, compteurEnigmeBlanc);
    testPion("violet",compteurPionViolet, compteurEnigmeViolet);
}
function testPion ( couleur, compteurPion, compteurEnigme) {
    for ( i=0; i<4; i++) {
        if ( tabPion[i] == 0) {
            for ( j=0; j<4; j++) {
            if ( tabPionLigne[i] == tabEnigme[j] ) {
                compteurPion = testerPion(couleur, compteurPion, compteurEnigme);        
            }
            else if ( tabPion[i] !=1 ) {
                tabPion[i] = 0;
                }
            }
            if (testEnigme) {
                compteurEnigme = compteurEnigme - 1;
                testEnigme = false;
              }  
        }
    }
}
//test si un pion à la mauvaise place existe en plusieurs exemplaires dans la proposition
function testerPion (couleur, compteurPion, compteurEnigme) {
    if ( tabPionLigne[i] == couleur ) {
        if ( compteurPion != 0 && compteurEnigme != 0) {
            if ( compteurPion > compteurEnigme ) {
                tabPion[i] = 0;
                compteurPion = compteurPion - 1;
            } 
            else {
                tabPion[i] = 1;
                testEnigme = true;

            }  
        }
        else {
            tabPion[i] = 0;
        }    
    }
    return compteurPion; 
}
//Décompte un pion valide du nombre de pion "disponible"
function retraitPionValide(couleur, compteur) {
    if ( tabPionLigne[i] == couleur ) {
    compteur = compteur - 1;
    }
    return compteur;
}
//affichage des indices dans le tableau latéral, afin de le faire de façon aléatoire
//nous ferons en premier un mélange aléatoire du tableau tabPion
//pour cela nous utiliserons l'agorithme de Fisher-Yates
function afficherIndices() {
    for ( i=3 ; i>0; i-- ) {
        let j = Math.floor( Math.random() * ( i + 1));
        [tabPion[i],tabPion[j]] = [tabPion[j],tabPion[i]];
    } 
    for ( i=0; i<4; i++) {
        if ( tabPion[i] == 2 ) {
            document.getElementById("affichageMin" + (i + 1) + "-" + tour).classList.add("rouge");
        }
        else if ( tabPion[i] == 1 ) {
                document.getElementById("affichageMin" + (i + 1) + "-" + tour).classList.add("blanc");
            }
    }
}

//Fonction d'attribution d'une couleur à un element enfant
function attribuerCouleur(typeCouleur) {
    let element = typeCouleur;
    for ( j=0 ; j<6; j++) {
        if ( element.classList.contains(tabCouleur[j])){
            typeCouleur = tabCouleur[j];
        } 
    }
    return typeCouleur;
}
function cacherEnigme() {
        document.getElementById("solution").style.opacity = 0;
}
function montrerEnigme() {
        document.getElementById("solution").style.opacity = 1;
}
//Début de partie
document.getElementById("debut").addEventListener("click", function() { 
    effacerLesPions();
    cacherEnigme();
    enigme1.selection();
    enigme2.selection();
    enigme3.selection();
    enigme4.selection();
    tour = 1;
    passerAuTourSuivant(tour);
});
//jouer
document.getElementById("valide").addEventListener("click", function(event) { 
    event.stopPropagation;
    event.preventDefault;
    tourPrecedent(tour);
    comparerLesPions();
    afficherIndices();
    testGagneOuFin();
});
