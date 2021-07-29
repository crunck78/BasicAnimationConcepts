// import { Model } from "../models/model.js";
// import { Scene } from "../models/scene.js";
import { Camera } from "./camera.js";

export class Draw {
	constructor() {
		if (new.target === Draw) {
			throw new TypeError("Cannot construct Draw instances directly");
		}else{
			this.startUpdate;
			this.intervalCounter;
			this.animationInterval = 60;
			this.animationIndex = 0;
		}
	}

	/**
	 * Abstract methode. Implemented by the Child Class
	 */
	draw() {
		throw new TypeError("Methode has no implementation!");
	}

	/**
	 * Abstract methode. Implemented by the Child Class
	 */
	serStatus(currentStatus){
		throw new TypeError("Methode has no implementation!");
	}


	/**
	 * Abstract methode. Implemented by the Child Class
	 */
	moveLeft() {
		throw new TypeError("Methode has no implementation!");
	}

	/**
	 * Abstract methode. Implemented by the Child Class
	 */
	moveRight() {
		throw new TypeError("Methode has no implementation!");
	}

	/**
	 * Abstract methode. Implemented by the Child Class
	 */
	checkForCollisions(){
		throw new TypeError("Methode has no implementation!");
	}

	/**
	 * Holds the first Canvas of the DOM
	 * @type HTMLCanvasElement
	 */
	static cnv;
	/**
	 * Holds the 2d Context of the Canvas.
	 * @type CanvasRenderingContext2D
	 */
	static ctx;
	/**
	 * Holds a the Ground Position of the Game.
	 * @type number
	 */
	static GROUND_POS;

	/**
	 * Issues the draw call of an Array of Model or Scene instances.
	 * @param {Model[] | Scene[]} elements 
	 */
	static drawElements(elements) {
		elements.forEach(element => {
			Draw.ctx.save();
			element.draw();
			Draw.ctx.restore();
		});
	}

	/**
	 *  Iterates an Array of Models or Scenes and move each Model to the right by a given speed
	 * 
	 * @param {Model[] | Scene[]} elements 
	 * @param {number} movementSpeed 
	 */
	static moveElementsRight(elements, movementSpeed) {
		elements.forEach(element => {
			element.moveRight(movementSpeed);
		});
	}

	/**
	 * Iterates an Array of Models or Scenes and move each to the left by a given speed
	 * 
	 * @param {Model[] | Scene[]} elements 
	 * @param {number} movementSpeed 
	 */
	static moveElementsLeft(elements, movementSpeed) {
		elements.forEach(element => {
			element.moveLeft(movementSpeed);
		});
	}

	/**
	 * Used to clear The Canvas on repainting, should be called 1st, before any other draw calls.
	 */
	static clearCanvas() {
		Draw.ctx.clearRect(0, 0, Draw.cnv.width, Draw.cnv.height);
	}

	/**
	 * Draws a rectangle using the properties of passed argument Object that must contain x, y, width and height fields declared and initialized
	 * @param {Model} elm - element to draw a rectangle using its fields values {x: number, y: number , width: number, height: number}
	 */
	static drawModelRect(elm) {
		Draw.ctx.save();
		// if(elm.tracking)
			Draw.ctx.translate(Camera.x * elm.distance, Camera.y);
		Draw.ctx.beginPath();
		Draw.ctx.rect(elm.x * elm.direction, elm.y, elm.width * elm.direction, elm.height);
		Draw.ctx.fillStyle = `${elm.color}`;
		Draw.ctx.fill();
		//Draw.ctx.translate(-Camera.x * elm.distance, Camera.y);
		Draw.ctx.restore();
	}

	/**
	 * Initialize static members of Draw. cnv, ctx and GROUND_POS 
	 */
	static init() {
		if (!Draw.cnv) {
			Draw.cnv = document.getElementsByTagName("canvas")[0];
			Draw.cnv.classList.remove("d-none");
			Draw.ctx = Draw.cnv.getContext("2d");
			Draw.GROUND_POS = Draw.cnv.height - 50; //Adjust to fit your enviorment.
		}
	}

	/**
	 * 
	 * @param {*} timeStamp 
	 */
	 update(timeStamp) {
		if (this.startUpdate === undefined) {// update start
			this.startUpdate = timeStamp;// set timer to 0
			this.intervalCounter = this.animationInterval;
		}
		const elapse = Math.trunc(timeStamp - this.startUpdate);

		this.currentImg = this.animations[this.status][this.animationIndex % this.animations[this.status].length];

		if (elapse > this.intervalCounter) {
			this.intervalCounter = this.animationInterval + elapse;
			this.animationIndex++;
		}
	}
}
