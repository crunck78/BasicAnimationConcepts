import { Draw } from "./../js/draw.js"
import { Character } from "./character.js"
import { Scene } from "./scene.js"
import { Enemy } from "./enemy.js"
import { Item } from "./item.js"
import { Background } from "./background.js"

export class World extends Draw{
	constructor(){
		super();
		this.sky = new Background(0, 0, 1, 1, Draw.cnv.width, Draw.cnv.height, "white", "img/sky.png")
		this.pepe = new Character(10, Draw.GROUND_POS - 100, 1, 1, 150, 100, "blue");
		this.scenes = [];
		for (let i = 0; i < 6; i++){
			this.scenes.push(new Scene(i));
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

	/**
	 * Issues all Models and Scenes draw calls to draw all Models instances on canvas.
	 */
	draw(){
		//Draw.clearCanvas();
		this.sky.draw();
		World.drawGroundLine();
		Draw.drawElements(this.scenes);
		Draw.drawElements(this.items);
		Draw.drawElements(this.enemies);
		this.pepe.draw();
	}

	/**
	 * 
	 */
	update(){

	}

	/**
	 * Moves all choosen Models and Scenes instances to the left by the characters movement speed, creating the illusion of character right movement.
	 */
	 moveLeft(){
		 Draw.moveElementsLeft(this.scenes, this.pepe.movementSpeed);
		 Draw.moveElementsLeft(this.items, this.pepe.movementSpeed);
		 Draw.moveElementsLeft(this.enemies, this.pepe.movementSpeed);
	 }
	 
	 /**
	 * Moves all choosen Models and Scenes instances to the right by the characters movement speed,, creating the illusion of character left movement.
	 */
	 moveRight(){
		 Draw.moveElementsRight(this.scenes, this.pepe.movementSpeed);
		 Draw.moveElementsRight(this.items, this.pepe.movementSpeed);
		 Draw.moveElementsRight(this.enemies, this.pepe.movementSpeed);
	 }

	/**
	 * Returns true or false if the arguments Models in game collide.
	 * @param {Model} obj1 - 
	 * @param {Model} obj2 -
	 * @returns {boolean} true || false
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
