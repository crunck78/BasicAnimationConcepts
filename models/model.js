import { Draw } from "./../js/draw.js"

export class Model extends Draw{
   constructor(xPos, yPos, distance, scale, width, height) {
	   super();
       this.x = xPos;
       this.y = yPos;
	   this.width = width;
       this.heigth = height;
       this.distance = distance;
       this.scale = scale;
	   this.currentImg;
   }
	
	draw(){
		Draw.drawModelRect(this);
	}
}
