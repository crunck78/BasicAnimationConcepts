import { Draw } from "./draw.js"
import { World } from "./../models/world.js"
import { LEFT_DIRECTION, RIGHT_DIRECTION, LEFT_SIDE, RIGHT_SIDE, ABOVE_SIDE, BELOW_SIDE, DEBUG_ON } from "./constants.js"
import { Log } from "./log.js"
import { Character } from "../models/character.js";

export class Game extends Draw {

	static debugMode = DEBUG_ON;
	//static gameInstances = 0;
	/**
	 * Holds the requestAnimationFrame index to Game.moveLeft, used to cancel the requestAnimationFrame.
	 * ( See Game.listenForKeys and Game.listenForTouches )
	 * @type number
	 */
	static requestMoveLeft;
	/**
	 * Holds the requestAnimationFrame index to Game.moveRight, used to cancel the requestAnimationFrame.
	 * ( See Game.listenForKeys and Game.listenForTouches )
	 * @type number
	 */
	static requestMoveRight;
	constructor(allAnimations) {
		//Game.gameInstances++;
		super();
		this.level = new World(allAnimations);
		//this.touchPadCont;
		//this.startDraw;
	}

	/**
	 * Draw Loop of Game
	 */
	draw() {
		this.level.draw();
		requestAnimationFrame(this.draw.bind(this));
	}

	/**
	* UpdateLoop
	*/
	update(timeStamp) {
		this.level.update(timeStamp);
		requestAnimationFrame(this.update.bind(this));
	}

	/**
	 * Keeps issuing the moveLeft methode of World's instance and 
	 * updates the Game.requestMoveLeft static member, as long as request animation frame is not canceled.
	 * ( See Game.listenForKeys and Game.listenForTouches for usage and cancelation. )
	 */
	moveLeft(timeStamp) {
		if (this.level.worldLeftEdge.x >= 0) {
			if (!Game.isColliding(this.level.pepe, this.level.worldLeftEdge)) 
				this.level.pepe.moveRight(this.level.pepe.movementSpeed);
		} else {
			this.level.moveLeft(timeStamp);
		}
		Game.requestMoveLeft = requestAnimationFrame(this.moveLeft.bind(this));
	}
	/**
	 * Keeps issuing the moveRight methode of World's instance and 
	 * updates the Game.requestMoveRight static member, as long as request animation frame is not canceled.
	 * ( See Game.listenForKeys and Game.listenForTouches for usage and cancelation )
	 */
	moveRight(timeStamp) {
		if (!Game.isColliding(this.level.pepe, this.level.worldRightEdge)) {
			if (!Game.isColliding(this.level.pepe, this.level.worldCenter)) {
				this.level.pepe.moveLeft(this.level.pepe.movementSpeed);
			} else {
				if(this.level.worldRightEdge.x >= Draw.cnv.width)
					this.level.moveRight(timeStamp);
					else{
						this.level.pepe.moveLeft(this.level.pepe.movementSpeed);
					}
			}
		}
		Game.requestMoveRight = requestAnimationFrame(this.moveRight.bind(this));
	}

	/**
	 * Returns true or false if the arguments Models in game collide.
	 * @param {Model} obj1 - 
	 * @param {Model} obj2 -
	 * @returns {boolean} true || false
	 */
	static isColliding(obj1, obj2) {
		//TODO check also for below intersection
		return ((obj2.x - obj1.x + obj2.collisionOffset.x[RIGHT_SIDE]) < (obj1.width - obj1.collisionOffset.x[LEFT_SIDE]) && (obj1.x - obj2.x + obj1.collisionOffset.x[LEFT_SIDE]) < (obj2.width - obj2.collisionOffset.x[RIGHT_SIDE])) && ((obj2.y - obj1.y + obj2.collisionOffset.y[ABOVE_SIDE]) < (obj1.height - obj1.collisionOffset.y[BELOW_SIDE]));
	}

	/**
	 * Adds all necessary touch listener events for user interaction with the GamePad Elements
	 * @param {Character} pepe
	 * @param {Game} game
	 */
	listenForTouches(pepe, game) {
		document.getElementById("left-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			pepe.isMovingLeft = true;
			pepe.moveInProgress = true;
			pepe.direction = LEFT;
			Game.requestMoveLeft = window.requestAnimationFrame(game.moveLeft.bind(game));
		});
		document.getElementById("left-pad").addEventListener("touchend", function (e) {
			e.preventDefault();
			pepe.isMovingLeft = false;
			pepe.moveInProgress = false;
			window.cancelAnimationFrame(Game.requestMoveLeft);

		});
		document.getElementById("right-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			pepe.isMovingRight = true;
			pepe.moveInProgress = true;
			pepe.direction = RIGHT;
			Game.requestMoveRight = window.requestAnimationFrame(game.moveRight.bind(game));
		});
		document.getElementById("right-pad").addEventListener("touchend", function (e) {
			e.preventDefault();
			pepe.isMovingRight = false;
			pepe.moveInProgress = false;
			window.cancelAnimationFrame(Game.requestMoveRight);
		});
		document.getElementById("jump-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			if (!pepe.jumpInProgess)
				window.requestAnimationFrame(pepe.jump.bind(pepe));
		});
		document.getElementById("trow-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			if (!pepe.throwInProgress) {
				pepe.bottle.initY = pepe.y;
				window.requestAnimationFrame(pepe.throwBottle.bind(pepe));
			}
		});
	}

	/**
	 * Adds all KeyDown and KeyUp Listener events for the user interaction with the Keyboard.
	 * @param {Character} pepe
	 * @param {Game} game
	 */
	listenForKeys(pepe, game) {
		document.addEventListener("keydown", function (e) {
			const k = e.key;
			if (e.code == "Space" && !pepe.jumpInProgess) {
				window.requestAnimationFrame(pepe.jump.bind(pepe));
			}
			if (k == "ArrowRight" && !pepe.isMovingRight) {
				pepe.isMovingRight = true;
				pepe.direction = RIGHT_DIRECTION;
				pepe.moveInProgress = true;
				Game.requestMoveRight = window.requestAnimationFrame(game.moveRight.bind(game));
			}
			if (k == "ArrowLeft" && !pepe.isMovingLeft) {
				pepe.isMovingLeft = true;
				pepe.direction = LEFT_DIRECTION;
				pepe.moveInProgress = true;
				Game.requestMoveLeft = window.requestAnimationFrame(game.moveLeft.bind(game));
			}
			if (k == "d" && !pepe.throwInProgress) {
				pepe.bottle.initY = pepe.y;
				window.requestAnimationFrame(pepe.throwBottle.bind(pepe));
			}
		});
		document.addEventListener("keyup", function (e) {
			const k = e.key;
			if (k == "ArrowRight" && pepe.isMovingRight) {
				pepe.isMovingRight = false;
				pepe.moveInProgress = false;
				window.cancelAnimationFrame(Game.requestMoveRight);
			}
			if (k == "ArrowLeft" && pepe.isMovingLeft) {
				pepe.isMovingLeft = false;
				pepe.moveInProgress = false;
				window.cancelAnimationFrame(Game.requestMoveLeft);
			}
		});
	}
}
