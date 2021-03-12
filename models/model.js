import { Draw } from "./../js/draw.js"

export class Model extends Draw{
   constructor(xPos, yPos, distance, scale, width, height, color) {
	   super();
       this.x = xPos;
       this.y = yPos;
	   this.width = width;
       this.height = height;
       this.distance = distance;
       this.scale = scale;
	   this.color = color;
	   this.currentImg;
   }
	
   /**
	* Draws a Model on a initialized canvas. Canvas is to be initialized using the static methode init of the Draw class
	*/
	draw(){
		if(this.currentImg && this.currentImg.complete){
			Draw.ctx.drawImage(this.currentImg, this.x, this.y, this.width, this.height);
		}
		else
			Draw.drawModelRect(this);
	}
	
	/**
	 * Moves the Model to the left by a given speen
	 * 
	 * @param {number} movementSpeed 
	 */
	moveLeft(movementSpeed){
		this.x += (movementSpeed * this.distance);
	}
	
	/**
	 * Moves the  Model to the right by a given speed
	 * 
	 * @param {number} movementSpeed 
	 */
	moveRight(movementSpeed){
		this.x -= (movementSpeed * this.distance);
	}
}
