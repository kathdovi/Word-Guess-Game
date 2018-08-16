let possibilities = ["Breakfast*at*Tiffanys", "Up", "Forrest*Gump", "Pulp*Fiction", "The*Truman*Show", "Rent", "Casablanca", "The*Godfather", "The*Matrix", "The*Wizard*Of*Oz", "Goodfellas", "Back*To*The*Future", "A*Clockwork*Orange", "Psycho"];
let wins = 0;

// starting variables
let guessesLeft = 7;
let lettersAlreadyGuessed = [];
let lettersAvailable = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let currentWord = possibilities[Math.floor(Math.random() * possibilities.length)].toUpperCase();
let gameOver = false;
let encodedWord = encodeWord(currentWord);

document.querySelector(".current-phrase").innerHTML = encodedWord.split('').join(" ");
document.querySelector(".guesses-left").innerHTML = guessesLeft;
document.querySelector(".letters-left").innerHTML = lettersAvailable.join(" ");
document.querySelector(".win-num").innerHTML = wins;

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
}

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
    }

    // if input isn't in the current word , input is a letter , input is not already guessed
    if ((!currentWord.includes(input)) && (key >= 65) && (key <= 90) && ($.inArray(input, lettersAlreadyGuessed) === -1)) {
        console.log($.inArray(input, lettersAlreadyGuessed));
        lettersAlreadyGuessed.push(input);
        guessesLeft--;
        document.querySelector(".guesses-left").innerHTML = guessesLeft;
        if (guessesLeft === 0) {
            document.querySelector(".win").innerHTML = "You lose! The phrase was: " + currentWord;
            gameOver = true;
        }
        let index = lettersAvailable.indexOf(input);
        lettersAvailable.splice(index, 1);
        document.querySelector(".letters-left").innerHTML = lettersAvailable.join(" ");
    }


    tempWord = encodedWord.split('').join(" ");
    document.querySelector(".current-phrase").innerHTML = tempWord;

    // Win Condition
    if (encodedWord === currentWord) {
        gameOver = true;
        wins++;
        document.querySelector(".win").innerHTML = "You win!";
        document.querySelector(".win-num").innerHTML = wins;

    }


});
