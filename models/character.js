import { GRAVITY } from "./../js/constants.js"
import { Log } from "./../js/log.js"
import { Game } from "./../js/game.js"
import { Model } from "./model.js";
import { Enemy } from "./enemy.js";
import { Item } from "./item.js";
import { World } from "./world.js";
import { ACTIONS, RIGHT_DIRECTION, LEFT_DIRECTION } from "./../js/constants.js";
import { Coin } from "./coin.js";
import { Bottle } from "./bottle.js";
import { Camera } from "../js/camera.js";

export class Character extends Model {
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
		this.bottle.tracking = false;
		this.bottle.initY = this.y;
		this.bottle.initX = this.x;
		this.bottles = 10;
		this.coins = 0;
		this.canJump = true;
		this.isImmun = false;
		this.startHit;
		this.health = 100;
	}

	/**
	 * A function of Time that Calculates the change in vertical position of players's jumping motion.
	 * @param {number} timeStamp - automatically passed, indicating the precise time requestAnimationFrame() was called.
	 */
	jump(timeStamp) {
		console.log("jumping");
		if (this.startJump === undefined || !this.jumpInProgess)// jump start
			this.startJump = timeStamp;// set timer to 0
		const elapse = (timeStamp - this.startJump) / 1000; //SECONDS
		this.y = (this.jumpVelocity * elapse) + (0.5 * GRAVITY * Math.pow(elapse, 2)) + this.groundPos;// y= v*sin(angle)*deltaTime + 1/2*accel(Constant)*t^2 
		if ((this.y == this.groundPos && elapse == 0) || (elapse > 0 && this.y < this.groundPos)) {// first animation frame or not last animation frame
			this.jumpInProgess = true;
			requestAnimationFrame(this.jump.bind(this));
		} else { // jump finnish
			this.jumpInProgess = false;
			this.y = this.groundPos; //adjust to same groundPos
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
				this.animationInterval = 100;
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
				this.animationInterval = 100;
			}
		}
	}

	update(timeStamp) {
		this.setStatus(this.status);
		super.update(timeStamp);
	}

	getDirection(){
		if(this.isMovingRight)
			return RIGHT_DIRECTION;
		else if(this.isMovingLeft)
			return LEFT_DIRECTION;
		else
			return this.direction;
	}

	handleActionsRequests(timeStamp){
		this.moveInProgress = 	ACTIONS["moveLeft"]["requested"] || ACTIONS["moveRight"]["requested"];
		this.isMovingRight 	= 	ACTIONS["moveRight"]["requested"];
		this.isMovingLeft 	= 	ACTIONS["moveLeft"]["requested"];
		this.direction 		= 	this.getDirection();

		if (ACTIONS["jump"]["requested"] && !this.jumpInProgess) {
			window.requestAnimationFrame(this.jump.bind(this)); 
		}

		if (ACTIONS["throw"]["requested"] && !this.throwInProgress) {
			this.bottle.initY = this.y;
			this.bottle.initX = !this.tracking ? this.x : this.x + (Camera.x * this.distance);
			window.requestAnimationFrame(this.throwBottle.bind(this));
		}
	}

	/**
	 * 
	 * @param {Model[]} models
	 */
	checkCollisions(models, worldRef) {
		for (let i = 0; i < models.length; i++) {
			const model = models[i];
			if (model instanceof Enemy) {
				this.checkEnemyCollision(model, worldRef);
			}
			if (model instanceof Item) {
				this.checkItemCollision(model, worldRef);
			}
		}
	}

	/**
	 * Check for Enemy Collision
	 * @param {Enemy} enemy -
	 */
	checkEnemyCollision(enemy, worldRef) {
		if (enemy.status != "dead") {
			if (World.isColliding(this, enemy)) {
				if (enemy.canHit) {
					this.isHit = true;
					if (this.startHit === undefined) {
						console.log("FIRST HIT");
						this.startHit = timeStamp;
						this.intervalHit = IMMUNITY_TIME;
						this.healt -= enemy.damage;
					}
					const elapse = Math.trunc(timeStamp - this.startHit);
					if (elapse > this.intervalHit) {
						this.intervalHit = 1000 + elapse;
						this.healt -= enemy.damage;
					}
					return;
				} else {
					enemy.status = "dead";
					this.isHit = false;
					this.startHit = timeStamp;
				}
			} else {
				this.isHit = false;
				//this.startHit = timeStamp;
			}
			enemy.canHit = this.isIntersectingX(enemy) && !this.pepe.isAbove(enemy);
		}
	}

	/**
	 * Check for Item Collision
	 * @param {Item} item -
	 */
	checkItemCollision(item, worldRef) {
		if (World.isColliding(this, item)) {
			if (item instanceof Coin)
				this.coins++;
			if (item instanceof Bottle)
				this.bottles++;
			worldRef.deleteElement(item);
		}
	}
}