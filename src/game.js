import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Brick from './brick.js';
import {
    buildLevel,
    level1,
    level2
} from './levels.js';

const GameState = {
    Paused: 0,
    Running: 1,
    Menu: 2,
    GameOver: 3,
    NewLevel: 4
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameState = GameState.Menu;


        this.ball = new Ball(this);
        this.paddle = new Paddle(this);

    
        this.gameObjects = [];
        this.bricks = [];


        this.lives = 3;


        this.levels = [level1, level2];
        this.currentLevel = 0;

        new InputHandler(this.paddle, this);
    }

    start() {
        if (this.gameState !== GameState.Menu &&
            this.gameState !== GameState.NewLevel) return;

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.paddle];
        this.gameState = GameState.Running;
    }

    update(deltaTime) {
        if (this.lives === 0) this.gameState = GameState.GameOver;

        if (this.gameState === GameState.Paused ||
            this.gameState === GameState.Menu ||
            this.gameState === GameState.GameOver
        )
         return;

        if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gameState = GameState.NewLevel;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

        if (this.gameState === GameState.Paused) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fill();

            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gameState === GameState.Menu) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = '#000';
            ctx.fill();

            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(
                'Press SpaceBar to Start',
                this.gameWidth / 2,
                this.gameHeight / 2
            );
        }

        if (this.gameState === GameState.GameOver) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = '#000';
            ctx.fill();

            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(
                'Game Over',
                this.gameWidth / 2,
                this.gameHeight / 2
            );
        }
    }

    togglePause() {
        if (this.gameState === GameState.Paused) {
            this.gameState = GameState.Running;
        } else {
            this.gameState = GameState.Paused;
        }
    }
}