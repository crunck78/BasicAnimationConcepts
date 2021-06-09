import { Draw } from "./draw.js"
import { World } from "./../models/world.js"
import { LEFT_DIRECTION, RIGHT_DIRECTION, LEFT_SIDE, RIGHT_SIDE, ABOVE_SIDE, BELOW_SIDE, DEBUG_ON, LOG } from "./constants.js"
import { Log } from "./log.js"
import { Character } from "../models/character.js"
import { Camera } from "./camera.js"
import { Bottle } from "../models/bottle.js"
import { Coin } from "../models/coin.js"
import { Hud } from "./hud.js"

export class Game extends Draw {

	static debugMode = DEBUG_ON;
	//static gameInstances = 0;

	/**
	 * 
	 */
	static requestCollisionCheck;
	static requestThrow;
	static requestAction;
	static stopAction;
	/**
	 * Holds the requestAnimationFrame index to Game.moveLeft, used to cancel the requestAnimationFrame.
	 * ( See Game.listenForKeys and Game.listenForTouches )
	 * @type number
	 */
	static requestMoveLeft;
	static requestLeftMove;
	/**
	 * Holds the requestAnimationFrame index to Game.moveRight, used to cancel the requestAnimationFrame.
	 * ( See Game.listenForKeys and Game.listenForTouches )
	 * @type number
	 */
	static requestMoveRight;
	static requestRightMove;
	constructor(allAnimations) {
		//Game.gameInstances++;
		super();
		this.level = new World(allAnimations);
		this.hud = new Hud(this.level.pepe);
		Camera.x = 0;
		Camera.y = 0;
		//this.touchPadCont;
		//this.startDraw;
		this.startCollisionCkeck;
	}

	/**
	 * Draw Loop of Game
	 */
	draw() {
		this.level.draw();
		requestAnimationFrame(this.draw.bind(this));
	}

	/**
	 * 
	 * @param {*} timeStamp -
	 */
	update(timeStamp) {
		this.level.update(timeStamp);
		this.hud.update(timeStamp);
		requestAnimationFrame(this.update.bind(this));
	}

	/**
	 * Check collisions Loop
	 * @param {*} timeStamp - 
	 */
	 checkForCollisions(timeStamp) {
		this.level.checkForCollisions(timeStamp);
		requestAnimationFrame(this.checkForCollisions.bind(this));
	}

	/**
	 * Keeps issuing the moveLeft methode of World's instance and 
	 * updates the Game.requestMoveLeft static member, as long as request animation frame is not canceled.
	 * ( See Game.listenForKeys and Game.listenForTouches for usage and cancelation. )
	 */
	moveLeft(timeStamp) {
		if (this.level.worldLeftEdge.x >= 0) {
			if (!World.isColliding(this.level.pepe, this.level.worldLeftEdge)) {
				this.level.pepe.moveRight(this.level.pepe.movementSpeed);
			}
		} else if (this.level.worldRightEdge.x <= Draw.cnv.width) {
			if (!World.isColliding(this.level.pepe, this.level.worldCenter)) {
				this.level.pepe.moveRight(this.level.pepe.movementSpeed);
			} else {
				this.level.moveLeft(timeStamp);
			}
		} else {
			this.level.moveLeft(timeStamp);
		}
		Game.requestMoveLeft = requestAnimationFrame(this.moveLeft.bind(this));
	}


	/**
	 * 
	 * @param {*} timeStamp 
	 */

	/**
	 * Keeps issuing the moveRight methode of World's instance and 
	 * updates the Game.requestMoveRight static member, as long as request animation frame is not canceled.
	 * ( See Game.listenForKeys and Game.listenForTouches for usage and cancelation )
	 */
	moveRight(timeStamp) {
		if (!World.isColliding(this.level.pepe, this.level.worldRightEdge)) {
			if (!World.isColliding(this.level.pepe, this.level.worldCenter)) {
				this.level.pepe.moveLeft(this.level.pepe.movementSpeed);
			} else {
				if (this.level.worldRightEdge.x >= Draw.cnv.width)
					this.level.moveRight(timeStamp);
				else {
					if (!World.isColliding(this.level.pepe, this.level.worldRightEdge))
						this.level.pepe.moveLeft(this.level.pepe.movementSpeed);
				}
			}
		}
		Game.requestMoveRight = requestAnimationFrame(this.moveRight.bind(this));
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
			if (e.code == "Space" && !pepe.jumpInProgess && pepe.canJump) {
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
				pepe.bottle.initX = pepe.x;
				pepe.bottle.direction = pepe.direction;
				window.requestAnimationFrame(pepe.throwBottle.bind(pepe));
			}
			if (k == "p") {
				//TODO - PAUSE GAME
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

	/**
	 * Adds all KeyDown and KeyUp Listener events for the user interaction with the Keyboard.
	 */
	listenForKeys2() {
		document.addEventListener("keydown", this.handleKeyDown);
		document.addEventListener("keyup", this.handleKeyUp);
	}

	handleKeyDown(event) {
		const k = event.key;
		Game.requestAction = event.code;
		Game.requestJump = event.code == "Space";
		Game.requestRightMove = k == "ArrowRight";
		Game.requestLeftMove = k == "ArrowLeft";
		Game.requestThrow = k == "d";
	}

	handleKeyUp(event) {
		const k = event.key;
		Game.stopAction = event.code;
		Game.requestJump = !(event.code == "Space") && Game.requestJump;
		Game.requestRightMove = !(k == "ArrowRight") && Game.requestRightMove;
		Game.requestLeftMove = !(k == "ArrowLeft") && Game.requestLeftMove;
		Game.requestThrow = !(k == "d") && Game.requestThrow;
	}
}
