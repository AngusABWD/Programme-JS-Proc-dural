//definition des couleurs à découvrir (énigmes)
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
function passerAuTour() {
    tabPion=[];
    for ( i=1; i<5; i++) {
    document.getElementById("affichage" + i + "-" + tour).classList.add("able");
    }
}
function tourPrecedent(){
    for ( i=1; i<5; i++) {
    document.getElementById("affichage" + i + "-" + tour).classList.remove("able");
    }
}
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
function comparerLesPions() {
    for ( i=1; i<5; i++) {
        enigmeCouleur = document.querySelector("#enigme" + i + " div > div");
        attribuerCouleurEnigme();     
        pionCouleur = document.querySelector("#affichage" + i + "-" + tour + " > div");
        attribuerCouleurPion();
        tabEnigme[i-1] = enigmeCouleur;
        tabPionLigne[i-1] = pionCouleur;
        console.log(tabEnigme);
        console.log(tabPionLigne);
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
            retraitPionValide("vert", compteurPionVert, compteurEnigmeVert);
            retraitPionValide("jaune", compteurPionJaune, compteurEnigmeJaune);
            retraitPionValide("bleu", compteurPionBleu, compteurEnigmeBleu);
            retraitPionValide("blanc", compteurPionBlanc, compteurEnigmeBlanc);
            retraitPionValide("violet", compteurPionViolet, compteurEnigmeViolet);
        }
        else {
            tabPion[i] = 0;
        }
        console.log(tabPion);
    }    
    for ( i=0; i<4; i++) {
        if ( tabPion[i] == 0) {
            for ( j=0; j<4; j++)
            if ( tabPionLigne[i] == tabEnigme[j] ) {
                if ( tabPionLigne[i] == 'rouge') {
                    if ( compteurPionRouge >= compteurEnigmeRouge ) {
                        tabPion[i] = 0;
                        compteurPionRouge = compteurPionRouge - 1 ;
                    } 
                    else {
                        tabPion[i] = 1;
                    }      
                }
            }
            else if ( tabPion[i] !=1 ) {
                tabPion[i] = 0;
            } 
        } 
    }
}
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
    enigme1.selection();
    enigme2.selection();
    enigme3.selection();
    enigme4.selection();
    partie = true;
    tour = 1;
    passerAuTour(tour);
    jouer();
});