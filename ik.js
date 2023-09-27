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
 *
 * @param {Vector} p1
 * @param {Number} r1
 * @param {Vector} p2
 * @param {Number} r2
 * @returns
 */
function circleIntersectionCoordinates(p1, r1, p2, r2) {
    let R = p1.distance(p2);
    let R2 = R * R;
    let R4 = R2 * R2;

    let mx = (p1.x + p2.x) / 2;
    let my = (p1.y + p2.y) / 2;

    let r12 = r1 * r1;
    let r22 = r2 * r2;
    var r2r2 = r1 * r1 - r2 * r2;

    let a = (r12 - r22) / (2 * R2);
    let c = Math.sqrt((2 * (r12 + r22)) / R2 - (r2r2 * r2r2) / R4 - 1);

    var fx = mx + a * (p2.x - p1.x);
    var gx = (c * (p2.y - p1.y)) / 2;
    var ix1 = fx + gx;
    var ix2 = fx - gx;

    var fy = my + a * (p2.y - p1.y);
    var gy = (c * (p1.x - p2.x)) / 2;
    var iy1 = fy + gy;
    var iy2 = fy - gy;

    return [new Vector(ix1, iy1), new Vector(ix2, iy2)];
}
