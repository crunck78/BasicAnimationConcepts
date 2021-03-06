import { Item } from "./item.js"
import { GRAVITY } from "./../js/constants.js"
import { Log } from "./../js/log.js"
import { Game } from "./../js/game.js"
import { Model } from "./model.js";

export class Character extends Item {
	constructor(xPos, yPos, distance, scale, width, height, color, status, animationObj, bottleAnimations) {
		super(xPos, yPos, distance, scale, width, height, color, status, animationObj);
		this.startJump;
		this.startThrow;
		this.jumpInProgess = false;
		this.isHit = false;
		this.jumpVelocity = -98.1 * 6;
		this.throwInProgress = false;
		this.throwVelocity = -98.1 * 6;
		this.throwAngle = 0.52359878; //Radians -> 45 Degrees
		this.bottle = new Item(xPos, yPos, distance, scale, 50, 50, "yellow", "throwed", bottleAnimations);
		this.bottle.initY = this.y;
		this.bottles = 0;
		this.coins = 0;
		this.canJump = true;
		this.isImmun = false;
		this.startHit;
		this.healt = 100;
	}

	/**
	 * A function of Time that Calculates the change in vertical position of players's jumping motion.
	 * @param {number} timeStamp - automatically passed, indicating the precise time requestAnimationFrame() was called.
	 */
	jump(timeStamp) {
		if (this.startJump === undefined || !this.jumpInProgess)// jump start
			this.startJump = timeStamp;// set timer to 0
		const elapse = (timeStamp - this.startJump) / 1000; //SECONDS
		this.y = (this.jumpVelocity * elapse) + (0.5 * GRAVITY * Math.pow(elapse, 2)) + this.groundPos;// y= v*sin(angle)*deltaTime + 1/2*accel(Constant)*t^2 
		if ((this.y == this.groundPos && elapse == 0) || (elapse > 0 && this.y < this.groundPos)) {// first animation frame or not last animation frame
			this.jumpInProgess = true;
			requestAnimationFrame(this.jump.bind(this));
		} else { // jump finnish
			this.jumpInProgess = false;
			this.y = this.groundPos; //adjust to same altitude
		}
	}

	/**
	 * A function of Time that Calculates the change in positions of players's bottle's throw motion.
	 * @param {number} timeStamp - automatically passed, indicating the precise time requestAnimationFrame() was called.
	 */
	throwBottle(timeStamp) {
		if (this.startThrow === undefined || !this.throwInProgress)
			this.startThrow = timeStamp; //throw start animation
		const elapse = (timeStamp - this.startThrow) / 1000; //SECONDS
		this.bottle.x = (this.bottle.initX + (-this.throwVelocity * this.bottle.direction * Math.cos(this.throwAngle) * elapse)); // x = xinit + (vinit * cos(angle)*changeInTime)
		this.bottle.y = (this.throwVelocity * Math.sin(this.throwAngle) * elapse) + (0.5 * GRAVITY * Math.pow(elapse, 2)) + this.bottle.initY; // y= v*sin(angle)*deltaTime + 1/2*accel(Constant)*t^2 + yinit
		this.bottle.update(timeStamp);
		this.bottle.draw();
		if ((this.bottle.y == this.bottle.initY && elapse == 0) || (elapse > 0 && this.bottle.y < this.bottle.groundPos)) { // if first animation frame, or not last aniamtion frame
			this.throwInProgress = true;
			requestAnimationFrame(this.throwBottle.bind(this));
		} else {
			this.throwInProgress = false;
			this.bottle.y = this.bottle.groundPos; // throw hit the ground , adjust to same altitude
		}
	}

	/**
	 * Sets the Character status given by the order of importance
	 * @param {string} currentStatus - actual status value of Character
	 */
	setStatus(currentStatus) {
		
		if (this.isHit) {
			if (currentStatus != "hit") {
				this.animationIndex = 0;
				this.status = "hit";
				this.animationInterval = 300;
			}
		} else if (this.jumpInProgess) {
			if (currentStatus != "jump") {
				this.animationIndex = 0;
				this.status = "jump";
				this.animationInterval = 300;
			}

		} else if (this.moveInProgress) {
			if (currentStatus != "walk") {
				this.animationIndex = 0;
				this.status = "walk";
				this.animationInterval = 100;
			}

		} else {
			if (currentStatus != "idle") {
				this.animationIndex = 0;
				this.status = "idle";
				this.animationInterval = 300;
			}
		}
	}

	update(timeStamp) {
		// this.isMovingRight = Game.requestRightMove && !this.isMovingRight;
		// this.isMovingLeft = Game.requestLeftMove && !this.isMovingLeft;
		// this.moveInProgress = this.isMovingRight || this.isMovingLeft;
		//TODO SET DIRECTION
		super.update(timeStamp);
	}

	/**
	 * 
	 * @param {Model[]} models
	 */
	checkForCollisions( models ){
		for(let i = 0; i < models.length; i++){
			const model = models[i];
			if( model instanceof Enemy){
				this.checkEnemyCollision(model);
			}
			if( model instanceof item){
				this.checkItemCollision(model);
			}
		}
	}

	/**
	 * Check for Enemy Collision
	 * @param {Enemy} enemy -
	 */
	checkEnemyCollision(enemy){
		
	}

	/**
	 * Check for Item Collision
	 * @param {Item} item -
	 */
	checkItemCollision(item){

	}
}