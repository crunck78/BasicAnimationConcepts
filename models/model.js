import { RIGHT_DIRECTION, WIREFRAME_ON, WIREFRAME_OFF } from "../js/constants.js";
import { Draw } from "./../js/draw.js"
//import { Enemy } from "./enemy.js";

export class Model extends Draw {
	constructor(xPos, yPos, distance, scale, width, height, color) {
		super();
		this.wireframeMode = WIREFRAME_ON;
		this.x = xPos;
		this.y = yPos;
		this.width = width;
		this.height = height;
		this.distance = distance; //between 0 and 1 , closing to 1 means faster and vice versa.
		this.scale = scale; //between 0 and 1, closing to 1 means image size is closer to original, closing to 0 means image size ist smaller
		this.color = color;
		this.currentImg;
		this.startUpdate;
		this.direction = RIGHT_DIRECTION;
		this.intervalCounter;
		this.movementSpeed = 2;
		this.collisionOffset = { x: [0, 0], y: [0, 0] }; //offsets the collision detection
	}

	/**
	 * Draws a Model on a initialized canvas. Canvas is to be initialized using the static methode init of the Draw class
	 */
	draw() {
		if (this.currentImg && this.currentImg.complete) {
			Draw.ctx.save();
			Draw.ctx.scale(this.direction, 1);
			Draw.ctx.drawImage(this.currentImg, this.x * this.direction, this.y, this.width * this.direction, this.height);
			if (this.wireframeMode) {
				Draw.ctx.strokeStyle = this.color;
				Draw.ctx.strokeRect(this.x * this.direction, this.y, this.width * this.direction, this.height);
				//Draw.ctx.rect(this.x, this.y, this.width * this.direction, this.height);
				Draw.ctx.stroke();
			}
			Draw.ctx.restore();
		}
		else
			Draw.drawModelRect(this);
	}

	/**
	 * Moves the Model to the left by a given speen
	 * 
	 * @param {number} movementSpeed 
	 */
	moveLeft(movementSpeed) {
		this.x += movementSpeed? (movementSpeed * this.distance) : (this.movementSpeed * this.distance);
	}

	/**
	 * Moves the  Model to the right by a given speed
	 * 
	 * @param {number} movementSpeed 
	 */
	moveRight(movementSpeed) {
		this.x -= movementSpeed? (movementSpeed * this.distance) : (this.movementSpeed * this.distance);
	}

	/**
	 * Check if this instace is above parameter.
	 * @param {Model} obj - Model instace to check if this instance is above obj parameter.
	 * @returns {boolean} - true if this instance above obj, or false if not
	 */
	isAbove(obj) {

	}

	/**
	 * Check if this instace is below parameter.
	 * @param {Model} obj - Model instace to check if this instance is below obj parameter.
	 * @returns {boolean} - true if this instance below obj, or false if not
	 */
	isBelow(obj) {

	}

	/**
	 * Abstract methode. Implemented by the Child Class
	 */
	setStatus(currentStatus) {
		throw new TypeError("Methode has no implementation!");
	}

	/**
	 * Abstract methode. Implemented by the Child Class
	 */
	update() {
		throw new TypeError("Methode has no implementation!");
	}
}
