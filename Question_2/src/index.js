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

let nombrePhotocopie = 0;
let devisAfficher = false;//pour savoir si un bouton de résulat est affiché ou non

//fonction de chiffrage et affichage sous forme de devis
function calculDevis() {
    let prixTotal = 0;
    let prix10 = 0;// prix jusqu'a 10 photocopies
    let prix20 = 0;// prix entre 10 et 20 photocopies
    let prix30 = 0;// prix au dela de 30 photocopies
    const affichage = document.createElement("div");
    document.getElementById("affichage").appendChild(affichage);
    document.querySelector("#affichage > div ").classList.add("bg-white");  
    document.querySelector("#affichage > div ").classList.add("text-black");      
    devisAfficher = true;
    if ( nombrePhotocopie >= 0 && nombrePhotocopie <= 10 ) {
        prix10 = 0.10 * nombrePhotocopie;
        prixTotal = prix10;
        const affichagePrix10 = document.createElement("p");
        document.querySelector("#affichage > div ").appendChild(affichagePrix10);
        affichagePrix10.innerText = "prix jusqu'a 10 photocopies : " + nombrePhotocopie + " x 0.10 € = " + prix10 + " €";
        const affichagePrixTotal = document.createElement("p");
        document.querySelector("#affichage > div ").appendChild(affichagePrixTotal);
        affichagePrixTotal.innerText = "Prix Total : " + nombrePhotocopie + " photocopies " + prixTotal + " €";
    }
        else if ( nombrePhotocopie > 10 && nombrePhotocopie <= 30) {
            prix10 = 1;
            prix20 = Math.round((nombrePhotocopie - 10 )* 9)/100;
            prixTotal = Math.round((prix10 + prix20)*100)/100;
            const affichagePrix10 = document.createElement("p");
            document.querySelector("#affichage > div ").appendChild(affichagePrix10);
            affichagePrix10.innerText = "prix jusqu'à 10 photocopies : 10 x 0.10 € = " + prix10 + " €";
            const affichagePrix20 = document.createElement("p");
            document.querySelector("#affichage > div ").appendChild(affichagePrix20);
            affichagePrix20.innerText = "prix entre 11 et 30 photocopies : " + ( nombrePhotocopie - 10 ) + " x 0.09 € = " + prix20 + " €";
            const affichagePrixTotal = document.createElement("p");
            document.querySelector("#affichage > div ").appendChild(affichagePrixTotal);
            affichagePrixTotal.innerText = "Prix Total pour " + nombrePhotocopie + " photocopies " + prixTotal + " €";
        }
            else if ( nombrePhotocopie > 30) {
                prix10 = 1;
                prix20 = 1.8;
                prix30 = Math.round((nombrePhotocopie - 30 )* 8)/100;
                prixTotal = Math.round((prix10 + prix20 + prix30)*100)/100;
                const affichagePrix10 = document.createElement("p");
                document.querySelector("#affichage > div ").appendChild(affichagePrix10);
                affichagePrix10.innerText = "prix jusqu'à 10 photocopies : 10 x 0.10 € = " + prix10 + " €";
                const affichagePrix20 = document.createElement("p");
                document.querySelector("#affichage > div ").appendChild(affichagePrix20);
                affichagePrix20.innerText = "prix entre 11 et 30 photocopies : 20 x 0.09 € = " + prix20 + " €";
                const affichagePrix30 = document.createElement("p");
                document.querySelector("#affichage > div ").appendChild(affichagePrix30);
                affichagePrix30.innerText = "prix au delà de 30 photocopies : " + ( nombrePhotocopie - 30 ) + " x 0.08 € = " + prix30 + " €";
                const affichagePrixTotal = document.createElement("p");
                document.querySelector("#affichage > div ").appendChild(affichagePrixTotal);
                affichagePrixTotal.innerText = "Prix Total pour : " + nombrePhotocopie + " photocopies " + prixTotal + " €";
            }
            else {
                alert( "Merci de rentrer un nombre de photocopies positif" )
            }
}
//retrait du devis du document
function retirerDevis() {
    const affichage = document.querySelector("#affichage > div ");
    affichage.remove(); 
}
//collecte des informations du formulaire
document.getElementById("devis").addEventListener("click", function(event) { 
    event.preventDefault();
    //pour pouvoir ressaisir après 
    if ( devisAfficher ) {      
        retirerDevis();
    }
    nombrePhotocopie = document.getElementById("nombrePhotocopie").value;
    calculDevis();
});