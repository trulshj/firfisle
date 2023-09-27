import { Vector } from "./vector.js";
import { Point } from "./point.js";
import { Lizard } from "./lizard.js";

function loop() {
    ctx.fillStyle = "rgba(255,255,255)";
    ctx.fillRect(0, 0, width, height);

    for (let pObject of physicsObjects) {
        pObject.update();
        pObject.draw();
    }

    for (let sObject of staticObjects) {
        sObject.draw();
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

function showObjectVectors(bool) {
    for (let object of objects) {
        object.drawVectors = bool;
    }
}

// toggle show vectors if v is pressed
document.addEventListener("keydown", function (event) {
    if (event.key == "v") {
        showArrows.checked = !showArrows.checked;
        showObjectVectors(showArrows.checked);
    }
});

const showArrows = document.getElementById("show-arrows");
showArrows.addEventListener("change", function () {
    showObjectVectors(showArrows.checked);
});

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
}

let foodFollowsMouse = false;

canvas.addEventListener("click", function (event) {
    foodFollowsMouse = !foodFollowsMouse;
});

canvas.addEventListener("mousemove", function (event) {
    if (foodFollowsMouse)
        food.position = Vector.fromObject(getCursorPosition(canvas, event));
});

export const width = canvas.width;
export const height = canvas.height;

const tailLength = 10;
const bob = new Lizard(10 + 20 * tailLength, 10 + 20 * tailLength, "red");

let tail = [];

for (let i = 0; i < tailLength; i++) {
    tail.push(new Lizard(10 + i * 20, 10 + i * 20, "blue"));
}

tail.reverse();

const food = new Point(width / 2, height / 2, "green");

const physicsObjects = [bob, ...tail];
const staticObjects = [food];

loop();
