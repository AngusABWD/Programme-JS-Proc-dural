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
//nous utiliserons ici un système de point pour avoir un score correspondant au niveau de sécurité
//nous utilisaerons des Regex pour chaque critères ( sauf la longueur )
let point = 0;
//variable test afin d'afficher l'analyse en temps réel
let minuscule = false;
let majuscule = false;
let special = false;
let chiffre = false;
let longueur = false;

//Definition d'un objet qui collectera sa propre information et affectera le score en conséquence
class CollecteInformation {
    constructor (critere, id , regex) {
        this.critere = critere;
        this.id = id; 
        this.regex = regex;
    }
    // définition de la méthode collecte et test
    collecte() {
            let information = document.getElementById("motDePasse").value.match(this.regex);
            if ( information && this.critere == false ) {
                point = point + 1;
                document.getElementById(this.id).classList.replace("text-danger","text-success");
                this.critere = true;
            }
            else if ( !information && this.critere == true ) {
                point = point - 1;
                document.getElementById(this.id).classList.replace("text-success","text-danger");
                this.critere = false;
            }
    }
}
let testMinuscule = new CollecteInformation( minuscule, "minuscule", /[a-z]/g);
let testMajuscule = new CollecteInformation( majuscule, "majuscule", /[A-Z]/g);
let testSpecial = new CollecteInformation( special, "special", /[&~#{}|@£¤ù%µ*§$]/g);
let testChiffre = new CollecteInformation( chiffre, "chiffre", /[0-9]/g);

function testLongueur() {
    let information = document.getElementById("motDePasse").value;
    if (( information.length >= 8 ) && longueur == false ) {
        point = point + 1;
        document.getElementById("longueur").classList.replace("text-danger","text-success");
        longueur = true;
    }
    else if (( information.length < 8 ) && longueur == true ) {
        point = point - 1;
        document.getElementById("longueur").classList.replace("text-success","text-danger");
        longueur = false;
    }
}
function retirerResultat() {
    const affichage = document.querySelector("#affichage > div ");
    affichage.remove(); 
}
//affichage des résultats, nous estimerons que le niveau devient "Moyen" lorsque 3 critères minimums sont réunis
function afficher() {
    const affichage = document.createElement("div");
    switch (point) {
        case 0 :
        case 1 :
        case 2 :
            affichage.innerHTML = '<p class="h1 text-danger">DANGEREUX</p>';
            document.getElementById("affichage").appendChild(affichage);
            break;
        case 3 :
            affichage.innerHTML = '<p class="h1 text-warning">Moyen</p>';
            document.getElementById("affichage").appendChild(affichage);
            break;
        case 4 :
            affichage.innerHTML = '<p class="h1 text-success">Sécurisé</p>';
            document.getElementById("affichage").appendChild(affichage);
            break;
        case 5 :
            affichage.innerHTML = '<p class="h1 text-primary">Très Sécurisé</p>';
            document.getElementById("affichage").appendChild(affichage);
            break;           
    }  
}

//collecte et traitement des informations du formulaire
document.getElementById("motDePasse").addEventListener("input", function() { 
    retirerResultat();
    testMinuscule.collecte();
    testMajuscule.collecte();
    testSpecial.collecte();
    testChiffre.collecte();
    testLongueur();
    afficher()
});





