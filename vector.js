import { ctx } from "./script.js";

export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    scale(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    div(n) {
        this.x /= n;
        this.y /= n;
        return this;
    }

    rotate(angle) {
        let x = this.x;
        let y = this.y;
        this.x = x * Math.cos(angle) - y * Math.sin(angle);
        this.y = x * Math.sin(angle) + y * Math.cos(angle);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    direction() {
        return Math.atan2(this.y, this.x);
    }

    angleBetween(v) {
        return Math.atan2(v.y - this.y, v.x - this.x);
    }

    normalize() {
        let m = this.magnitude();
        if (m != 0) {
            this.div(m);
        }
    }

    zero() {
        this.x = 0;
        this.y = 0;
    }

    draw(position, color = "black", scale = 1) {
        drawArrow(
            position.x,
            position.y,
            this.direction(),
            this.magnitude() * scale,
            color,
            ctx
        );
    }

    limitForce() {
        var maxForce = 0.05;
        if (this.magnitude() > maxForce) {
            this.normalize();
            this.scale(maxForce);
        }
    }

    clone() {
        return new Vector(this.x, this.y);
    }
}

function drawArrow(x, y, angle, length, color = "black") {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle));
    ctx.stroke();
}
