import { Draw } from "./../js/draw.js"
import { Background } from "./background.js"

export class Scene extends Draw{
	constructor(j){
		super();
		this.backgrounds = [];
		for(let i = 0; i < 3; i++){
			this.backgrounds.push(new Background(j * Draw.cnv?.width, 0, 1, 1, Draw.cnv?.width, Draw.cnv?.height, '#8A2BE2',`img/background${i}/bg${j}.png`));
		}
	}
	
	draw(){
		Draw.drawElements(this.backgrounds);
	}

	moveLeft(movementSpeed){
		Draw.moveElementsLeft(this.backgrounds, movementSpeed);
	}
	
	moveRight(movementSpeed){
		Draw.moveElementsRight(this.backgrounds, movementSpeed);
	}
}
