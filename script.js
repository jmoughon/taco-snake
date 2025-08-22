const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const emojiSelector = document.getElementById('emojiSelector');
const themeToggle = document.getElementById('themeToggle');

const gridSize = 15;
const tileCount = canvas.width / gridSize;
let snakeEmoji = '🌮';

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let specialFood = null;
let dx = 0;
let dy = 0;
let score = 0;
let gameRunning = false;

emojiSelector.addEventListener('change', (event) => {
    snakeEmoji = event.target.value;
});

function drawGame() {
    if (!gameRunning) return;

    clearCanvas();
    moveSnake();
    if (checkCollision()) {
        gameOver();
        return;
    }
    drawSnake();
    drawFood();
    drawSpecialFood();
    updateScore();
    setTimeout(drawGame, 200);
}

function clearCanvas() {
    const canvasBg = getComputedStyle(document.documentElement).getPropertyValue('--canvas-bg');
    ctx.fillStyle = canvasBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    let foodEaten = false;

    // Check if regular food is eaten
    if (head.x === food.x && head.y === food.y) {
        generateFood();
        score += 10;
        foodEaten = true;
    }

    // Check if special food is eaten
    if (specialFood && head.x === specialFood.x && head.y === specialFood.y) {
        score += 25;
        specialFood = null;
        foodEaten = true;
    }

    if (!foodEaten) {
        snake.pop();
    }
}

function drawSnake() {
    ctx.font = `${gridSize}px Arial`;
    snake.forEach(segment => {
        ctx.fillText(snakeEmoji, segment.x * gridSize, (segment.y + 1) * gridSize);
    });
}

function drawFood() {
    ctx.fillText(snakeEmoji, food.x * gridSize, (food.y + 1) * gridSize);
}

function drawSpecialFood() {
    if (specialFood) {
        ctx.fillText('🍓', specialFood.x * gridSize, (specialFood.y + 1) * gridSize);
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    // Ensure food does not spawn on the snake
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food.x = Math.floor(Math.random() * tileCount);
        food.y = Math.floor(Math.random() * tileCount);
    }

    // Clear any existing special food when regular food is generated
    specialFood = null;

    // 10% chance to generate special food
    if (Math.random() < 0.1) {
        generateSpecialFood();
    }
}

function generateSpecialFood() {
    let x, y;
    
    do {
        x = Math.floor(Math.random() * tileCount);
        y = Math.floor(Math.random() * tileCount);
    } while (
        snake.some(segment => segment.x === x && segment.y === y) ||
        (x === food.x && y === food.y)
    );

    specialFood = { x, y };
}

function checkCollision() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function gameOver() {
    gameRunning = false;
    startBtn.textContent = 'Restart';
    startBtn.style.display = 'inline-block';
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    specialFood = null;
    dx = 0;
    dy = 0;
    score = 0;
    updateScore();
}

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

function changeDirectionByButton(direction) {
    if (direction === 'left' && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (direction === 'up' && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (direction === 'down' && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if (direction === 'right' && dx !== -1) {
        dx = 1;
        dy = 0;
    }
}

startBtn.addEventListener('click', () => {
    resetGame();
    gameRunning = true;
    startBtn.style.display = 'none';
    drawGame();
});

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(theme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
    
    // Update canvas background immediately if game is not running
    if (!gameRunning) {
        clearCanvas();
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Event listeners
themeToggle.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize theme on page load
initTheme();
clearCanvas();