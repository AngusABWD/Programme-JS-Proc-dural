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
//Début de l'exercie
let afficher = false;
let lettre;
let motSoumis;
let mot;
let bonneLettre = 0;
let tentative = 1;
let mots = ["recommandation", "parallélisâtes", "retransmettras", "déharnachaient", "transpyrénéens", "personnalisera", "sous-alimentes", "sténographiiez", "chantournerons", "primariserions", "emprisonneriez", "self-induction", "dépolitiserait", "débâillonnasse", "rediscutassiez", "réécoutassions", "embouteillerai", "reficelassions", "calomnieraient", "mouronnassions", "décontenançais", "tambourinaient", "convulsionnées", "reblanchissons", "réinitialisent", "pieds-de-biche", "engrumelassiez", "bouleverseriez", "dégoudronnâmes", "topographiques", "supplantassiez", "engrangeassiez", "culpabiliseras", "métallisations", "oblitératrices", "sonoriseraient", "caractérisâtes", "saint-glinglin", "enlumineraient", "désassemblions", "ingouvernables", "didactiquement", "parementerions", "rattachassions", "parangonnaient", "remercieraient", "télédiffusâtes", "surenchérissez", "désassortisses", "concrétiseriez", "désacraliserai", "désapprendront", "rétrogradèrent", "déconnectèrent", "caparaçonnerez", "falsifieraient", "navires-écoles", "contrarotative",
            "désexualisasse", "travestissions", "prédéterminent", "échafaudassiez", "scissionnerais", "parasitassions", "axiomatisaient", "stridulassions", "atterrissement", "réessaieraient", "frisotteraient", "contreviendras", "fermentescible", "pétitionneriez", "cosmétiquaient", "déterminatives", "préhistorienne", "ensoleillaient", "prononçassions", "pindariserions", "raccoutumerais", "sud-américains", "décomprimasses", "configurerions", "encoffreraient", "désaccouplerez", "hyperréalismes", "maximaliserons", "représenterons", "décompressâtes", "courbaturasses", "souffletterais", "hydrogéologies", "revitalisèrent", "mécontenterais", "paralittéraire", "raccoutumèrent", "conventionnera", "emmaillotasses", "transistorisas", "inassimilables", "précombustions", "électrolyserai", "décompléteront", "décommanderait", "désatelliserai", "réinstalleriez", "télémécanicien", "désavouassions", "perturbassions", "dépatouillâmes", "plastronnerais", "tyrannisassiez", "suralimenterai", "crédibiliserez", "hydrolysassent", "renégociassent", "médicaliserait", "caparaçonnâmes", "goujonneraient", "stationnassent", "entre-heurtiez", "dénivelassions", "grumelleraient", "sursaturassiez", "pied-de-cheval", "pleurnicherais", "triséqueraient", "hydrogénerions", "confessionnels", "pneumoconioses", "paraphraseriez", "démaquilleront", "dénucléarisent", "couchaillerait", "entrecroiserez", "décapuchonnais", "juxtalinéaires", "cauchemarderez", "tuberculinisée", "cautérisassiez", "farfouillerons", "désenveloppera", "rediffusassent", "zinzinulerions", "interviendrons",
            "radiobalisasse", "déplantassions", "déshumaniseras", "décarbonaterai", "démonétiseriez", "réimplanterons"];
let htmlPerdu = '<img class="w-100" src="./Image/pendu.png" alt="pendu"/>';
let htmlGagne = '<img class="w-100" src="./Image/gagne.png" alt="gagne"/>';
document.getElementById("soumettreLettre").disabled = true;
document.getElementById("soumettreMot").disabled = true;

//création de l'objet final ( DRY )
class Final {
    constructor ( color, html) {
        this.color = color;
        this.html = html;
    }
    afficher() {
        document.getElementById("affichage").style.color = this.color;
        const element = document.createElement("div");
        document.getElementById("affichage").appendChild(element);
        document.querySelector("#affichage > div").innerHTML = this.html;
        document.getElementById("affichage").classList.remove("center");
        document.getElementById("form").reset();
        document.getElementById("soumettreLettre").disabled = true;
        document.getElementById("soumettreMot").disabled = true;
        afficher = true;
    }
}
let Perdu = new Final( " red", htmlPerdu);
let Gagne = new Final( "green", htmlGagne);
//retrait de l'affichage du document
function retirerAffichage() {
    for ( i=1 ; i<15; i++) {
        document.getElementById("lettre" + i ).innerText = "_";
    }
}
// determination du mot dans la liste passage en majuscule pour comparer sans erreur
function determinerMot() {
    let numeroMot = Math.floor( Math.random() * 150 ) + 1;
    mot = mots[numeroMot];
    mot = mot.toUpperCase();
}
//analyse et affichage des résultats
function calculResultat() {
    for ( i=0; i<14; i++) {
        if ( lettre == mot.charAt(i) ) {
            let j = i + 1;
            bonneLettre = bonneLettre + 1;
            document.getElementById("lettre" + j).innerText = mot.charAt(i);
        }
    }
    if ( tentative == 8 ) {
        document.getElementById("soumettreLettre").disabled = true;
    }
    if ( bonneLettre == 14 ) {
        gagner();
        }
    else {
        tourSuivant();
    }        
}
function soumettreMot() {
    if ( motSoumis == mot ){
        gagner();
    }
    else {
        perdu();
    }
}
function perdu () {
    document.getElementById("affichage").innerText = "Perdu\nLe mot est : " + mot; 
    Perdu.afficher();
}
function tourSuivant () {
    tentative = tentative + 1;
    document.getElementById("affichage").innerText = "Tentative n° : " + tentative;
    document.getElementById("affichage").style.color = "white";
    afficher = true;
    document.getElementById("form").reset();
}
function gagner () {
    document.getElementById("affichage").innerText = "Le mot est : " + mot;
    Gagne.afficher();
}
// Début de la partie
document.getElementById("jouer").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("soumettreLettre").disabled = false;
    document.getElementById("soumettreMot").disabled = false;
    bonneLettre = 0;
    tentative = 1 ;
    document.getElementById("affichage").innerText = "Tentative n° : " + tentative;
    document.getElementById("affichage").style.color = "white";
    if ( afficher ) {      
        retirerAffichage();
        document.getElementById("affichage").classList.add("center");
        afficher = false;
    }
    determinerMot ();
});
//collecte des informations des formulaires
//Ici nous pourrions DRY la sturcture est simillaire mais comme chaque ligne
//possède son propre argument au final le DRY est plus long.
document.getElementById("soumettreLettre").addEventListener("click", function(event) { 
    event.preventDefault();
    lettre = document.getElementById("lettre").value;
    lettre = lettre.toUpperCase();
    calculResultat();
  
});
document.getElementById("soumettreMot").addEventListener("click", function(event) { 
    event.preventDefault();
    motSoumis = document.getElementById("mot").value;
    motSoumis = motSoumis.toUpperCase();
    soumettreMot();
});