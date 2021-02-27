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
	
	draw(){
		if(this.currentImg && this.currentImg.complete){
			Draw.ctx.drawImage(this.currentImg, this.x, this.y, this.width, this.height);
		}
		else
			Draw.drawModelRect(this);
	}
	
	moveLeft(movementSpeed){
		this.x += movementSpeed * this.distance;
	}
	
	moveRight(movementSpeed){
		this.x -= movementSpeed * this.distance;
	}
}
