import Game from "./game.js";

export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    paddle.moveLeft();
                    break;

                case 'ArrowRight':
                    paddle.moveRight();
                    break;

                case 'Escape':
                    game.togglePause();
                    break;

                case 'Space':
                    game.start();
                    break;
            }
        });

        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    if (paddle.speed < 0) paddle.stop();
                    break;

                case 'ArrowRight':
                    if (paddle.speed > 0) paddle.stop();
                    break;
            }
        });
    }
}