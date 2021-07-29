import { LEFT_DIRECTION, RIGHT_DIRECTION } from "../js/constants.js";
import { Item } from "./item.js"
import { Model } from "./model.js";

export class Enemy extends Model{
	constructor(xPos, yPos, distance, scale, width, height, color, status, animationObj){
		super(xPos, yPos, distance, scale, width, height, color, status, animationObj);
		this.movementSpeed = Math.random() * 2;
		this.canHit = true;
		this.damage = 20;
	}

	update(timeStamp){
		// if(this.direction == RIGHT_DIRECTION){
		// 	this.moveRight();
		// }

		// if(this.direction == LEFT_DIRECTION){
		// 	this.moveLeft();
		// }
		super.update(timeStamp);
	}

	setStatus(currentStatus){
		
	}
}
