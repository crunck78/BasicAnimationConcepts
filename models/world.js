import { Draw } from "./../js/draw.js"
import { Character } from "./character.js"
import { Scene } from "./scene.js"
import { Enemy } from "./enemy.js"
import { Item } from "./item.js"

export class World extends Draw{
	constructor(){
		super();
		this.pepe = new Character(10, Draw.GROUND_POS - 100, 1, 1, 150, 100, "blue");
		this.scenes = [];
		for (let i = 0; i < 5; i++){
			this.scenes.push(new Scene());
		}
		this.enemies = [];
		for (let i = 0; i < 5; i++){
			this.enemies.push(new Enemy((i+1)*100, Draw.GROUND_POS - 60, 1, 1, 60, 60, "red"));
		}
		this.items = [];
		for (let i = 0; i < 5; i++){
			this.items.push(new Item((i+1)*150, Draw.GROUND_POS - 50, 1, 1, 50, 50, "green"));
		}
	}

	draw(){
		Draw.clearCanvas();
		World.drawGroundLine();
		Draw.drawElements(this.scenes);
		Draw.drawElements(this.items);
		Draw.drawElements(this.enemies);
		this.pepe.draw();
	}

	/**
	 * Returns true or false if the arguments objects in game collide
	 * @param {Model} obj1 - 
	 * @param {Model} obj2 -
	 * @returns {boolean} - 
	 */
	isColliding(obj1, obj2) {
		return ((obj2.x - obj1.x + 10) < (obj1.width - 40) && (obj1.x - obj2.x + 40) < (obj2.width - 10)) && ((obj2.y - obj1.y + 10) < obj1.height);
	}
	
	
	/**
	 * Draws a vertical visual reference Line as width as the canvas and at y = @GROUND_POS
	 */
	static drawGroundLine() {
		Draw.ctx.beginPath();
		Draw.ctx.moveTo(0, World.GROUND_POS);
		Draw.ctx.lineTo(Draw.cnv.width, World.GROUND_POS);
		Draw.ctx.stroke();
	}
}
