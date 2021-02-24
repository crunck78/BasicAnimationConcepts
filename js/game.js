import { Draw } from "./draw.js"
import { World } from "./../models/world.js"
//import { Canvas } from "./canvas.js"

export class Game extends Draw {
	constructor() {
		super();
		//Canvas.init();
		this.level = new World();
		this.startDraw;
	}

	/**
	 * Draw Loop of Game
	 */
	draw() {
		this.level.draw();
		requestAnimationFrame(this.draw.bind(this));
	}

	/**
	 * Adds all necessary touch listener events for user interaction with the GamePad Elements
	 */
	static listenForTouches() {
		document.getElementById("left-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			this.level.pepe.isMovingLeft = true;
			this.level.pepe.direction = LEFT;
			this.level.pepe.requestMoveLeft = window.requestAnimationFrame(moveLeft);
		});
		document.getElementById("left-pad").addEventListener("touchend", function (e) {
			e.preventDefault();
			this.level.pepe.isMovingLeft = false;
			window.cancelAnimationFrame(this.level.pepe.requestMoveLeft);

		});
		document.getElementById("right-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			this.level.pepe.isMovingRight = true;
			this.level.pepe.direction = RIGHT;
			this.level.pepe.requestMoveRight = window.requestAnimationFrame(moveRight);
		});
		document.getElementById("right-pad").addEventListener("touchend", function (e) {
			e.preventDefault();
			this.level.pepe.isMovingRight = false;
			window.cancelAnimationFrame(this.level.pepe.requestMoveRight);
		});
		document.getElementById("jump-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			if (!this.level.pepe.jumpInProgess)
				window.requestAnimationFrame(jump);
		});
		document.getElementById("trow-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			if (!this.level.pepe.throwInProgress) {
				this.level.pepe.bottle.initY = this.level.pepe.y;
				window.requestAnimationFrame(throwBottle);
			}
		});
	}

	/**
	 * Adds all KeyDown and KeyUp Listener events for the user interaction with the Keyboard
	 */
	static listenForKeys() {
		document.addEventListener("keydown", function (e) {
			const k = e.key;
			if (e.code == "Space" && !this.level.pepe.jumpInProgess) {
				window.requestAnimationFrame(jump);
			}
			if (k == "ArrowRight" && !this.level.pepe.isMovingRight) {
				this.level.pepe.isMovingRight = true;
				this.level.pepe.direction = RIGHT;
				this.level.pepe.requestMoveRight = window.requestAnimationFrame(moveRight);
			}
			if (k == "ArrowLeft" && !this.level.pepe.isMovingLeft) {
				this.level.pepe.isMovingLeft = true;
				this.level.pepe.direction = LEFT;
				this.level.pepe.requestMoveLeft = window.requestAnimationFrame(moveLeft);
			}
			if (k == "d" && !this.level.pepe.throwInProgress) {
				this.level.pepe.bottle.initY = this.level.pepe.y;
				window.requestAnimationFrame(throwBottle);
			}
		});
		document.addEventListener("keyup", function (e) {
			const k = e.key;
			if (k == "ArrowRight" && this.level.pepe.isMovingRight) {
				this.level.pepe.isMovingRight = false;
				window.cancelAnimationFrame(this.level.pepe.requestMoveRight);
			}
			if (k == "ArrowLeft" && this.level.pepe.isMovingLeft) {
				this.level.pepe.isMovingLeft = false;
				window.cancelAnimationFrame(this.level.pepe.requestMoveLeft);
			}
		});
	}
}
