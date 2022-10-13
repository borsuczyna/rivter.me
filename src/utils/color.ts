export class Color {
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r: number, g: number, b: number, a: number = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toDOM() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a/255});`
    }
};