import { Item } from "./item.js"

export class Enemy extends Item{
	constructor(xPos, yPos, distance, scale, width, height){
		super(xPos, yPos, distance, scale, width, height);
	}
}
