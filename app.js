const tileContainer = document.querySelector(".tileContainer");
const keyboardContainer = document.querySelector(".keyboardContainer");

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