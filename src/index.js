import Game from './game.js';

const canvas = document.querySelector('#GameScreen'),
    ctx = canvas.getContext('2d');

const GameWidth = 800,
    GameHeight = 600;

canvas.width = GameWidth;
canvas.height = GameHeight;

let lastTime = 0;

let game = new Game(GameWidth, GameHeight);

const gameLoop = (timestamp) => {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GameWidth, GameHeight);
    
    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
