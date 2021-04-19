import { Model } from "./model.js"
import { Draw } from "./../js/draw.js"

export class Item extends Model {
	constructor(xPos, yPos, distance, scale, width, height, color, status, animationObj) {
		super(xPos, yPos, distance, scale, width, height, color);
		this.status = status;
		this.groundPos = Draw.GROUND_POS - height;
		this.isMovingLeft = false;
		this.isMovingRight = true;
		
		this.requestMoveRight = 0;
		this.requestMoveLeft = 0;
		this.animations = animationObj? animationObj : {};
		this.currentImg = animationObj? animationObj[status][0] : new Image();
		this.startMove;
		this.startHit;
		this.moveInProgress = false;
		this.collisionInProgress = false;
		this.animationIndex = 0;
		this.animationInterval = 300;
	}

	/**
	 * 
	 * @param {*} timeStamp 
	 */
	update(timeStamp) {
		if (this.startUpdate === undefined){// update start
			this.startUpdate = timeStamp;// set timer to 0
			this.intervalCounter = this.animationInterval;
		}
		const elapse = Math.trunc(timeStamp - this.startUpdate);

		this.currentImg = this.animations[this.status][this.animationIndex % this.animations[this.status].length];

		if(elapse > this.intervalCounter){
			this.intervalCounter = this.animationInterval + elapse;
			this.animationIndex++;
		}
	}
}