export class Position2D {
    x: number = 0;
    y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Position2D(this.x, this.y);
    }

    static difference(a:  Position2D, b:  Position2D) {
        return new Position2D(a.x - b.x, a.y - b.y);
    }

    times(mult: number) {
        this.x *= mult;
        this.y *= mult;
        return this;
    }

    static sum(a: Position2D, b: Position2D) {
        return new Position2D(a.x + b.x, a.y + b.y);
    }

    static distance(a: Position2D,  b: Position2D) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    static angle(a: Position2D, b: Position2D) {
        return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
    }

    get inverted() {
        return new Position2D(-this.x, -this.y);
    }

    set(x?: number, y?: number) {
        if (x !== undefined) {
            this.x = x;
        }
        if (y !== undefined) {
            this.y = y;
        }
    }

    add(x: number, y: number) {
        this.x += x;
        this.y += y;
    }

    sub(x: number, y: number) {
        this.x -= x;
        this.y -= y;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let length = this.length();
        if (length !== 0) {
            this.x /= length;
            this.y /= length;
        }
    }
}