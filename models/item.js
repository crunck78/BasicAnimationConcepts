import { Model } from "./model.js"
import { LEFT, RIGHT } from "./../js/constants.js"
import { Draw } from "./../js/draw.js"

export class Item extends Model{
	constructor(xPos, yPos, distance, scale, width, height, color){
		super(xPos, yPos, distance, scale, width, height, color);
		this.groundPos = Draw.GROUND_POS - height;
		this.isMovingLeft = false;
		this.isMovingRight = true;
		this.movementSpeed = 5;
		this.direction = RIGHT;
		this.requestMoveRight = 0;
		this.requestMoveLeft = 0;
	}
}
