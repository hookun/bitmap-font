export class PathString {

    public x: number;

    public y: number;

    public length: number;

    public fragments: Array<string>;

    public constructor() {
        this.x = 0;
        this.y = 0;
        this.length = 0;
        this.fragments = [];
    }

    public moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.fragments.push(`M${x} ${y}`);
    }

    public lineBy(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
        this.length += Math.hypot(dx, dy);
        if (dx !== 0 || dy !== 0) {
            let fragment = '';
            if (dx === 0) {
                fragment = `V${this.y}`;
            } else if (dy === 0) {
                fragment = `H${this.x}`;
            } else {
                fragment = `L${this.x} ${this.y}`;
            }
            this.fragments.push(fragment);
        }
        return this;
    }

    public close() {
        if (0 < this.fragments.length) {
            this.fragments.push('z');
        }
        return this;
    }

    public toString() {
        return this.fragments.join('');
    }

}
