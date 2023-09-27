import { Vector } from "./vector.js";
import { Food } from "./food.js";
import { Lizard } from "./lizard.js";
import { Artist } from "./artist.js";

function loop() {
    ctx.fillStyle = "#b4f8edff";
    ctx.fillRect(0, 0, width, height);

    bob.update();
    artist.drawPoint(bob.position, bob.color);

    if (showObjectVectors) {
        artist.drawVector(bob.velocity.invert(), bob.position, "black", 10);
        artist.drawVector(bob.oldAcceleration, bob.position, "red", 10);
    }

    // food
    artist.drawPoint(food.position, food.color);

    bob.seek(food.position);

    requestAnimationFrame(loop);
}

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const width = canvas.width;
export const height = canvas.height;

const artist = new Artist(ctx, width, height);

const showArrows = document.getElementById("show-arrows");
let showObjectVectors = false;
showArrows.addEventListener("change", function () {
    showObjectVectors = showArrows.checked;
});

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
}

canvas.addEventListener("mousedown", () => {
    food.followsMouse = true;
});

canvas.addEventListener("mouseup", () => {
    food.followsMouse = false;
});

canvas.addEventListener("mousemove", (event) => {
    if (food.followsMouse)
        food.position.copy(Vector.fromObject(getCursorPosition(canvas, event)));
});

const bob = new Lizard(10, 10, "coral");
const food = new Food(width / 2, height / 2);

loop();
