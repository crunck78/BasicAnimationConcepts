import { Draw } from "draw.js"
import { World } from "world.js"

export class Game extends Draw{
	constructor(){
		this.level = new World();
	}
	
	draw(){
		level.draw();
		requestAnimationFrame(this.draw);
	};
}
