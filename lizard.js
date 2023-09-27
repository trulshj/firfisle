import { Vector } from "./vector.js";
import { width, height } from "./script.js";
import { ctx } from "./script.js";

export class Lizard {
    constructor(x, y, color = "black", vx = 0, vy = 0, drawVectors = false) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(vx, vy);
        this.acceleration = new Vector(0, 0);
        this.color = color;
        this.drawVectors = drawVectors;
        this.TOP_SPEED = 5;
        this.STOPPING_DISTANCE = 150;
    }

    // adjust velocity to bounce off walls
    checkCollision() {
        if (this.position.x > width || this.position.x < 0) {
            this.velocity.x *= -1;
        }
        if (this.position.y > height || this.position.y < 0) {
            this.velocity.y *= -1;
        }
    }

    /**
     *
     * @param {Vector} target
     */
    seek(target) {
        let desired = target.clone().subtract(this.position);

        let distance = desired.length();

        desired.normalize();
        desired.multiplyScalar(this.TOP_SPEED);
        if (distance < this.STOPPING_DISTANCE) {
            desired.multiplyScalar((distance - 20) / this.STOPPING_DISTANCE);
        }

        desired.subtract(this.velocity);
        if (desired.length() > this.TOP_SPEED) {
            desired.normalize();
            desired.multiplyScalar(this.TOP_SPEED);
        }

        if (this.drawVectors) desired.draw(this.position, "green", 1500);

        this.acceleration = desired;
    }

    update() {
        this.velocity.add(this.acceleration);

        const friction = 0.01;
        this.velocity.multiplyScalar(1 - friction);

        this.position.add(this.velocity);

        this.oldAcceleration = this.acceleration.clone();
        this.acceleration.zero();

        this.checkCollision();
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        ctx.fill();

        if (this.drawVectors) {
            this.velocity.draw(this.position, "red", 30);
        }
    }
}
