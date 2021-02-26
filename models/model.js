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
		Draw.drawModelRect(this);
	}
	
	moveLeft(){
		
	}
	
	moveRight(){
		
	}
}
