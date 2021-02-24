import { Item } from "./item.js"
import { GRAVITY } from "/../js/constants.js"

export class Character extends Item{
	constructor(xPos, yPos, distance, scale, width, height){
		super(xPos, yPos, distance, scale, width, height);
		this.startJump;
		this.startThrow;
		this.jumpInProgess = false;
		this.jumpVelocity = -98.1 * 10;
		this.throwInProgress = false;
		this.throwVelocity = -98.1 * 10;
		this.throwAngle = 0.78539816; //Radians -> 45 Degrees
		this.bottle = new Item();
		this.bottle.initY = this.y;
		this.bottles = [];
		this.coins = [];
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
		if ((this.y == this.groundPos && elapse == 0) || (elapse > 0 && this.y < this.groundPos)){// first animation frame or not last animation frame
			this.jumpInProgess = true;
			requestAnimationFrame(this.jump.bind(this));
		}else{ // jump finnish
			this.jumpInProgess = false;
			this.y = this.groundPos; //adjust to same altitude
		}
	}

	/**
	 * A function of Time that Calculates the change in positions of players's bottle's throw motion.
	 * @param {number} timeStamp - automatically passed, indicating the precise time requestAnimationFrame() was called.
	 */
	throwBottle(timeStamp){
		if (this.startThrow === undefined || !this.throwInProgress)
			this.startThrow = timeStamp; //throw start animation
		const elapse = (timeStamp - this.startThrow) / 1000; //SECONDS
		this.bottle.x = this.x + (-this.throwVelocity * Math.cos(this.throwAngle) * elapse); // x = xinit + (vinit * cos(angle)*changeInTime)
		this.bottle.y = (this.throwVelocity * Math.sin(this.throwAngle) * elapse) + (0.5 * GRAVITY * Math.pow(elapse, 2)) + this.bottle.initY; // y= v*sin(angle)*deltaTime + 1/2*accel(Constant)*t^2 + yinit
		if ((this.bottle.y == this.bottle.initY && elapse == 0) || (elapse > 0 && this.bottle.y < this.bottle.groundPos)){ // if first animation frame, or not last aniamtion frame
			this.throwInProgress = true;
			requestAnimationFrame(this.throwBottle.bind(this));
		}else{
			this.throwInProgress = false;
			this.bottle.y = this.bottle.groundPos; // throw hit the ground , adjust to same altitude
		}
	}
}
