class Vec2d {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    set len(val) {
        const factor = val / this.len;
        this.x *= factor
        this.y *= factor
    }
}

class Rect {
    constructor(w, h) {
        this.pos = new Vec2d();
        this.w = w;
        this.h = h;
    }

    get left() {
        return this.pos.x - this.w / 2;
    }

    get right() {
        return this.pos.x + this.w / 2;
    }

    get top() {
        return this.pos.y - this.h / 2;
    }

    get bottom() {
        return this.pos.y + this.h / 2;
    }
}