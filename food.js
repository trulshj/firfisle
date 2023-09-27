import { Vector } from "./vector.js";

export class Food {
    constructor(x, y, color = "green") {
        this.position = new Vector(x, y);
        this.color = color;
        this.followsMouse = false;
    }
}
