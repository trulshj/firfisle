import { Vector } from "./vector.js";
import { Artist } from "./artist.js";

class Arm {
    constructor(
        upperArmLength,
        lowerArmLength,
        shoulderPosition,
        handPosition
    ) {
        this.upperArmLength = upperArmLength;
        this.lowerArmLength = lowerArmLength;
        this.shoulder = shoulderPosition;
        this.hand = handPosition;
    }

    solveElbow(shoulderPosition, handPosition) {
        return circleIntersectionCoordinates(
            this.shoulder,
            this.upperArmLength,
            this.hand,
            this.lowerArmLength
        )[1];
    }
}

const canvas = document.getElementById("elbow-canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const artist = new Artist(ctx, width, height);

function armLoop() {
    ctx.fillStyle = "rgba(255,255,255)";
    ctx.fillRect(0, 0, width, height);

    artist.drawPoint(arm.shoulder, "black");

    updateHand();
    artist.drawPoint(arm.hand, "black");

    artist.drawCircle(arm.shoulder, arm.upperArmLength, "black");
    artist.drawCircle(arm.hand, arm.lowerArmLength, "black");

    let elbow = arm.solveElbow();
    artist.drawPoint(elbow, "red");
    artist.drawLine(arm.shoulder, elbow, "black");
    artist.drawLine(elbow, arm.hand, "black");

    artist.drawPoints(
        circleIntersectionCoordinates(
            arm.shoulder,
            arm.upperArmLength,
            arm.hand,
            arm.lowerArmLength
        ),
        "blue"
    );

    requestAnimationFrame(armLoop);
}

const arm = new Arm(250, 150, new Vector(100, 100), new Vector(300, 300));

const upperArmSlider = document.getElementById("upper-arm-slider");
const lowerArmSlider = document.getElementById("lower-arm-slider");

upperArmSlider.addEventListener("input", (e) => {
    arm.upperArmLength = parseInt(e.target.value);
});

lowerArmSlider.addEventListener("input", (e) => {
    arm.lowerArmLength = parseInt(e.target.value);
});

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
}

let handFollowsMouse = false;

canvas.addEventListener("mousedown", () => {
    handFollowsMouse = true;
});

canvas.addEventListener("mouseup", () => {
    handFollowsMouse = false;
});

canvas.addEventListener("mousemove", (e) => {
    if (handFollowsMouse) {
        arm.hand.copy(Vector.fromObject(getCursorPosition(canvas, e)));
    }
});

function updateHand() {}

armLoop();

/**
 *  Finds the intersection points between two circles
 *
 *  Adapted from https://math.stackexchange.com/a/1367732
 *
 * @param {Vector} position1 The centre of the first circle
 * @param {Number} radius1 The radius of the first circle
 * @param {Vector} position2 The centre of the second circle
 * @param {Number} radius2 The radius of the second circle
 * @returns {[Vector, Vector]} The intersection points between the two circles
 */
function circleIntersectionCoordinates(position1, radius1, position2, radius2) {
    const distance = position1.distance(position2);
    const distance2 = distance * distance;
    const distance4 = distance2 * distance2;

    const xMean = (position1.x + position2.x) / 2;
    const yMean = (position1.y + position2.y) / 2;

    const radius1_2 = radius1 * radius1;
    const radius2_2 = radius2 * radius2;

    const a = (radius1_2 - radius2_2) / (2 * distance2);
    const b = Math.sqrt(
        (2 * (radius1_2 + radius2_2)) / distance2 -
            (radius1_2 - radius2_2) ** 2 / distance4 -
            1
    );

    const aX = xMean + a * position2.distanceX(position1);
    const bX = (b * position2.distanceY(position1)) / 2;
    const intersection1_x = aX + bX;
    const intersection2_x = aX - bX;

    const aY = yMean + a * position2.distanceY(position1);
    const bY = (b * position1.distanceX(position2)) / 2;
    const intersection1_y = aY + bY;
    const intersection2_y = aY - bY;

    return [
        new Vector(intersection1_x, intersection1_y),
        new Vector(intersection2_x, intersection2_y),
    ];
}
