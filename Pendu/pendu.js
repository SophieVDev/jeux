const buttonPlay = document.getElementById("beginGame");
const allWords = [
  "fleur",
  "montagne",
  "ministre",
  "constitution",
  "prisonnier",
  "ecnomie",
];
const wordToFindDiv = document.getElementById("wordToFindDiv");
const KeyBoardDiv = document.getElementById("KeyBoard");
const cptErreurDiv = document.getElementById("cptErreur");
let wordToFind;
let wordToFindArray;
let cptErreur = 0;
let cptLettreTrouvees = 0;

buttonPlay.addEventListener("click", function () {
  beginGame();
});

function beginGame() {
  cptErreur = 0;
  let cptLettreTrouvees = 0;
  //supprmer l'ancien jeu lorsque l'on clique sur commencer la partie
  wordToFindDiv.innerHTML = "";
  //Générer un mot au hasard
  wordToFind = generateWord();
  //créer un tableau avec toute les lettres dans ce tableau
  wordToFindArray = Array.from(wordToFind);

  let table = document.createElement("table");
  //tr est une ligne du tableau
  let line = document.createElement("tr");
  //quand tu lances le jeu donne un identifiant aux lettres
  line.id = "LineOfWord";

  wordToFindArray.forEach((letter) => {
    //je crée un élément HTML qui a pour nom td ( case de tableau) td est l'élément qu'il y a dans le tableau
    let td = document.createElement("td");
    td.dataset.letter = letter;
    //le texte que l'on verra sera le _
    td.innerText = "_";
    //j'ajoute ma case à ma ligne
    line.appendChild(td);
  });
  //j'ajoute ma ligne à mon tableau. le appenchild c'ets rajouter dans ce qui est existant
  table.appendChild(line);
  //J'ajoute mon tableau
  wordToFindDiv.appendChild(table);

  generateKeyBoard();
}

function generateKeyBoard() {
  //tu commece par vider ce quil y a dans le html
  KeyBoardDiv.innerHTML = "";
  //tu me génère l'alphabet
  let Alphabet = generateAlphabet();
  //pour chaue lettre de mon alphabet tu me genere une div
  Alphabet.forEach((letter) => {
    let letterDiv = document.createElement("div");
    //Dans ce div tu me mets la lettre
    letterDiv.innerHTML = letter;
    //ajouter une classe
    letterDiv.classList.add("letterKeyBoard");
    //tu me l'inègres das le keyboard
    KeyBoardDiv.appendChild(letterDiv);

    //lorsque tu cliques su la lettre tu me dis si elle ets présente
    letterDiv.addEventListener("click", () => {
      if (checkLetterInWord(letter)) {
        //afficher la lettre dans la case masqué
        let lineWord = document.getElementById("LineOfWord");
        let allTdOfWord = lineWord.children;
        Array.from(allTdOfWord).forEach((td) => {
          if (td.dataset.letter == letter) {
            td.innerHTML = letter;
            cptLettreTrouvees++;
          }
        });
        if (cptLettreTrouvees == wordToFindArray.length) {
          KeyBoardDiv.innerHTML = "";
          cptErreurDiv.innerHTML = "Gagné en " + cptErreur + " essais";
        }
      } else {
        //incrémenter le compteur d'erreur
        cptErreur++;
        cptErreurDiv.innerHTML = cptErreur;
        if (cptErreur >= 5) {
          //on a perdu
          cptErreurDiv.innerHTML = "Perdu";

          //Je parcours mon tableau pour afficher les bonnes lettres
          let lineWord = document.getElementById("LineOfWord");
          let allTdOfWord = lineWord.children;
          Array.from(allTdOfWord).forEach((td) => {
            td.innerHTML = td.dataset.letter;
          });
          //pour enlever le clavier ( les lettres lorsque l'on a perdu)
          KeyBoardDiv.innerHTML = "";
        }
      }
      //pour faire disparaitre les lettres
      letterDiv.style.visibility = "hidden";
    });
  });
}

function generateAlphabet(capital = false) {
  //retourne un tableau de 26 caractères recupere les lettres à partir de 97 ex: a=97 b=98... en capital 65=A 66=B
  let tab = [];
  let i = 65;
  if (!capital) {
    i += 32;
  }
  let finish = i + 26;
  for (i; i < finish; i++) {
    tab.push(String.fromCharCode(i));
  }
  return tab;
}

function generateWord() {
  //récupérer les mots de mon tableau
  let indexWord = getRandomInt(allWords.length);
  return allWords[indexWord];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function checkLetterInWord(letter) {
  //pour chaque lettre de mon mot si la lettre que j'ai en paramèrtre = a la lettre que j'ai dans mon mot dans ce ce cas là ...
  //Par defaut la lettre n'est pas trouvé
  let findLetter = false;
  wordToFindArray.forEach((letterOfWord) => {
    if (letter == letterOfWord) {
      findLetter = true;
    }
  });
  return findLetter;
}
