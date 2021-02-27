import { Model } from "./model.js"

export class Background extends Model{
	constructor(xPos, yPos, distance, scale, width, height, color, imgSrc){
		super(xPos, yPos, distance, scale, width, height, color);
		this.currentImg =  new Image();
		this.currentImg.src = imgSrc;
		//console.log(this.img);
	}
}
