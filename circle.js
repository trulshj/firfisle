import { Vector } from "./vector.js";

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
export function findIntersectionPoints(position1, radius1, position2, radius2) {
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
