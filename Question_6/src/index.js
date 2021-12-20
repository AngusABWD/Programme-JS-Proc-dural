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
//nous utiliserons ici un système de point pour avoir un score correspondant au tarif
//nous testerons d'abord si le client est eligible à l'assurance 
//puis ajouterons une bonification suivant son ancienneté
let point = 0;
let refus = false;

//Definition d'un objet qui collectera sa propre information et affectera le score en conséquence
class CollecteInformation {
    constructor (id ,limite ) {
        this.id = id; 
        this.limite = limite;
    }
    // définition de la méthode collecte
    collecte() {
            let information = document.getElementById(this.id).value;
            if ( this.id == "accident" ) {
                point = point - information;
            }
            else if ( information >= this.limite ) {
                point = point + 1;
            }
    }
}
let age = new CollecteInformation("age", 25);
let permis = new CollecteInformation("permis", 2);
let accident = new CollecteInformation("accident", 10000);
let assurance = new CollecteInformation("assurance", 5);
//définition d'un objet qui définira et affichera la couleur de la réponse
class AfficherTarif {
    constructor(class_bouton, value_bouton) {
        this.class_bouton = class_bouton;
        this.value_bouton = value_bouton;
    }
    // définition de la méthode afficher le tarif
    afficherTarif() {
        const affichage = document.createElement("div");
        affichage.innerHTML = '<input class="btn btn-danger btn-lg" type="button" Value="Votre tarif est rouge" />';
        document.getElementById("affichage").appendChild(affichage);
        document.querySelector("#affichage div > input ").classList.replace("btn-danger", this.class_bouton);
        document.querySelector("#affichage div > input ").removeAttribute("value");
        document.querySelector("#affichage div > input ").setAttribute("value", this.value_bouton)
    }
}
let rouge = new AfficherTarif("btn-danger", "Votre tarif est Rouge");
let orange = new AfficherTarif("btn-warning", "Votre tarif est Orange");
let vert = new AfficherTarif("btn-success", "Votre tarif est Vert");
let bleu = new AfficherTarif("btn-info", "Votre tarif est Bleu");
//retrait du résultat
function retirerResulat() {
    point = 0;// pour reinitialiser en cas de nouvelle recherche
    const affichage = document.querySelector("#affichage > div ");
    affichage.remove(); 
}
//test si le client est éligible à l'assurance puis au bonus fidélité
function testAcceptabilite() {
    if ( point < 0) {
        refus = true;
    }
    else {
        assurance.collecte();
    }
}
//affichage des résultats
function afficher() {
    if (refus) {
        const affichage = document.createElement("div");
        affichage.innerText = "Votre dossier est refusé";
        document.getElementById("affichage").appendChild(affichage);
        document.querySelector("#affichage > div ").classList.add("h1");
        refus = false;
    }
    else {
        switch (point) {
            case 0 :
                rouge.afficherTarif();
                break;
            case 1 :
                orange.afficherTarif();
                break;
            case 2 :
                vert.afficherTarif();
                break;  
            case 3 :
                bleu.afficherTarif();
                break;           
        }
    }
}
//collecte et traitement des informations du formulaire
document.getElementById("tarif").addEventListener("click", function(event) { 
    event.preventDefault();
    retirerResulat();
    age.collecte();
    permis.collecte();
    accident.collecte();
    testAcceptabilite();
    afficher()
});





