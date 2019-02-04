class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");

        this.ball = new Ball();
        this.players = [
            new Player(PLAYER_W / 2, HEIGHT / 2),
            new Player(WIDTH - PLAYER_W / 2, HEIGHT / 2)
        ]

        this.score_label = [
            document.getElementById("player1"),
            document.getElementById("player2")
        ];

        this.audio = {
            bounce: document.getElementById('bounce'),
            lose: document.getElementById('lose'),
            wall: document.getElementById('wall'),
        }

        let lastTime;
        const callback = (millis) => {
            if (lastTime) {
                this.update((millis - lastTime) / 10);
            }
            lastTime = millis;
            window.requestAnimationFrame(callback);
        }
        callback();
    }

    start() {
        if (!this.ball.isMoving()) {
            this.ball.startMoving();
        }
        
        this.audio.bounce.play();
    }

    clearScreen() {
        this._ctx.fillStyle = "#000000";
        this._ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawBall() {
        this._ctx.fillStyle = "#FFFFFF";
        this._ctx.fillRect(
            this.ball.left,
            this.ball.top,
            this.ball.w,
            this.ball.h
        );
    }

    drawPlayers() {
        this._ctx.fillStyle = "#FFFFFF";
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];

            this._ctx.fillRect(
                player.left,
                player.top,
                player.w,
                player.h
            );
        }
    }

    updateScores(index) {
        this.audio.lose.play();

        this.players[index].score++;
        this.score_label[index].innerText = this.players[index].score;
        this.ball.reset();

        if (this.players[index].score == 10) {
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].score = 0;
                this.score_label[i].innerText = 0;
                console.log(`Game over, Player ${index + 1} won!`);
            }
        }
    }

    bounceOnWalls() {
        if (this.ball.top < 0) {
            this.ball.pos.y = this.ball.h / 2;
            this.ball.vel.y *= -1;
            this.audio.wall.play();
        }

        if (this.ball.bottom > HEIGHT) {
            this.ball.pos.y = HEIGHT - this.ball.h / 2;
            this.ball.vel.y *= -1;
            this.audio.wall.play();
        }

        if (this.ball.right > WIDTH) {
            this.updateScores(0);
        }

        if (this.ball.left < 0) {
            this.updateScores(1);
        }
    }

    bounceOnPlayers() {
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];

            if (player.left < this.ball.right &&
                player.right > this.ball.left &&
                player.top < this.ball.bottom &&
                player.bottom > this.ball.top) {
                // TODO: Place ball in correct position

                this.audio.bounce.play();
                this.ball.vel.x *= -1;
                this.ball.vel.y += 2 * (Math.random() - 0.5);
                this.ball.raiseSpeed();
            }
        }
    }

    update(dt) {
        this.clearScreen();

        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;

        // Perfect IA
        this.players[1].pos.y = this.ball.pos.y;

        this.bounceOnWalls();
        this.bounceOnPlayers();

        this.drawBall();
        this.drawPlayers();
    }
}