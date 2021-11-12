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
        affichage.innerHTML = '<input class="btn btn-danger" type="button" Value="Merci de cocher un genre" onclick="rezet()"/>';
        document.getElementById("affichage").appendChild(affichage);
        document.querySelector("#affichage div > input ").classList.replace("btn-danger", this.class_bouton);
        document.querySelector("#affichage div > input ").removeAttribute("value");
        document.querySelector("#affichage div > input ").setAttribute("value", this.value_bouton)
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
        else if ( genre == "defaut") {
            recommencer.afficher();
            }
            else {
                nonImposable.afficher();
            }
}
//reset du formulaire
function rezet() { 
    retirerBouton();
    document.getElementById('form').reset();
    boutonResulat = false;
}
//retrait du bouton du document
function retirerBouton() {
    const affichage = document.querySelector("#affichage > div ");
    affichage.remove(); 
}

//collecte des informations du formulaire
document.getElementById("savoir").addEventListener("click", function(event) { 
    event.preventDefault();
    //pour pouvoir ressaisir après sans reset 
    if ( boutonResulat ) {      
        retirerBouton();
    }
    if ( document.getElementById("homme").checked) {
        genre = "homme";
    }
    else if ( document.getElementById("femme").checked ) {
        genre = "femme";
        }  
        else {
            genre= "defaut";
        }
    age = document.getElementById("age").value;
    testImposable();
});