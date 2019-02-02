class Player extends Rect {
    constructor(x = 0, y = 0) {
        super(PLAYER_W, PLAYER_H);
        this.pos.x = x;
        this.pos.y = y
        this.score = 0;
    }
}