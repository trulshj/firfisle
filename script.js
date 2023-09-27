import { Vector } from "./vector.js";
import { Food } from "./food.js";
import { Lizard } from "./lizard.js";
import { Artist } from "./artist.js";

function loop() {
    ctx.fillStyle = "rgba(255,255,255)";
    ctx.fillRect(0, 0, width, height);

    for (let pObject of physicsObjects) {
        pObject.update();
        artist.drawArrowHead(
            pObject.position,
            pObject.velocity.invert().horizontalAngle(),
            pObject.color
        );

        if (pObject.drawVectors) {
            artist.drawVector(
                pObject.velocity.invert(),
                pObject.position,
                "black",
                10
            );
            artist.drawVector(
                pObject.oldAcceleration,
                pObject.position,
                "red",
                100
            );
        }
    }

    // food
    artist.drawPoint(food.position, food.color);

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
export const width = canvas.width;
export const height = canvas.height;

const artist = new Artist(ctx, width, height);

function showObjectVectors(bool) {
    for (let object of physicsObjects) {
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

canvas.addEventListener("click", function (event) {
    food.followsMouse = !food.followsMouse;
    if (food.followsMouse) {
        food.position.copy(Vector.fromObject(getCursorPosition(canvas, event)));
    }
});

canvas.addEventListener("mousemove", function (event) {
    if (food.followsMouse)
        food.position.copy(Vector.fromObject(getCursorPosition(canvas, event)));
});

const tailLength = 10;
const bob = new Lizard(10 + 20 * tailLength, 10 + 20 * tailLength, "red");

let tail = [];

for (let i = 0; i < tailLength; i++) {
    tail.push(new Lizard(10 + i * 20, 10 + i * 20, "blue"));
}

tail.reverse();

const food = new Food(width / 2, height / 2);
const physicsObjects = [bob, ...tail];

loop();
