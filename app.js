const tileContainer = document.querySelector(".tileContainer");
const keyboardContainer = document.querySelector(".keyboardContainer");
const alertContainer = document.querySelector(".alertContainer");

const wordOfTheDay = "SANJI"

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
];

const tiles = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

let currentRow = 0;
let currentTile = 0;
let gameOver = false;

tiles.forEach((row, rowIndex) => {
   const div = document.createElement("div");
   div.setAttribute("id", "row-" + rowIndex);

   row.forEach((tile, tileIndex) => {
    const tileDiv = document.createElement("div");
    tileDiv.setAttribute("id", "row-" + rowIndex + "-tile-" + tileIndex);
    tileDiv.classList.add("tile");
    div.append(tileDiv);
   });

   tileContainer.appendChild(div);
});

const handleClick = (key) => {
    console.log("Clicked", key);
    if (key === "«") {
        deleteLetter();
        return;
    }
    if (key === "ENTER") {
        console.log("Check row");
        checkRow();
        return;
    }
    addLetter(key);
};

keys.forEach(key => {
    const button = document.createElement("button");
    button.textContent = key;
    button.setAttribute("id", key);
    button.addEventListener("click", () => handleClick(key));
    keyboardContainer.append(button);
});

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById("row-" + currentRow + "-tile-" + currentTile);
        tile.textContent = letter;
        tiles[currentRow][currentTile] = letter;
        tile.setAttribute("data", letter);
        currentTile++;
        console.log("tiles", tiles);
    };
};

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById("row-" + currentRow + "-tile-" + currentTile);
        tile.textContent = "";
        tiles[currentRow][currentTile] = "";
        tile.setAttribute("data", "");
    };
};

const checkRow = () => {
    const guess = tiles[currentRow].join('');

    if (currentTile > 4) {
        console.log(`Guessed word is ${guess} and worldle today is ${wordOfTheDay}`);
        flipTile();
        if (wordOfTheDay == guess) {
            showMessage('Correct wordle!');
            gameOver = true;
            return;
        } else {
            if (currentRow >= 5) {
                gameOver = false;
                showMessage("Game over!"); 
                return;
            }
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
}

const showMessage = (message) => {
    const messageP = document.createElement("p");
    messageP.textContent = message;
    alertContainer.append(messageP);
    setTimeout(() => alertContainer.removeChild(messageP), 2000);
}

const addColourKeyboard = (dataLetter, colour) => {
    const keyboard = document.getElementById(dataLetter);
    keyboard.classList.add(colour);
}

const flipTile = () => {
    const guessRowTiles = document.querySelector("#row-" + currentRow).childNodes;
    let checkWordle = wordOfTheDay;
    const guess = [];

    guessRowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute("data"), colour: "grey-overlay"});
    });

    guess.forEach((guess, index) => {
        if (guess.letter == wordOfTheDay[index]) {
            guessRowTiles.colour = "green-overlay";
            checkWordle = checkWordle.replace(guess.letter, "");
        }
    });

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.colour = "yellow-overlay";
            checkWordle = checkWordle.replace(guess.letter, "");
        }
    });

    guessRowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add("flip");
            tile.classList.add(guess[index].colour);
            addColourKeyboard((guess[index].letter), guess[index].colour);
        }, 500 * index);
    });
}