let NumberToFind = 0;
const resultDiv = document.getElementById("resultDiv");
const reboursDiv = document.getElementById("compteARebours");
const gamePropalDiv = document.getElementById("gamePropalDiv");
let TempsRestant = 0;
let compteurInterval = null;

document.getElementById("beginGame").addEventListener("click", function () {
  launchGame();
});

//AU clique tu m'effecue mon checkproposal
document
  .getElementById("checkPropalButton")
  .addEventListener("click", function () {
    checkPropal();
  });

//Lorsque la touche de clavier a été pressée. Dès que l'evenement est déclenché on voit ce qui ets tapé au clavier
document
  .getElementById("userPropalInput")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      checkPropal();
    }
  });

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function checkPropal() {
  let numberPropal = document.getElementById("userPropalInput").value;
  if (NumberToFind > numberPropal) {
    resultDiv.innerHTML = "C'est plus";
  } else if (NumberToFind < numberPropal) {
    resultDiv.innerHTML = "C'est moins";
  } else if (NumberToFind == numberPropal) {
    resultDiv.innerHTML = "C'est gagné";
  }
}

//lancer la partie au click
//récupérer un chiffre aléatoire
//intégrer compte à rebours
function launchGame() {
  NumberToFind = getRandomInt(1000);
  TempsRestant = 30;
  gamePropalDiv.style.display = "block";
  if (compteurInterval != null) {
    clearInterval(compteurInterval);
  }
  compteurInterval = setInterval(() => {
    reboursDiv.innerText = TempsRestant;
    TempsRestant--;

    if (TempsRestant >= 20) {
      reboursDiv.classList.remove("warning");
      reboursDiv.classList.remove("danger");
      reboursDiv.classList.add("cool");
    } else if (TempsRestant > 10) {
      reboursDiv.classList.remove("cool");
      reboursDiv.classList.remove("danger");
      reboursDiv.classList.add("warning");
    } else if (TempsRestant >= 0) {
      reboursDiv.classList.remove("cool");
      reboursDiv.classList.remove("warning");
      reboursDiv.classList.add("danger");
    } else if (TempsRestant < 0) {
      clearInterval(compteurInterval);
      endGame(false);
    }
  }, 1000);
}

function endGame() {
  gamePropalDiv.style.display = "none";
  clearInterval(compteurInterval);
}
