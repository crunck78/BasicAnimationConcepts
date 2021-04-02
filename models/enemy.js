import { Item } from "./item.js"

export class Enemy extends Item{
	constructor(xPos, yPos, distance, scale, width, height, color, status, animationObj){
		super(xPos, yPos, distance, scale, width, height, color, status, animationObj);
		this.movementSpeed = Math.random() * 2;
	}
}
