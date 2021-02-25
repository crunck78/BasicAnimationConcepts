import { Draw } from "./draw.js"
import { World } from "./../models/world.js"
import { LEFT, RIGHT } from "./constants.js"
import { Log } from "./log.js"

export class Game extends Draw {
	
	static gameInstances = 0;
	static requestMoveLeft;
	static requestMoveRight;
	constructor() {
		Game.gameInstances++;
		super();
		this.level = new World();
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

	/**
	 * 
	 */
	static moveLeft(){
		console.log("Moving left");
		Game.requestMoveLeft = requestAnimationFrame(Game.moveLeft);
	}
	
	/**
	 * 
	 */
	static moveRight(){
		console.log("Moving right");
		Game.requestMoveRight = requestAnimationFrame(Game.moveRight);
	}

	/**
	 * Adds all necessary touch listener events for user interaction with the GamePad Elements
	 * @param {*} pepe
	 */
	listenForTouches(pepe) {
		document.getElementById("left-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			pepe.isMovingLeft = true;
			pepe.direction = LEFT;
			Game.requestMoveLeft = window.requestAnimationFrame(Game.moveLeft);
		});
		document.getElementById("left-pad").addEventListener("touchend", function (e) {
			e.preventDefault();
			pepe.isMovingLeft = false;
			window.cancelAnimationFrame(Game.requestMoveLeft);

		});
		document.getElementById("right-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			pepe.isMovingRight = true;
			pepe.direction = RIGHT;
			Game.requestMoveRight = window.requestAnimationFrame(Game.moveRight);
		});
		document.getElementById("right-pad").addEventListener("touchend", function (e) {
			e.preventDefault();
			pepe.isMovingRight = false;
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
	 * Adds all KeyDown and KeyUp Listener events for the user interaction with the Keyboard
	 */
	listenForKeys(pepe) {
		document.addEventListener("keydown", function (e) {
			const k = e.key;
			if (e.code == "Space" && !pepe.jumpInProgess) {
				window.requestAnimationFrame(pepe.jump.bind(pepe));
			}
			if (k == "ArrowRight" && !pepe.isMovingRight) {
				pepe.isMovingRight = true;
				pepe.direction = RIGHT;
				Game.requestMoveRight = window.requestAnimationFrame(Game.moveRight);
			}
			if (k == "ArrowLeft" && !pepe.isMovingLeft) {
				pepe.isMovingLeft = true;
				pepe.direction = LEFT;
				Game.requestMoveLeft = window.requestAnimationFrame(Game.moveLeft);
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
				window.cancelAnimationFrame(Game.requestMoveRight);
			}
			if (k == "ArrowLeft" && pepe.isMovingLeft) {
				pepe.isMovingLeft = false;
				window.cancelAnimationFrame(Game.requestMoveLeft);
			}
		});
	}
}
