import { Vector } from "./vector.js";
import { Artist } from "./artist.js";
import { findIntersectionPoints } from "./circle.js";

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

    totalArmLength() {
        return this.upperArmLength + this.lowerArmLength;
    }

    minimumArmLength() {
        return Math.abs(this.upperArmLength - this.lowerArmLength);
    }

    solveElbow() {
        return findIntersectionPoints(
            this.shoulder,
            this.upperArmLength,
            this.hand,
            this.lowerArmLength
        )[1];
    }

    moveHandTo(position) {
        if (position.distance(this.shoulder) < this.minimumArmLength()) {
            // hand would be closer to shoulder than is possible
            // move hand away from shoulder
            this.hand.copy(
                this.shoulder.clone().add(
                    position
                        .subtract(this.shoulder)
                        .normalize()
                        .multiplyScalar(this.minimumArmLength() + 1e-6) // epsilon to avoid floating point errors
                )
            );
        } else if (position.distance(this.shoulder) > this.totalArmLength()) {
            // hand would be further away from shoulder than arm length
            // move hand to the end of the arm
            this.hand.copy(
                this.shoulder.clone().add(
                    position
                        .subtract(this.shoulder)
                        .normalize()
                        .multiplyScalar(this.totalArmLength() - 1e-6) // epsilon to avoid floating point errors
                )
            );
        } else {
            this.hand = position;
        }
    }
}

const canvas = document.getElementById("elbow-canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const artist = new Artist(ctx, width, height);

function armLoop() {
    ctx.fillStyle = "#b4f8edff";
    ctx.fillRect(0, 0, width, height);

    artist.drawPoint(arm.shoulder, "black");

    updateHand();
    artist.drawPoint(arm.hand, "black");

    if (drawArmLengths) {
        artist.drawCircle(arm.shoulder, arm.upperArmLength, "black");
        artist.drawCircle(arm.hand, arm.lowerArmLength, "black");
    }

    const elbow = arm.solveElbow();
    artist.drawPoint(elbow, "red");
    artist.drawLine(arm.shoulder, elbow, "black");
    artist.drawLine(elbow, arm.hand, "black");

    requestAnimationFrame(armLoop);
}

const arm = new Arm(250, 150, new Vector(100, 100), new Vector(300, 300));

const upperArmSlider = document.getElementById("upper-arm-slider");
const lowerArmSlider = document.getElementById("lower-arm-slider");

upperArmSlider.addEventListener("input", (e) => {
    arm.upperArmLength = parseInt(e.target.value);
    arm.moveHandTo(arm.hand);
});

lowerArmSlider.addEventListener("input", (e) => {
    arm.lowerArmLength = parseInt(e.target.value);
    arm.moveHandTo(arm.hand);
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
        const mousePosition = Vector.fromObject(getCursorPosition(canvas, e));
        arm.moveHandTo(mousePosition);
    }
});

let drawArmLengths = true;

const drawArmLengthsCheckbox = document.getElementById("draw-arm-lengths");
drawArmLengthsCheckbox.addEventListener("change", (e) => {
    drawArmLengths = e.target.checked;
});

function updateHand() {}

armLoop();
