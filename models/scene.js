import { Draw } from "draw.js"
import { Background } from "background.js"

export class Scene extends Draw{
	constructor(){
		this.backgrounds = [];
		for(let i = 0; i < 5; i++){
			this.backgrounds.push(new Background());
		}
	}
	
	draw(){
		Draw.drawElements(this.backgrounds);
	}
}
