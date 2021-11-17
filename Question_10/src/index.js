
let enigme;
let partie;
let tour;
let tabPion=[];
let tabEnigme= [];
let tabPionLigne = [];
let enigmeCouleur;
let pionCouleur;
let autrePionCouleur;
let rouge = false;
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
//Raz après dépot
function dropEnd(event) {
    event.dataTransfer.clearData();
}
//permet de déposer un pion en retirant le précédent et de le cloner afin qu'il soit réutilisable
function drop(event, idTest) {   
    if ( document.getElementById(idTest).classList.contains("able")) {
    const affichage = document.querySelector("#" + idTest + " > div");
    affichage.remove();
    const id = event.dataTransfer.getData("text")
    const draggableElement = document.querySelector("#" + id + " > div");
    const draggableElementClone = draggableElement.cloneNode(false);
    document.getElementById(idTest).appendChild(draggableElement);  
    document.getElementById(id).appendChild(draggableElementClone);
    }
}
//les étapes du jeux ligne par ligne
function jouer() {
    document.getElementById("valide").addEventListener("click", function() { 
        tourPrecedent(tour);
        comparerLesPions();
        console.log(tabPion);
       // voirsigagner();
        //afficherlesResulat();
        //passerautoursuivant()
    });
}
//Permet d'autoriser le dépot dans la ligne devenu courante
function passerAuTour() {
    tabPion=[];
    for ( i=1; i<5; i++) {
    document.getElementById("affichage" + i + "-" + tour).classList.add("able");
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
    tabPion=[];
    for ( i=1; i<3; i++) {
        for ( j=1; j<5; j++) {
            const affichage = document.querySelector("#affichage" + j + "-" + i + " > div");
            affichage.remove();
            const element = document.createElement("div");
            document.getElementById("affichage" + j + "-" + i).appendChild(element);
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
        attribuerCouleurEnigme();     
        pionCouleur = document.querySelector("#affichage" + i + "-" + tour + " > div");
        attribuerCouleurPion();
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
    for ( i=0; i<4; i++) {
        if ( tabPion[i] == 0) {
            for ( j=0; j<4; j++) {
            if ( tabPionLigne[i] == tabEnigme[j] ) {
                testerPion("rouge", compteurPionRouge, compteurEnigmeRouge);
                compteurPionRouge = incrementerCompteur("rouge", compteurPionRouge);
            }
            else if ( tabPion[i] !=1 ) {
                tabPion[i] = 0;
                }
            }
        }
    }
    for ( i=0; i<4; i++) {
        if ( tabPion[i] == 0) {
            for ( j=0; j<4; j++) {
            if ( tabPionLigne[i] == tabEnigme[j] ) {
                testerPion("vert", compteurPionVert, compteurEnigmeVert);
                compteurPionVert = incrementerCompteur("vert", compteurPionVert);
            }
            else if ( tabPion[i] !=1 ) {
                tabPion[i] = 0;
                }
            }
        } 
    }
    for ( i=0; i<4; i++) {
        if ( tabPion[i] == 0) {
            for ( j=0; j<4; j++) {
            if ( tabPionLigne[i] == tabEnigme[j] ) {
                testerPion("jaune", compteurPionJaune, compteurEnigmeJaune);
                compteurPionJaune = incrementerCompteur("jaune", compteurPionJaune);
            }
            else if ( tabPion[i] !=1 ) {
                tabPion[i] = 0;
                }
            }
        }
    }
    for ( i=0; i<4; i++) {
        if ( tabPion[i] == 0) {
            for ( j=0; j<4; j++) {
            if ( tabPionLigne[i] == tabEnigme[j] ) {
                testerPion("bleu", compteurPionBleu, compteurEnigmeBleu);
                compteurPionBleu = incrementerCompteur("bleu", compteurPionBleu);
            }
            else if ( tabPion[i] !=1 ) {
                tabPion[i] = 0;
                }
            }
        } 
    }
    for ( i=0; i<4; i++) {
        if ( tabPion[i] == 0) {
            for ( j=0; j<4; j++) {
            if ( tabPionLigne[i] == tabEnigme[j] ) {
                testerPion("blanc", compteurPionBlanc, compteurEnigmeBlanc);
                compteurPionBlanc = incrementerCompteur("blanc", compteurPionBlanc);
            }
            else if ( tabPion[i] !=1 ) {
                tabPion[i] = 0;
                }
            }
        }
    }
    for ( i=0; i<4; i++) {
        if ( tabPion[i] == 0) {
            for ( j=0; j<4; j++) {
            if ( tabPionLigne[i] == tabEnigme[j] ) {
                testerPion("violet", compteurPionViolet, compteurEnigmeViolet);
                compteurPionViolet = incrementerCompteur("violet", compteurPionViolet);
            }
            else if ( tabPion[i] !=1 ) {
                tabPion[i] = 0;
                }
            }
        } 
    }
}
//test si un pion à la mauvaise place existe en plusieurs exemplaires dans la proposition
function testerPion (couleur, compteurPion, compteurEnigme) {
    if ( tabPionLigne[i] == couleur ) {
        if ( compteurPion > compteurEnigme ) {
            tabPion[i] = 0;
        } 
        else {
            tabPion[i] = 1;
        }      
    }
}
//Décompte le nombre de pion "disponible" dans la proposition
function incrementerCompteur( couleur, compteurPion ) {
    if ( tabPionLigne[i] == couleur) {
        compteurPion = compteurPion - 1;
    }
    return compteurPion
}
//Décompte un pion valide du nombre de pion "disponible"
function retraitPionValide(couleur, compteur) {
    if ( tabPionLigne[i] == couleur ) {
    compteur = compteur - 1;
    }
    return compteur;
}


//Fonction d'attribution d'une couleur à un element enfant
//Nous sommes ici obligé de répeter le code, en effet la variable " element enfant " ne peux ni être utilisée brut pour une comparaison
//Ni être utilisée comme un attribut d'une autre fonction ( si il y a une autre solution je suis preneur)
//j'ai essayé de la transformer en string mais cela retourne "element.HTML"
function attribuerCouleurEnigme() {
    if ( enigmeCouleur.classList.contains("rouge")){
        enigmeCouleur = "rouge";
    }
        else if ( enigmeCouleur.classList.contains("vert")){
            enigmeCouleur = "vert";
        }
            else if ( enigmeCouleur.classList.contains("jaune")){
                enigmeCouleur = "jaune";
            }
                else if ( enigmeCouleur.classList.contains("bleu")){
                    enigmeCouleur = "bleu";
                }
                    else if ( enigmeCouleur.classList.contains("blanc")){
                        enigmeCouleur = "blanc";
                    }
                        else if ( enigmeCouleur.classList.contains("violet")){
                            enigmeCouleur = "violet";
                        }
}
function attribuerCouleurPion() {
    if ( pionCouleur.classList.contains("rouge")){
        pionCouleur = "rouge";
    }
        else if ( pionCouleur.classList.contains("vert")){
            pionCouleur = "vert";
        }
            else if ( pionCouleur.classList.contains("jaune")){
                pionCouleur = "jaune";
            }
                else if ( pionCouleur.classList.contains("bleu")){
                    pionCouleur = "bleu";
                }
                    else if ( pionCouleur.classList.contains("blanc")){
                        pionCouleur = "blanc";
                    }
                        else if ( pionCouleur.classList.contains("violet")){
                            pionCouleur = "violet";
                        }
}
function attribuerCouleurAutrePion() {
    if ( autrePionCouleur.classList.contains("rouge")){
        autrePionCouleur = "rouge";
    }
        else if ( autrePionCouleur.classList.contains("vert")){
            autrePionCouleur = "vert";
        }
            else if ( autrePionCouleur.classList.contains("jaune")){
                autrePionCouleur = "jaune";
            }
                else if ( autrePionCouleur.classList.contains("bleu")){
                    autrePionCouleur = "bleu";
                }
                    else if ( autrePionCouleur.classList.contains("blanc")){
                        autrePionCouleur = "blanc";
                    }
                        else if ( autrePionCouleur.classList.contains("violet")){
                            autrePionCouleur = "violet";
                        }
}
//Début de partie
document.getElementById("debut").addEventListener("click", function() { 
    effacerLesPions();
    //cacher les enigmes
    enigme1.selection();
    enigme2.selection();
    enigme3.selection();
    enigme4.selection();
    partie = true;
    tour = 1;
    passerAuTour(tour);
    jouer();
});