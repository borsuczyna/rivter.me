export class Position3D {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    clone() {
        return new Position3D(this.x, this.y, this.z);
    }
}