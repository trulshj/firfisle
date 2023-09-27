export class Artist {
    constructor(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
    }

    drawPoint(point, color = "red") {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
        this.context.fill();
    }

    drawPoints(points, color = "red") {
        for (let point of points) {
            this.drawPoint(point, color);
        }
    }

    drawCircle(point, radius, color = "red") {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        this.context.stroke();
    }

    /**
     *
     * @param {Vector} vector
     * @param {{x: Number, y: Number}} origin
     * @param {String} color
     * @param {Number} scale
     */
    drawVector(vector, origin, color = "black", scale = 1) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(origin.x, origin.y);
        this.context.lineTo(
            origin.x + vector.x * scale,
            origin.y + vector.y * scale
        );
        this.context.stroke();
    }

    drawLine(start, end, color = "black") {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke();
    }

    drawArrowHead(point, angle, color = "black") {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.moveTo(point.x, point.y);
        this.context.lineTo(
            point.x + 20 * Math.cos(angle - Math.PI / 6),
            point.y + 20 * Math.sin(angle - Math.PI / 6)
        );
        this.context.lineTo(
            point.x + 20 * Math.cos(angle + Math.PI / 6),
            point.y + 20 * Math.sin(angle + Math.PI / 6)
        );
        this.context.fill();
    }
}
