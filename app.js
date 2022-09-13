const tileContainer = document.querySelector(".tileContainer");
const keyboardContainer = document.querySelector(".keyboardContainer");

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

const handleClick = () => {
    console.log("Clicked");
};

keys.forEach(key => {
    const button = document.createElement("button");
    button.textContent = key;
    button.setAttribute("id", key);
    button.addEventListener("click", handleClick);
    keyboardContainer.append(button);
});