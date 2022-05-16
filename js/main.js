/* L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro. */

/* L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba
BONUS possibili:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste */


const myWrap = document.querySelector(".wrap");

const myMain = document.querySelector("main");
const myScore = document.createElement("div");

myScore.className = "score";
myMain.append(myScore);

let points = 0;
let playing = true;

const levelEasyBtn = document.getElementById("levelEasy");
const levelMediumBtn = document.getElementById("levelMedium");
const levelDifficultBtn = document.getElementById("levelDifficult");

levelEasyBtn.addEventListener('click', () => createGrid(100, "easy"));
levelMediumBtn.addEventListener('click', () => createGrid(81, "medium"));
levelDifficultBtn.addEventListener('click', () => createGrid(49, "difficult"));

// dichiarazione funzioni

function createGrid (size, level){

    myWrap.innerHTML = "";
    myScore.innerHTML = "";

    playing = true;

    const myGrid = document.createElement("div");
    myWrap.append(myGrid);
    myGrid.classList.add("grid", level);
    
    const myArray = createRandomNumsArray (size, 1, size);
    const bombsArray = createRandomNumsArray (16, 1, size);

    for (let i=0; i<size; i++){
        const myArticle = document.createElement("article");
        myGrid.append(myArticle);
        myArticle.append(myArray[i]);

        if (checkNumInArray (myArray[i], bombsArray)){
            myArticle.addEventListener('click', () => bomb(myArticle));
        } else {
            myArticle.addEventListener('click', () => notBomb(myArticle));
        }
    }
}

function bomb(arg){
    if (playing){
        arg.style.backgroundColor = "red";

        myScore.innerHTML = `Hai perso!<br>Il tuo punteggio è: ${points}`;
        
        points = 0;
        playing = false;
    }
    
}

function notBomb(arg){
    if (playing){
        arg.style.backgroundColor = "blue";
        points += 1;
    }
}

function createRandomNumsArray (size, min, max){
    const numsArray = [];

    while (numsArray.length<size){
        let myNum = createRandomNum (min,max);

        if (!numsArray.includes(myNum)){
            numsArray.push(myNum);
        }
    }
    return numsArray;
}

function createRandomNum (min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkNumInArray (numTocheck, arrayTocheck){
    for (let i=0; i<arrayTocheck.length; i++){
        if (arrayTocheck[i] === numTocheck){
            return true;
        }
    } return false;
}