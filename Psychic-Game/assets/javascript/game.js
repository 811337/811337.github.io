var wins = 0;
var losses = 0;
var guesses = 9;

var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var guessesText = document.getElementById("guesses-text");

var computerChoice = letter();

function letter() {
    var possible = "abcdefghijklmnopqrstuvwxyz";
    return possible.charAt(Math.floor(Math.random() * possible.length));
};

function reset() {
    guesses = 9;
    document.getElementById('user-text').value = "";
    computerChoice = letter();
}

document.onkeyup = function(event) {

    var userText = event.key.toLowerCase();

    if (userText === computerChoice) {
        wins++;
        reset();
    }
    else {
        guesses--;
    }

    if (guesses === 0) {
        losses++;
        reset();
    }

    console.log(computerChoice);

    winsText.textContent = wins;
    lossesText.textContent = losses;
    guessesText.textContent = guesses;
};

document.getElementById("user-text").focus();