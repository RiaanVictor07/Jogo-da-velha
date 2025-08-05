const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";

let positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function init() {
    selected = [];

    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    document.querySelectorAll(".game button").forEach((item, i) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
        item.setAttribute("data-i", i);
    });
}

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player;
    e.target.removeEventListener("click", newMove);
    selected[index] = player;

    setTimeout(() => {
        check();
    }, 100);

    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    for (let pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
            init();
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE!");
        init();
        return;
    }
}
