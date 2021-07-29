import { Draw } from "./draw.js"
import { World } from "./../models/world.js"
import { LEFT_DIRECTION, RIGHT_DIRECTION, LEFT_SIDE, RIGHT_SIDE, ABOVE_SIDE, BELOW_SIDE, DEBUG_ON, LOG, ACTIONS } from "./constants.js"
import { Log } from "./log.js"
import { Character } from "../models/character.js"
import { Camera } from "./camera.js"
import { Bottle } from "../models/bottle.js"
import { Coin } from "../models/coin.js"
import { Hud } from "./hud.js"

export class Game extends Draw {

	static debugMode = DEBUG_ON;
	static gameInstances = 0;
	
	constructor(allAnimations) {
		Game.gameInstances++;
		Camera.x = 0;
		Camera.y = 0;
		Draw.init();
		super();
		
		this.level = new World(allAnimations);
		this.hud = new Hud(this.level.pepe);
		
		this.drawStamp;
		this.drawRequest = requestAnimationFrame(this.draw.bind(this));

		this.updateStamp;
		this.updateRequest = requestAnimationFrame(this.update.bind(this));
		
		this.collisionsStamp;
		this.collisionsRequest = requestAnimationFrame(this.checkCollisions.bind(this));

		this.actionsRequest;
		this.actionsStamp = requestAnimationFrame(this.handleActionsRequests.bind(this));

		this.listenForTouches();
		this.listenForKeys();
	}

	/**
	 * Draw Loop of Game
	 */
	draw(timeStamp) {
		if (this.drawStamp === undefined)
			this.drawStamp = timeStamp;
		Draw.ctx.save();
		this.level.draw();
		Draw.ctx.restore();
		this.drawRequest = requestAnimationFrame(this.draw.bind(this));
	}

	startDraw() {
		this.drawRequest = requestAnimationFrame(this.draw.bind(this));
	}

	stopDraw() {
		this.drawStamp = undefined;
		this.cancelAnimationFrame(this.drawRequest);
	}

	/**
	 * 
	 * @param {*} timeStamp -
	 */
	update(timeStamp) {
		if (this.updateStamp === undefined)
			this.updateStamp = timeStamp;
		this.level.update(timeStamp);
		this.hud.update(timeStamp);
		this.updateRequest = requestAnimationFrame(this.update.bind(this));
	}

	startUpdate() {
		this.updateRequest = requestAnimationFrame(this.update.bind(this));
	}

	stopUpdate() {
		this.updateStamp = undefined;
		this.cancelAnimationFrame(this.updateRequest);
	}

	/**
	 * Check collisions Loop
	 * @param {*} timeStamp - 
	 */
	checkCollisions(timeStamp) {
		if (this.collisionsStamp === undefined)
			this.collisionsStamp = timeStamp;
		this.level.checkForCollisions(timeStamp);
		this.collisionsRequest = requestAnimationFrame(this.checkCollisions.bind(this));
	}

	startCollisionsCheck() {
		this.collisionsRequest = requestAnimationFrame(this.checkCollisions.bind(this));
	}

	stopCollisionsCheck() {
		this.collisionsStamp = undefined;
		this.cancelAnimationFrame(this.collisionsRequest);
	}

	handleActionsRequests(timeStamp) {
		if(this.actionsStamp === undefined)
			this.actionsStamp = timeStamp;
		this.level.handleActionsRequests(timeStamp);
		this.actionsRequest = requestAnimationFrame(this.handleActionsRequests.bind(this));
	}

	startHandleActionsRequests() {
		this.actionsRequest = requestAnimationFrame(this.checkForCollisions.bind(this));
	}

	stopHandleActionsRequests() {
		this.startActions = undefined;
		this.cancelAnimationFrame(this.actionsRequest);
	}

	/**
	 * 
	 * @param {*} currentStatus 
	 */
	 setStatus(currentStatus) {
		
	}

	/**
	 * Adds all necessary touch listener events for user interaction with the GamePad Elements
	 */
	listenForTouches() {
		document.getElementById("left-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			ACTIONS['moveLeft']['requested'] = true;
		});
		document.getElementById("left-pad").addEventListener("touchend", function (e) {
			e.preventDefault();
			ACTIONS['moveLeft']['requested'] = false;
		});
		document.getElementById("right-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			ACTIONS['moveRight']['requested'] = true;
		});
		document.getElementById("right-pad").addEventListener("touchend", function (e) {
			e.preventDefault();
			ACTIONS['moveRight']['requested'] = false;
		});
		document.getElementById("jump-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			ACTIONS['jump']['requested'] = true;
		});
		document.getElementById("jump-pad").addEventListener("touchend", function (e) {
			e.preventDefault();
			ACTIONS['jump']['requested'] = false;
		});
		document.getElementById("trow-pad").addEventListener("touchstart", function (e) {
			e.preventDefault();
			ACTIONS['throw']['requested'] = true;
		});
		document.getElementById("trow-pad").addEventListener("touchend", function (e) {
			e.preventDefault();
			ACTIONS['throw']['requested'] = false;
		});
	}

	/**
	 * Adds all KeyDown and KeyUp Listener events for the user interaction with the Keyboard.
	 */
	listenForKeys() {
		document.addEventListener("keydown", this.handleKeyDown.bind(this));
		document.addEventListener("keyup", this.handleKeyUp.bind(this));
	}

	handleKeyDown(e) {
		const code = e.code;
		if (code == ACTIONS['jump']['key'])
			ACTIONS['jump']['requested'] = true;
		if (code == ACTIONS['throw']['key'])
			ACTIONS['throw']['requested'] = true;
		if (code == ACTIONS['moveLeft']['key'])
			ACTIONS['moveLeft']['requested'] = true;
		if (code == ACTIONS['moveRight']['key'])
			ACTIONS['moveRight']['requested'] = true;
	}

	handleKeyUp(e) {
		const code = e.code;
		if (code == ACTIONS['jump']['key'])
			ACTIONS['jump']['requested'] = false;
		if (code == ACTIONS['throw']['key'])
			ACTIONS['throw']['requested'] = false;
		if (code == ACTIONS['moveLeft']['key'])
			ACTIONS['moveLeft']['requested'] = false;
		if (code == ACTIONS['moveRight']['key'])
			ACTIONS['moveRight']['requested'] = false;
	}
}
