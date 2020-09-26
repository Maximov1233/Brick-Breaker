import {detectCollision} from './collisionDetection.js';


export default class Ball {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.img = document.querySelector('#img_ball');
        this.game = game;
        this.size = 20;
        this.reset();
    }

    reset() {
        this.position = {
            x: 10,
            y: 400
        };
        this.speed = {
            x: 4,
            y: -2
        };
    }

    draw(ctx) {
        ctx.drawImage(
            this.img,
            this.position.x,
            this.position.y,
            this.size,
            this.size
        );
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // check collision with canvas

        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        if (this.position.y + this.size > this.gameHeight) {
            this.game.lives--;
            this.reset();
        }

        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}