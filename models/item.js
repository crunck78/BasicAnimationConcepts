import { Model } from "./model.js"
import { Draw } from "./../js/draw.js"

export class Item extends Model {
	constructor(xPos, yPos, distance, scale, width, height, color, status, animationObj) {
		super(xPos, yPos, distance, scale, width, height, color, status, animationObj);
	}
}