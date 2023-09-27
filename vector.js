export class Vector {
    /*
    ############################
    ####    Constructors    ####
    ############################
    */

    /**
     * Creates a new vector with the given `x` and `y` values
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Creates a new vector with the given `x` and `y` values
     *
     * Array should be in the form `[x, y]`
     * @param {Number[]} arr
     */
    static fromArray(arr) {
        return new Vector(arr[0], arr[1]);
    }

    /**
     * Creates a new vector with the given `x` and `y` values from an object
     * @param {{x: Number, y: Number}} obj
     */
    static fromObject(obj) {
        return new Vector(obj.x, obj.y);
    }

    /*
    ############################
    #### Utility Functions  ####
    ############################
    */

    /**
     * Creates a new vector with the same values as this vector
     */
    clone() {
        return new Vector(this.x, this.y);
    }

    /**
     * Copies the values of the given vector to this vector
     * @param {Vector} vector
     */
    copy(vector) {
        this.x = vector.x;
        this.y = vector.y;
        return this;
    }

    /**
     * Copies the `x` value of the given vector to this vector
     * @param {Vector} vector
     */
    copyX(vector) {
        this.x = vector.x;
        return this;
    }

    /**
     * Copies the `y` value of the given vector to this vector
     * @param {Vector} vector
     */
    copyY(v) {
        this.y = v.y;
        return this;
    }

    /**
     * Returns a string representation of this vector in the form `(x: 0, y: 0)`
     * @returns {String}
     */
    toString() {
        return `(x: ${this.x}, y: ${this.y})`;
    }

    /**
     * Returns an array representation of this vector in the form `[x, y]`
     * @returns {Number[]}
     */
    toArray() {
        return [this.x, this.y];
    }

    /**
     * Returns an object representation of this vector in the form `{x: 0, y: 0}`
     * @returns {{x: Number, y: Number}}
     */
    toObject() {
        return { x: this.x, y: this.y };
    }

    /*
    ############################
    #### Vector Operations  ####
    ############################
    */

    /**
     * Adds the given vector to this vector
     * @param {Vector} vector
     * @returns {Vector} this
     */
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    /**
     * Adds the `x` component of given vector to this vector
     * @param {Vector} vector
     * @returns {Vector} this
     */
    addX(vector) {
        this.x += vector.x;
        return this;
    }

    /**
     * Adds the `y` component of given vector to this vector
     * @param {Vector} vector
     * @returns {Vector} this
     */
    addY(vector) {
        this.y += vector.y;
        return this;
    }

    /**
     * Adds the given scalar to both components of this vector
     * @param {Number} scalar
     * @returns {Vector} this
     */
    addScalar(scalar) {
        this.x += scalar;
        this.y += scalar;
        return this;
    }

    /**
     * Adds the given scalar to the `x` component of this vector
     * @param {Number} scalar
     * @returns {Vector} this
     */
    addScalarX(scalar) {
        this.x += scalar;
        return this;
    }

    /**
     * Adds the given scalar to the `y` component of this vector
     * @param {Number} scalar
     * @returns {Vector} this
     */
    addScalarY(scalar) {
        this.y += scalar;
        return this;
    }

    /**
     * Subtracts the given vector from this vector
     * @param {Vector} vector
     * @returns {Vector} this
     */
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    /**
     * Subtracts the `x` component of given vector from this vector
     * @param {Vector} vector
     * @returns {Vector} this
     */
    subtractX(vector) {
        this.x -= vector.x;
        return this;
    }

    /**
     * Subtracts the `y` component of given vector from this vector
     * @param {Vector} vector
     * @returns {Vector} this
     */
    subtractY(vector) {
        this.y -= vector.y;
        return this;
    }

    /**
     * Subtracts the given scalar from both components of this vector
     * @param {Number} scalar
     * @returns {Vector} this
     */
    subtractScalar(scalar) {
        this.x -= scalar;
        this.y -= scalar;
        return this;
    }

    /**
     * Subtracts the given scalar from the `x` component of this vector
     * @param {Number} scalar
     * @returns {Vector} this
     */
    subtractScalarX(scalar) {
        this.x -= scalar;
        return this;
    }

    /**
     * Subtracts the given scalar from the `y` component of this vector
     * @param {Number} scalar
     * @returns {Vector} this
     */
    subtractScalarY(scalar) {
        this.y -= scalar;
        return this;
    }

    /**
     * Multiplies this vector by the given vector component-wise
     * @param {Vector} vector
     * @returns {Vector} this
     */
    multiply(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    }

    /**
     * Multiplies the `x` component of this vector by the `x` component of the given vector
     * @param {Vector} vector
     * @returns {Vector} this
     */
    multiplyX(vector) {
        this.x *= vector.x;
        return this;
    }

    /**
     * Multiplies the `y` component of this vector by the `y` component of the given vector
     * @param {Vector} vector
     * @returns {Vector} this
     */
    multiplyY(vector) {
        this.y *= vector.y;
        return this;
    }

    /**
     * Multiplies this vector by the given scalar
     * @param {Number} scalar
     * @returns {Vector} this
     */
    multiplyScalar(scalar) {
        if (scalar === 0) {
            return this.zero();
        }

        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Multiplies the `x` component of this vector by the given scalar
     * @param {Number} scalar
     * @returns {Vector} this
     */
    multiplyScalarX(scalar) {
        this.x *= scalar;
        return this;
    }

    /**
     * Multiplies the `y` component of this vector by the given scalar
     * @param {Number} scalar
     * @returns {Vector} this
     */
    multiplyScalarY(scalar) {
        this.y *= scalar;
        return this;
    }

    /**
     * Divides this vector by the given vector component-wise
     * @param {Vector} vector
     * @returns {Vector} this
     */
    divide(vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        return this;
    }

    /**
     * Divides the `x` component of this vector by the `x` component of the given vector
     * @param {Vector} vector
     * @returns {Vector} this
     */
    divideX(vector) {
        this.x /= vector.x;
        return this;
    }

    /**
     * Divides the `y` component of this vector by the `y` component of the given vector
     * @param {Vector} vector
     * @returns {Vector} this
     */
    divideY(vector) {
        this.y /= vector.y;
        return this;
    }

    /**
     * Divides this vector by the given scalar
     * @param {Number} scalar
     * @returns {Vector} this
     */
    divideScalar(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    /**
     * Divides the `x` component of this vector by the given scalar
     * @param {Number} scalar
     * @returns {Vector} this
     */
    divideScalarX(scalar) {
        this.x /= scalar;
        return this;
    }

    /**
     * Divides the `y` component of this vector by the given scalar
     * @param {Number} scalar
     * @returns {Vector} this
     */
    divideScalarY(scalar) {
        this.y /= scalar;
        return this;
    }

    /**
     * Multiplies this vector by -1
     * @returns {Vector} this
     */
    invert() {
        this.x *= -1;
        this.y *= -1;
        return this;
    }

    /**
     * Multiplies the `x` component of this vector by -1
     * @returns {Vector} this
     */
    invertX() {
        this.x *= -1;
        return this;
    }

    /**
     * Multiplies the `y` component of this vector by -1
     * @returns {Vector} this
     */
    invertY() {
        this.y *= -1;
        return this;
    }

    /**
     * Sets the magnitude of this vector to 1
     * @returns {Vector} this
     */
    normalize() {
        const length = this.length();

        if (length === 0) {
            this.x = 1;
            this.y = 0;
        } else {
            this.divideScalar(length);
        }

        return this;
    }

    /**
     * Sets each component of this vector to 0
     * @returns {Vector} this
     */
    zero() {
        this.x = 0;
        this.y = 0;
        return this;
    }

    /**
     * Rounds each component of this vector to the nearest integer
     * @returns {Vector} this
     */
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    /**
     * Rounds each component of this vector to a given precision
     * @param {Number} precision
     * @returns
     */
    toFixed(precision) {
        this.x = this.x.toFixed(precision);
        this.y = this.y.toFixed(precision);
        return this;
    }

    /**
     * Linearly interpolates between this vector and the given vector by the given ratio
     * @param {Vector} vector - the vector to interpolate to
     * @param {Number} ratio - a number between 0 and 1
     * @returns {Vector} this
     */
    mixInplace(vector, ratio) {
        this.mixX(vector, ratio);
        this.mixY(vector, ratio);
        return this;
    }

    /**
     * Linearly interpolates on the `x` component of this vector and the given vector by the given ratio
     * @param {Vector} vector - the vector to interpolate to
     * @param {Number} ratio - a number between 0 and 1
     * @returns {Vector} this
     */
    mixInplaceX(vector, ratio) {
        this.x = this.x * (1 - ratio) + vector.x * ratio;
        return this;
    }

    /**
     * Linearly interpolates on the `y` component of this vector and the given vector by the given ratio
     * @param {Vector} vector - the vector to interpolate to
     * @param {Number} ratio - a number between 0 and 1
     * @returns {Vector} this
     */
    mixInplaceY(vector, ratio) {
        this.y = this.y * (1 - ratio) + vector.y * ratio;
        return this;
    }

    /**
     * Returns a new vector that is the linear interpolation between this vector and the given vector by the given ratio
     * @param {Vector} vector - the vector to interpolate to
     * @param {Number} ratio - a number between 0 and 1
     * @returns {Vector} a new vector
     */
    mix(vector, ratio) {
        return this.clone().mixInplace(vector, ratio);
    }

    /**
     * Returns a new vector that is the linear interpolation on the `x` component of this vector and the given vector by the given ratio
     * @param {Vector} vector - the vector to interpolate to
     * @param {Number} ratio - a number between 0 and 1
     * @returns {Vector} a new vector
     */
    mixX(vector, ratio) {
        return this.clone().mixInplaceX(vector, ratio);
    }

    /**
     * Returns a new vector that is the linear interpolation on the `y` component of this vector and the given vector by the given ratio
     * @param {Vector} vector - the vector to interpolate to
     * @param {Number} ratio - a number between 0 and 1
     * @returns {Vector} a new vector
     */
    mixY(vector, ratio) {
        return this.clone().mixInplaceY(vector, ratio);
    }

    // TODO: Document rotations

    rotate(angle) {
        const x2 = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        const y2 = this.x * Math.sin(angle) + this.y * Math.cos(angle);

        this.x = x2;
        this.y = y2;

        return this;
    }

    rotateTo(angle) {
        this.rotate(angle - this.horizontalAngle());
        return this;
    }

    rotateToDegrees(angle) {
        return this.rotateTo(degreesToRadians(angle));
    }

    rotateBy(angle) {
        const rotation = this.horizontalAngle() + angle;
        return this.rotate(rotation);
    }

    rotateByDegrees(angle) {
        return this.rotateBy(degreesToRadians(angle));
    }

    /*
    ############################
    ####  Vector Products   ####
    ############################
    */

    /**
     * Computes the dot product of this vector and the given vector
     * @param {Vector} vector
     * @returns {Number}
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * Computes the cross product of this vector and the given vector
     * @param {Vector} vector
     * @returns {Number}
     */
    cross(vector) {
        return this.x * vector.y - this.y * vector.x;
    }

    /**
     * Returns the length of this vector
     * @returns {Number}
     */
    length() {
        return Math.sqrt(this.lengthSquared());
    }

    /**
     * Returns the squared length of this vector
     *
     * If you're comparing the lengths of two vectors, it's faster to use the squared lengths since it avoids the square root operation
     * @returns {Number}
     */
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * Returns the distance of the `x` component of this vector to the `x` component of the given vector
     * @param {Vector} vector
     * @returns {Number}
     */
    distanceX(vector) {
        return this.x - vector.x;
    }

    /**
     * Returns the absolute distance of the `x` component of this vector to the `x` component of the given vector
     * @param {Vector} vector
     * @returns {Number}
     */
    distanceAbsX(vector) {
        return Math.abs(this.distanceX(vector));
    }

    /**
     * Returns the distance of the `y` component of this vector to the `y` component of the given vector
     * @param {Vector} vector
     * @returns {Number}
     */
    distanceY(vector) {
        return this.y - vector.y;
    }

    /**
     * Returns the absolute distance of the `y` component of this vector to the `y` component of the given vector
     * @param {Vector} vector
     * @returns {Number}
     */
    distanceAbsY(vector) {
        return Math.abs(this.distanceY(vector));
    }

    /**
     * Returns the squared distance of this vector to the given vector
     *
     * If you only need this value for comparison, it's faster to use the squared distance since it avoids the square root operation
     * @param {Vector} vector
     * @returns {Number}
     */
    distanceSquared(vector) {
        const dx = this.distanceX(vector);
        const dy = this.distanceY(vector);
        return dx * dx + dy * dy;
    }

    /**
     * Returns the distance of this vector to the given vector
     * @param {Vector} vector
     * @returns {Number}
     */
    distance(vector) {
        return Math.sqrt(this.distanceSquared(vector));
    }

    /*
    ############################
    #### Vector Properties  ####
    ############################
    */

    /**
     * Returns the angle of this vector to the horizontal in radians
     * @returns {Number}
     */
    horizontalAngle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Returns the angle of this vector to the horizontal in degrees
     * @returns {Number}
     */
    horizontalAngleDegrees() {
        return radiansToDegrees(this.horizontalAngle());
    }

    /**
     * Returns the angle of this vector to the vertical in radians
     * @returns {Number}
     */
    verticalAngle() {
        return Math.atan2(this.x, this.y);
    }

    /**
     * Returns the angle of this vector to the vertical in degrees
     * @returns {Number}
     */
    verticalAngleDegrees() {
        return radiansToDegrees(this.verticalAngle());
    }

    /**
     * Returns true if both components of this vector are 0, false otherwise
     * @returns {Boolean}
     */
    isZero() {
        return this.x === 0 && this.y === 0;
    }

    /**
     * Returns true if both vectors have the same `x` and `y` components, false otherwise
     * @param {Vector} vector
     * @returns {Boolean}
     */
    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
    }
}

/**
 * Returns a random float between `min` and `max`
 * @param {Number} min
 * @param {Number} max
 * @returns
 */
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * @param {Number} min
 * @param {Number} max
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const DEGREE_CONVERSION = 180 / Math.PI;

/**
 * Converts radians to degrees
 * @param {Number} radians
 * @returns {Number} degrees
 */
function radiansToDegrees(radians) {
    return radians * DEGREE_CONVERSION;
}

/**
 * Converts degrees to radians
 * @param {Number} degrees
 * @returns {Number} radians
 */
function degreesToRadians(degrees) {
    return degrees / DEGREE_CONVERSION;
}
