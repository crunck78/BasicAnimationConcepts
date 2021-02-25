import { Item } from "./item.js"

export class Enemy extends Item{
	constructor(xPos, yPos, distance, scale, width, height, color){
		super(xPos, yPos, distance, scale, width, height, color);
	}
}
