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
//initialisation des variables correspondant à l'heure donnée à leur valeur d'affichage par défaut
let seconde = 30;
let minute = 30;
let heure = 12;
//initialisation des variables correspondant à l'heure future à leur valeur d'affichage par défaut
let secondeFutur = 30;
let minuteFutur = 30;
let heureFutur = 12;
//initialisation des variables permettant de savoir si il y a eu un passage à la minute, heure ou jour suivant à s+1
let passageMinute = false;
let passageHeure = false;
let passageJour = false;
//initialisation de l'affichage des horloges
document.getElementById("secondeP").innerText= seconde;
document.getElementById("minuteP").innerText=  minute  + ":";  
document.getElementById("heureP").innerText= heure + ":";  
document.getElementById("secondeF").innerText= secondeFutur + 1;
document.getElementById("minuteF").innerText=  minuteFutur  + ":";  
document.getElementById("heureF").innerText= heureFutur + ":";  
//Nous ferons donc une incrementation uniquement sur l'entrée des secondes
//un contrôle sera fait sur chaque entrée ( seconde, heure, minute ) afin de pouvoir manipuler le convertisseur en temps réel

//collecte des informations du formulaire

//collecte des secondes
document.getElementById("seconde").addEventListener("input", function(event) { 
    seconde = Number(event.target.value);
    document.getElementById("secondeP").innerText= seconde; 
    secondeFutur = seconde + 1;
//vérification "standard" du passage à la minute heure ou jour suivant
        if ( secondeFutur == 60 ) {
            passageMinute = true;
            secondeFutur = 0;
            minuteFutur = minuteFutur + 1;
            document.getElementById("minuteF").innerText=  minuteFutur  + ":"; 
            if ( minuteFutur == 60 ) {
                passageHeure = true;
                minuteFutur = 0;
                heureFutur = heureFutur + 1
                document.getElementById("minuteF").innerText= "0:"; 
                document.getElementById("heureF").innerText= heureFutur +":";
                if ( heureFutur == 24 ) {
                    heureFutur = 0;
                    passageJour = true
                    document.getElementById("heureF").innerText= heureFutur +":";
                }
            }
        }
// conditions permettants le "retour" a l'affichage en temps réel si il y a eu un passage à la minute, heure ou au jour suivant
        else {
            if ( passageMinute ){
                minuteFutur = minuteFutur - 1;
                passageMinute = false;
                if ( passageHeure ) {
                    minuteFutur = 59;
                    heureFutur = heureFutur -1;
                    passageHeure = false;
                    if ( passageJour ) {
                        heureFutur = 23;
                        passageJour = false;
                    }
                }
            }            
        }
        document.getElementById("secondeF").innerText= secondeFutur;
        document.getElementById("minuteF").innerText=  minuteFutur  + ":";  
        document.getElementById("heureF").innerText= heureFutur + ":";  
        
});
//collecte des minutes
document.getElementById("minute").addEventListener("input", function(event) { 
    minute = Number(event.target.value);
    document.getElementById("minuteP").innerText= minute + ":"; 
//controle de l'affichage si changement de minute ou d'heure à s+1
    if ( seconde == 59 ) {
        minuteFutur = minute + 1;
        if ( minuteFutur == 60 ) {
        passageHeure = true;
        minuteFutur = 0;
        heureFutur = heureFutur + 1
        document.getElementById("minuteF").innerText= "0:"; 
        document.getElementById("heureF").innerText= heureFutur +":";
            if ( heureFutur == 24) {
                passageJour = true;
                heureFutur = 0;
                document.getElementById("heureF").innerText= heureFutur +":";
            }
        }
    }
//sinon affichage en temps réel
    else {
    minuteFutur = minute;
    }
// conditions permettants le "retour" a l'affichage en temps réel si il y a eu un passage à l'heure ou au jour suivant
    if ( passageHeure && minuteFutur !=0 ) {
        heureFutur = heureFutur - 1;
        passageHeure = false;
        if ( passageJour ) {
            heureFutur = 23;
            passageJour = false;
        }
    }
    document.getElementById("minuteF").innerText= minuteFutur + ":";
    document.getElementById("heureF").innerText= heureFutur +":";   
});
//collecte des heures
document.getElementById("heure").addEventListener("input", function(event) { 
    heure = Number(event.target.value);
    document.getElementById("heureP").innerText= heure + ":";
//controle de l'affichage si changement d'heure ou de jour à s+1
    if ( minute == 59 && seconde == 59 && heureFutur !=0 ) {
        heureFutur = heure + 1; 
        if ( heureFutur == 24 ) {
        passageJour = true;
        heureFutur = 0;
        document.getElementById("heureF").innerText= heureFutur +":";
        }
    }
//sinon affichage en temps réel
    else {
    heureFutur = heure;
    }
// conditions permettants le "retour" a l'affichage en temps réel si il y a eu un passage au jour suivant
    if ( passageJour && heureFutur != 0) {
        heureFutur = 23;
        passageJour = false;
    }
    document.getElementById("heureF").innerText= heureFutur +":";  
});