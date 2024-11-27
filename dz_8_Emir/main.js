const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = './img/ground.png';

const foodImg = new Image();
foodImg.src = './img/food.png';

let box = 32;
let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

let dir;

function direction(e) {
    if (e.keyCode === 37 && dir !== 'right') dir = 'left';
    else if (e.keyCode === 38 && dir !== 'down') dir = 'up';
    else if (e.keyCode === 39 && dir !== 'left') dir = 'right';
    else if (e.keyCode === 40 && dir !== 'up') dir = 'down';
}

document.addEventListener("keydown", direction);

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y) {
            clearInterval(game);
            setModal();
        }
    }
}

function setModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h1>Game Over</h1>
            <p>Your score: ${score}</p>
            <button id="restart">Restart</button>
        </div>
    `;
    document.body.append(modal);

    const restartBtn = document.getElementById("restart");
    restartBtn.addEventListener("click", () => {
        modal.remove();
        location.reload();
    });
    const style = document.createElement('style');

    document.head.append(style);
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
    } else snake.pop();

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        clearInterval(game);
        setModal();
    }

    if (dir === 'left') snakeX -= box;
    if (dir === 'right') snakeX += box;
    if (dir === 'up') snakeY -= box;
    if (dir === 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 110);


const style = document.createElement('style');

document.head.append(style);