
//nous utiliserons une Regex afin de comparer la validité de la saisie
//j'ai choisi la Regex offcielle du RFC 5322 pour être très complet
let valide = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//collecte des informations du formulaire
document.getElementById("email").addEventListener("input", function(event) { //l'utilisation de "input" permet un contrôle en temps réel sans validation
    if ( event.target.value.match(valide)) {
        retirerResultat();
        document.getElementById("email").classList.replace( "bg-danger", "bg-success" );
        const affichage = document.createElement("div");
        affichage.innerHTML = '<p class="h1 text-success">Adresse Valide</p>';
        document.getElementById("affichage").appendChild(affichage);
    }
    else {
        retirerResultat();
        document.getElementById("email").classList.replace( "bg-success", "bg-danger" );
        const affichage = document.createElement("div");
        affichage.innerHTML = '<p class="h1 text-danger">Adresse Invalide</p>';
        document.getElementById("affichage").appendChild(affichage);
    }
});

function retirerResultat() {
    const affichage = document.querySelector("#affichage > div ");
    affichage.remove(); 
}