class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.pos.x = WIDTH / 2;
        this.pos.y = HEIGHT / 2;
        this.vel = new Vec2d();
        this.reset();
    }

    isMoving() {
        return (this.vel.y || this.vel.x)
    }

    startMoving() {
        this.vel.x = Math.random() > 0.5 ? 1 : -1;
        this.vel.y = Math.random() * 2 - 1;
        this.vel.len = 2;
    }

    raiseSpeed() {
        this.vel.len *= 1.10;
    }

    reset() {
        this.pos.x = WIDTH / 2;
        this.pos.y = HEIGHT / 2
        this.vel.x = 0;
        this.vel.y = 0;
    }

}