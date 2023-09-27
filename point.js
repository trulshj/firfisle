import { Vector } from "./vector.js";
import { ctx } from "./script.js";

export class Point {
    constructor(x, y, color = "black") {
        this.position = new Vector(x, y);
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}
