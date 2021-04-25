import { RIGHT_DIRECTION, WIREFRAME_ON, WIREFRAME_OFF } from "../js/constants.js";
import { Game } from "../js/game.js";
import { Draw } from "./../js/draw.js"

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
		this.collisionImmun = false;
	}

	/**
	 * Draws a Model on a initialized canvas. Canvas is to be initialized using the static methode init of the Draw class
	 */
	draw() {
		if (this.currentImg && this.currentImg.complete) {
			Draw.ctx.save();

			//Draw.ctx.translate(this.x, this.y);
			Draw.ctx.scale(this.direction, 1);
			if (Game.debugMode) {
				if (this.wireframeMode)
					this.drawWireframe();
			}

			Draw.ctx.drawImage(this.currentImg, this.x * this.direction, this.y, this.width * this.direction, this.height);
			Draw.ctx.restore();

			if (Game.debugMode)
				this.showInfo();
		}
		else
			Draw.drawModelRect(this);
	}

	showInfo() {
		Draw.ctx.font = `bold 16px sans-serif`;
		Draw.ctx.fillStyle = this.color;
		Draw.ctx.fillText(Math.trunc(this.x) + ", " + Math.trunc(this.y) + ", " + this.width + ", " + this.height, this.x, this.y);
	}

	drawWireframe() {
		Draw.ctx.strokeStyle = this.color;
		Draw.ctx.strokeRect(this.x * this.direction, this.y, this.width * this.direction, this.height);
		Draw.ctx.stroke();
	}

	/**
	 * Moves the Model to the left by a given speen
	 * 
	 * @param {number} movementSpeed 
	 */
	moveLeft(movementSpeed) {
		this.x += movementSpeed ? (movementSpeed * this.distance) : (this.movementSpeed * this.distance);
	}

	/**
	 * Moves the  Model to the right by a given speed
	 * 
	 * @param {number} movementSpeed 
	 */
	moveRight(movementSpeed) {
		this.x -= movementSpeed ? (movementSpeed * this.distance) : (this.movementSpeed * this.distance);
	}

	/**
	 * Check if this instance is above parameter.
	 * @param {Model} obj - Model instace to check if this instance is above obj parameter.
	 * @returns {boolean} - true if this instance above obj, or false if not
	 */
	isAbove(obj) {
		//		above distance from obj
		return (obj.y - this.y - this.height) > 0;
	}

	/**
	 * Check if this instace is below parameter.
	 * @param {Model} obj - Model instace to check if this instance is below obj parameter.
	 * @returns {boolean} - true if this instance below obj, or false if not
	 */
	isBelow(obj) {
		//		below distance from obj
		// console.log(this.y, obj.y + obj.width);
		return (this.y - obj.y - obj.height) > 0;
	}

	/**
	 * Check if this instance is left from parameter.
	 * @param {Model} obj - Model instace to check if this instance is on the left side of obj parameter.
	 * @returns {boolean} - true if this instance left from obj, or false if not
	 */
	isLeftFrom(obj) {
		//			left side distance from obj	
		return (obj.x - this.x - this.width) > 0;
	}

	/**
	 * Check if this instace is right from parameter.
	 * @param {Model} obj - Model instace to check if this instance is on the right side of obj parameter.
	 * @returns {boolean} - true if this instance right from obj, or false if not
	 */
	isRightFrom(obj) {
		//		right side distance from obj
		return (this.x - obj.x - obj.width) > 0;
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
