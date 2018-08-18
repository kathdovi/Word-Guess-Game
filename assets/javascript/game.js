var fileName = "https://kathdovi.github.io/Word-Guess-Game/assets/HangmanMovies.txt";
var txtFile;
if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    txtFile = new XMLHttpRequest();
}
else {// code for IE6, IE5
    txtFile = new ActiveXObject("Microsoft.XMLHTTP");
}
txtFile.open("GET", fileName, false);
txtFile.send();
var txtDoc = txtFile.responseText;
var possibilities = txtDoc.split("\n"); // values in lines[0], lines[1]...

console.log(possibilities);

// let possibilities = ["Breakfast*at*Tiffanys", "Up", "Forrest*Gump", "Pulp*Fiction", "The*Truman*Show", "Rent", "Casablanca", "The*Godfather", "The*Matrix",
//     "The*Wizard*Of*Oz", "Goodfellas", "Back*To*The*Future", "A*Clockwork*Orange", "Psycho", "Clue", "Star*Trek", "Finding*Nemo", "Scarface", "Vertigo",
//     "Double*Identity", "The*Shining", "Rear*Window", "Citizen*Kane", "The*Usual*Suspects", "Schindlers*List", "Star*Wars", "The*Silence*Of*The*Lambs", "Jaws"];
let wins = 0;

// Call reset to display starting values & start first game
reset(); 

// Reset values for each game
function reset() {
    guessesLeft = 7;
    lettersAlreadyGuessed = [];
    lettersAvailable = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    currentWord = possibilities[Math.floor(Math.random() * possibilities.length)].toUpperCase();
    gameOver = false;
    encodedWord = encodeWord(currentWord);
    document.querySelector(".win").innerHTML = "";
    document.querySelector(".current-phrase").innerHTML = encodedWord.split('').join(" ");
    document.querySelector(".guesses-left").innerHTML = guessesLeft;
    document.querySelector(".letters-left").innerHTML = lettersAvailable.join(" ");
    document.querySelector(".win-num").innerHTML = wins;
}

// Change the word into all _ and *
function encodeWord(currentWord) {
    let encodedWord = "";
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord.charAt(i) === '*') {
            encodedWord = encodedWord + "*";
        } else {
            encodedWord = encodedWord + "_";
        }
    }
    return encodedWord;
}

// Check and take user input
document.addEventListener('keyup', function (e) {
    let key = e.keyCode;
    let input = String.fromCharCode(e.keyCode);
    if (gameOver) {
        reset();
    }

    // Modify the encoded word if guessed letter is present and unguessed 
    if (currentWord.includes(input) && ($.inArray(input, lettersAvailable) != -1)) {
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord.charAt(i) === input) {
                encodedWord = encodedWord.substring(0, i) + input + encodedWord.substring(i + 1);
            }
        }
        let index = lettersAvailable.indexOf(input);
        lettersAvailable.splice(index, 1);
        document.querySelector(".letters-left").innerHTML = lettersAvailable.join(" ");
        tempWord = encodedWord.split('').join(" ");
        document.querySelector(".current-phrase").innerHTML = tempWord;
    }

    // if input isn't in the current word , input is a letter, input is not already guessed: take away a guess
    // & modify letters left
    if ((!currentWord.includes(input)) && (key >= 65) && (key <= 90) && ($.inArray(input, lettersAlreadyGuessed) === -1)) {
        console.log($.inArray(input, lettersAlreadyGuessed));
        lettersAlreadyGuessed.push(input);
        guessesLeft--;
        document.querySelector(".guesses-left").innerHTML = guessesLeft;
        let index = lettersAvailable.indexOf(input);
        lettersAvailable.splice(index, 1);
        document.querySelector(".letters-left").innerHTML = lettersAvailable.join(" ");
        tempWord = encodedWord.split('').join(" ");
        document.querySelector(".current-phrase").innerHTML = tempWord;
    }

    // Win Condition
    if (encodedWord === currentWord) {
        gameOver = true;
        wins++;
        document.querySelector(".win").innerHTML = "You win!";
        document.querySelector(".win-num").innerHTML = wins;
    }

    // Lose Condition
    if (guessesLeft === 0) {
        document.querySelector(".win").innerHTML = "You lose! The phrase was: " + currentWord;
        gameOver = true;
    }


});
