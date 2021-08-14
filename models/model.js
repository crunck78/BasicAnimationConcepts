import { RIGHT_DIRECTION, WIREFRAME_ON, WIREFRAME_OFF, NULL, LEFT_DIRECTION } from "../js/constants.js";
import { Game } from "../js/game.js";
import { Draw } from "./../js/draw.js"
import { Camera } from "./../js/camera.js";
import { Character } from "./character.js";

export class Model extends Draw {

	constructor(xPos = 0, yPos = 0, distance = 1, scale = 1, width, height, color = "white", status, animationObj) {
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
		

		this.direction = RIGHT_DIRECTION;
		this.intervalHit;

		this.movementSpeed = 0; // was 2
		this.collisionOffset = { x: [0, 0], y: [0, 0] }; //offsets the collision detection
		this.collisionImmun = false;
		this.tracking = false;

		this.status = status;
		this.groundPos = Draw.GROUND_POS - height;
		this.isMovingLeft = false;
		this.isMovingRight = false;

		this.requestMoveRight = 0;
		this.requestMoveLeft = 0;
		this.animations = animationObj ? animationObj : {};
		this.currentImg = animationObj ? animationObj[status][0] : new Image();
		this.startMove;
		this.startHit;
		this.moveInProgress = false;
		this.collisionInProgress = false;
	}

	/**
	 * Draws a Model on a initialized canvas. Canvas is to be initialized using the static methode init of the Draw class
	 */
	draw() {
		if (this.isInsideCanvas()) {
			if (Game.debugMode)
				this.showInfo();
			if (this.currentImg && this.currentImg.complete) {
				Draw.ctx.save();
				Draw.ctx.scale(this.direction, 1);
				Draw.ctx.translate(Camera.x * this.distance, Camera.y * this.distance);
				Draw.ctx.drawImage(this.currentImg, this.x * this.direction, this.y, this.width * this.direction, this.height);
				if (Game.debugMode && this.wireframeMode)
					this.drawWireframe();
				Draw.ctx.restore();
			}
			else {
				Draw.drawModelRect(this);
			}
		}
	}

	showInfo() {
		//TODO FIX ON DIRECTION CHANGE
		if (this.tracking)
			Draw.ctx.translate(Camera.x * this.distance, Camera.y * this.distance);
		Draw.ctx.font = `bold 16px sans-serif`;
		Draw.ctx.fillStyle = this.color;
		Draw.ctx.fillText(Math.trunc(this.x) + ", " + Math.trunc(this.y) + ", " + this.width + ", " + this.height, this.x, this.y);
		if (this.tracking)
			Draw.ctx.translate(-Camera.x * this.distance, -Camera.y * this.distance);
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
		this.x -= movementSpeed ? (movementSpeed * this.distance) : (this.movementSpeed * this.distance);
	}

	/**
	 * Moves the  Model to the right by a given speed
	 * 
	 * @param {number} movementSpeed 
	 */
	moveRight(movementSpeed) {
		this.x += movementSpeed ? (movementSpeed * this.distance) : (this.movementSpeed * this.distance);
	}

	/**
	 * Moves the  Model by a given speed
	 * 
	 * @param {number} movementSpeed 
	 */
	move(movementSpeed) {
		if (this.direction == LEFT_DIRECTION)
			this.x -= movementSpeed ? (movementSpeed * this.distance) : (this.movementSpeed * this.distance);
		if (this.direction == RIGHT_DIRECTION)
			this.x += movementSpeed ? (movementSpeed * this.distance) : (this.movementSpeed * this.distance);
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
		return (this.x - obj.x - obj.width) > 0;
	}

	/**
	 * Check if this instance is intersecting the obj's x axie
	 * @param {Model} obj - Model instace to check if this instance is intersecting  obj on the x axie.
	 * @returns {boolean} - true if this instance intersects obj  on the x axie, or false if not
	 */
	isIntersectingX(obj) {
		return !(this.isLeftFrom(obj) || this.isRightFrom(obj));
	}

	/**
	 * Check if this instance is intersecting the obj's y axie
	 * @param {Model} obj - Model instace to check if this instance is intersecting  obj on the y axie.
	 * @returns {boolean} - true if this instance intersects obj on the y axie, or false if not
	 */
	isIntersectingY(obj) {
		return !(this.isAbove(obj) || this.isBelow(obj));
	}

	/**
	 * 
	 * @param {*} timeStamp 
	 */
	update(timeStamp) {

		super.update(timeStamp);
	}

	/**
	 * Checks if the Model is inside Canvas
	 */
	isInsideCanvas() {
		return !(this.x > Draw.cnv.width || (this.x + this.width) < NULL);
	}

}