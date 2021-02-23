import { Draw } from "./draw.js"
import { Character } from "./character.js"
import { Scene } from "./scene.js"
import { Enemy } from "./enemy.js"
import { Item } from "./item.js"

export class World extends Draw{
	constructor(){
		super();
		this.pepe = new Character();
		this.scenes = [];
		for(let i = 0; i < 5; i++){
			this.scenes.push(new Scene());
		}
		this.enemies = [];
		for(let i = 0; i < 5; i++){
			this.enemies.push(new Enemy());
		}
		this.items = [];
		for(let i = 0; i < 5; i++){
			this.items.push(new Item());
		}
	}
	
	draw(){
		Draw.drawElements(this.scenes);
		Draw.drawElements(this.items);
		Draw.drawElements(this.enemies);
		this.pepe.draw();
	}
}
