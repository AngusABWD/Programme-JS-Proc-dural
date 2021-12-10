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
let TabEssais = [];
let trouve = false;
let bonneLettre = 0;
let tentative = 1;
let mots = ["recommandation", "parallélisâtes", "retransmettras", "déharnachaient", "transpyrénéens", "personnalisera", "sous-alimentes", "sténographiiez", "chantournerons", "primariserions", "emprisonneriez", "self-induction", "dépolitiserait", "débâillonnasse", "rediscutassiez", "réécoutassions", "embouteillerai", "reficelassions", "calomnieraient", "mouronnassions", "décontenançais", "tambourinaient", "convulsionnées", "reblanchissons", "réinitialisent", "pieds-de-biche", "engrumelassiez", "bouleverseriez", "dégoudronnâmes", "topographiques", "supplantassiez", "engrangeassiez", "culpabiliseras", "métallisations", "oblitératrices", "sonoriseraient", "caractérisâtes", "saint-glinglin", "enlumineraient", "désassemblions", "ingouvernables", "didactiquement", "parementerions", "rattachassions", "parangonnaient", "remercieraient", "télédiffusâtes", "surenchérissez", "désassortisses", "concrétiseriez", "désacraliserai", "désapprendront", "rétrogradèrent", "déconnectèrent", "caparaçonnerez", "falsifieraient", "navires-écoles", "contrarotative",
            "désexualisasse", "travestissions", "prédéterminent", "échafaudassiez", "scissionnerais", "parasitassions", "axiomatisaient", "stridulassions", "atterrissement", "réessaieraient", "frisotteraient", "contreviendras", "fermentescible", "pétitionneriez", "cosmétiquaient", "déterminatives", "préhistorienne", "ensoleillaient", "prononçassions", "pindariserions", "raccoutumerais", "sud-américains", "décomprimasses", "configurerions", "encoffreraient", "désaccouplerez", "hyperréalismes", "maximaliserons", "représenterons", "décompressâtes", "courbaturasses", "souffletterais", "hydrogéologies", "revitalisèrent", "mécontenterais", "paralittéraire", "raccoutumèrent", "conventionnera", "emmaillotasses", "transistorisas", "inassimilables", "précombustions", "électrolyserai", "décompléteront", "décommanderait", "désatelliserai", "réinstalleriez", "télémécanicien", "désavouassions", "perturbassions", "dépatouillâmes", "plastronnerais", "tyrannisassiez", "suralimenterai", "crédibiliserez", "hydrolysassent", "renégociassent", "médicaliserait", "caparaçonnâmes", "goujonneraient", "stationnassent", "entre-heurtiez", "dénivelassions", "grumelleraient", "sursaturassiez", "pied-de-cheval", "pleurnicherais", "triséqueraient", "hydrogénerions", "confessionnels", "pneumoconioses", "paraphraseriez", "démaquilleront", "dénucléarisent", "couchaillerait", "entrecroiserez", "décapuchonnais", "juxtalinéaires", "cauchemarderez", "tuberculinisée", "cautérisassiez", "farfouillerons", "désenveloppera", "rediffusassent", "zinzinulerions", "interviendrons",
            "radiobalisasse", "déplantassions", "déshumaniseras", "décarbonaterai", "démonétiseriez", "réimplanterons"];
let htmlPerdu = '<img class="w-100" src="./Image/pendu.png" alt="pendu"/>';
let htmlGagne = '<img class="w-100" src="./Image/gagne.png" alt="gagne"/>';
let htmlTentative2 = '<img class="w-100" src="./Image/tentative2.png" alt="tentavtive 2"/>';
let htmlTentative3 = '<img class="w-100" src="./Image/tentative3.png"" alt="tentavtive 3"/>';
let htmlTentative4 = '<img class="w-100" src="./Image/tentative4.png"" alt="tentavtive 4"/>';
let htmlTentative5 = '<img class="w-100" src="./Image/tentative5.png"" alt="tentavtive 5"/>';
let htmlTentative6 = '<img class="w-100" src="./Image/tentative6.png"" alt="tentavtive 6"/>';
let htmlTentative7 = '<img class="w-100" src="./Image/tentative7.png"" alt="tentavtive 7"/>';
let htmlTentative8 = '<img class="w-100" src="./Image/tentative8.png"" alt="tentavtive 8"/>';
let htmlTentative9 = '<img class="w-100" src="./Image/tentative9.png"" alt="tentavtive 9"/>';
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
        afficher = true;
    }
}
let Perdu = new Final( " red", htmlPerdu);
let Tentative2 = new Final ("white", htmlTentative2);
let Tentative3 = new Final ("white", htmlTentative3);
let Tentative4 = new Final ("white", htmlTentative4);
let Tentative5 = new Final ("white", htmlTentative5);
let Tentative6 = new Final ("white", htmlTentative6);
let Tentative7 = new Final ("white", htmlTentative7);
let Tentative8 = new Final ("white", htmlTentative8);
let Tentative9 = new Final ("white", htmlTentative9);
let Gagne = new Final( "green", htmlGagne);

function afficherDessin() {
    switch ( tentative) {
        case 2 : 
        Tentative2.afficher();
        break;
        case 3 : 
        Tentative3.afficher();
        break;
        case 4 : 
        Tentative4.afficher();
        break;
        case 5 : 
        Tentative5.afficher();
        break;
        case 6 : 
        Tentative6.afficher();
        break;
        case 7 : 
        Tentative7.afficher();
        break;
        case 8 : 
        Tentative8.afficher();
        break;
        case 9 : 
        Tentative9.afficher();
        break;
    }
}
//retrait de l'affichage du document
function retirerAffichage() {
    for ( i=1 ; i<15; i++) {
        document.getElementById("lettre" + i ).innerText = "_";
    }
}
function disabled() {
    document.getElementById("soumettreLettre").disabled = true;
    document.getElementById("soumettreMot").disabled = true;
    document.getElementById("jouer").disabled = false;
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
            trouve = true;
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
    disabled();
}
function tourSuivant () {
    if ( trouve ) {
        trouve = false;
        document.getElementById("form").reset();
    } 
    else {
    tentative = tentative + 1;
    TabEssais.push(lettre);
    document.getElementById("affichage").innerText = "Il vous reste : " + (10 - tentative ) + " essais\n vous avez essayé :\n" + TabEssais;
    document.getElementById("affichage").style.color = "white";
    afficher = true;
    document.getElementById("form").reset();
    afficherDessin();
    }
}
function gagner () {
    document.getElementById("affichage").innerText = "Le mot est : " + mot;
    Gagne.afficher();
    disabled();
}
// Début de la partie
document.getElementById("jouer").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("soumettreLettre").disabled = false;
    document.getElementById("soumettreMot").disabled = false;
    document.getElementById("jouer").disabled = true;
    TabEssais = [];
    bonneLettre = 0;
    tentative = 1 ;
    document.getElementById("affichage").innerText = "Il vous reste : " + (10 - tentative ) + " essais" ;
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