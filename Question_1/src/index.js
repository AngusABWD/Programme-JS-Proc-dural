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
let genre = "defaut";
let age = 0;
let boutonResulat = false;//pour savoir si un bouton de résulat est affiché ou non
// creation de l'objet bouton pour afficher le résultat avec comme argument sa couleur et son message
class AfficherResulat {
    constructor(class_bouton, value_bouton) {
        this.class_bouton = class_bouton;
        this.value_bouton = value_bouton;
    }
    // définition de la méthode afficher
    afficher() {
        const affichage = document.createElement("div");
        $("#affichage").append(affichage);
        $("#affichage > div").html('<input class="btn btn-danger" type="button" Value="Merci de cocher un genre" onclick="rezet()"/>');
        $("#affichage div > input ").removeClass("btn-danger");
        $("#affichage div > input ").addClass(this.class_bouton);
        $("#affichage div > input ").removeAttr("value");
        $("#affichage div > input ").attr("value", this.value_bouton);
        boutonResulat = true;
    }
}
let imposable = new AfficherResulat("btn-danger", "Vous êtes imposable");
let nonImposable = new AfficherResulat("btn-success", "Vous êtes non-imposable");
let recommencer = new AfficherResulat("btn-warning", "Merci de cocher un genre");

//fonction de test sur l'impôt
function testImposable() {
    if ( genre == "homme" && age >= 20) {
        imposable.afficher();
    }
    else if ( genre == "femme" && ( age >= 18 && age <= 35)) {
        imposable.afficher();
        }
        else if ( genre == undefined) {
            recommencer.afficher();
            }
            else {
                nonImposable.afficher();
            }
}
//reset du formulaire
function rezet() { 
    retirerBouton();
    $('#form').trigger("reset");
    boutonResulat = false;
}
//retrait du bouton du document
function retirerBouton() {
    const affichage = $("#affichage > div ");
    affichage.remove(); 
}

//collecte des informations du formulaire
$("#savoir").on("click", function(event) { 
    event.preventDefault();
    //pour pouvoir ressaisir après sans reset 
    if ( boutonResulat ) {      
        retirerBouton();
    }
    genre = $("input[name=genre]:checked").val();
    age = $("#age").val();
    testImposable();
});