import { Vector } from "./vector.js";
import { Point } from "./point.js";

function loop() {
    ctx.fillStyle = "rgba(255,255,255)";
    ctx.fillRect(0, 0, width, height);

    for (let object of objects) {
        object.update();
        object.draw();
    }

    // have each tail segment seek the one in front of it
    let prev = bob;
    for (let i = 0; i < tail.length; i++) {
        tail[i].seek(prev.position);
        prev = tail[i];
    }

    bob.seek(food.position);

    requestAnimationFrame(loop);
}

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(x, y);
    return new Vector(x, y);
}

canvas.addEventListener("mousemove", function (event) {
    food.position = getCursorPosition(canvas, event);
});

export const width = (canvas.width = window.innerWidth);
export const height = (canvas.height = window.innerHeight);

console.log(width, height);

const bob = new Point(100, 100, "red", 1, 1, true);
const food = new Point(width / 2, height / 2, "green");

const tailLength = 10;
let tail = [];

for (let i = 0; i < tailLength; i++) {
    tail.push(new Point(0, 0, "blue", 0, 0, true));
}

const objects = [bob, food, ...tail];

loop();
