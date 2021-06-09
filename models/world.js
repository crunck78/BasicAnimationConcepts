import { Draw } from "./../js/draw.js"
import { Character } from "./character.js"
import { Scene } from "./scene.js"
import { Enemy } from "./enemy.js"
import { Item } from "./item.js"
import { Background } from "./background.js"
import { Model } from "./model.js"
import { Bottle } from "./bottle.js"
import { Coin } from "./coin.js"
import { ENEMY_LENGTH, IMMUNITY_TIME, ITEM_LENGTH, SCENE_LENGTH, LEFT_DIRECTION, RIGHT_DIRECTION, LEFT_SIDE, RIGHT_SIDE, ABOVE_SIDE, BELOW_SIDE, DEBUG_ON, LOG } from "../js/constants.js"

export class World extends Draw {
	constructor(allAnimations) {
		super();
		this.worldLeftEdge = new Model(10, 0, 1, 1, 1, Draw.cnv.height, "white");
		this.worldRightEdge = new Model(Draw.cnv.width * 2, 0, 1, 1, 1, Draw.cnv.height, "white");
		this.worldCenter = new Model(Draw.cnv.width / 2, 0, 1, 1, 1, Draw.cnv.height, "white");
		this.sky = new Background(0, 0, 1, 1, Draw.cnv.width, Draw.cnv.height, "white", "img/sky.png");
		this.pepe = new Character(10, Draw.GROUND_POS - (allAnimations.pepeAnimations["idle"][0].height * 0.2), 1, 1, allAnimations.pepeAnimations["idle"][0].width * 0.2, allAnimations.pepeAnimations["idle"][0].height * 0.2, "blue", "walk", allAnimations.pepeAnimations, allAnimations.bottleAnimations);
		this.scenes = [];
		for (let i = 0; i < SCENE_LENGTH; i++) {
			this.scenes.push(new Scene(i));
		}
		this.enemies = [];
		for (let i = 0; i < ENEMY_LENGTH; i++) {
			this.enemies.push(new Enemy((i + 1) * 300, Draw.GROUND_POS - (allAnimations.chickenSmallAnimations["walk"][0].height * 0.2), 1, 1, (allAnimations.chickenSmallAnimations["walk"][0].width * 0.2), (allAnimations.chickenSmallAnimations["walk"][0].height * 0.2), "red", "walk", allAnimations.chickenSmallAnimations));
		}
		this.items = [];
		for (let i = 0; i < ITEM_LENGTH; i++) {
			this.items.push(new Bottle((i + 1) * 150, Draw.GROUND_POS - (allAnimations.bottleAnimations["buried"][0].height * 0.2), 1, 1, (allAnimations.bottleAnimations["buried"][0].width * 0.2), (allAnimations.bottleAnimations["buried"][0].height * 0.2), "green", "buried", allAnimations.bottleAnimations));
		}
		for (let i = 0; i < ITEM_LENGTH; i++) {
			this.items.push(new Coin((i + 1) * 300, Draw.GROUND_POS - (allAnimations.coinAnimations["spin"][0].height * 0.5) - 300, 1, 1, (allAnimations.coinAnimations["spin"][0].width * 0.5), (allAnimations.coinAnimations["spin"][0].height * 0.5), "gold", "spin", allAnimations.coinAnimations));
		}
	}

	/**
	 * Issues all Models and Scenes draw calls to draw all Models instances on canvas.
	 */
	draw() {
		//Draw.clearCanvas();
		this.sky.draw();
		Draw.ctx.save();
		Draw.ctx.translate(0, 0);
		World.drawGroundLine();
		Draw.drawElements(this.scenes);
		Draw.drawElements(this.items);
		Draw.drawElements(this.enemies);
		this.worldLeftEdge.draw();
		this.worldRightEdge.draw();
		Draw.ctx.restore();
		this.pepe.draw();
		World.drawGroundLine();
		this.worldCenter.draw();
	}

	/**
	 * Update World
	 * @param {number} timeStamp -
	 */
	update(timeStamp) {
		this.pepe.setStatus(this.pepe.status);
		this.pepe.update(timeStamp);
		//Draw.moveElementsRight(this.enemies);
		this.enemies.forEach(enemy => {
			enemy.update(timeStamp);
		});
	}

	/**
	 * Check for Collisions
	 * @param {number} timeStamp 
	 */
	checkForCollisions(timeStamp) {
		//TODO For Now Only Character to World Collision Checks
		this.pepe.checkForCollisions(this.enemies);
		this.pepe.checkForCollisions(this.items);
	}

	/**
	 * Moves all choosen Models and Scenes instances to the left by the characters movement speed, creating the illusion of character right movement.
	 */
	moveLeft(timeStamp) {
		Draw.moveElementsLeft(this.scenes, this.pepe.movementSpeed);
		Draw.moveElementsLeft(this.items, this.pepe.movementSpeed);
		Draw.moveElementsLeft(this.enemies, this.pepe.movementSpeed);
		this.worldLeftEdge.moveLeft(this.pepe.movementSpeed);
		this.worldRightEdge.moveLeft(this.pepe.movementSpeed);
	}

	/**
	* Moves all choosen Models and Scenes instances to the right by the characters movement speed,, creating the illusion of character left movement.
	*/
	moveRight(timeStamp) {
		Draw.moveElementsRight(this.scenes, this.pepe.movementSpeed);
		Draw.moveElementsRight(this.items, this.pepe.movementSpeed);
		Draw.moveElementsRight(this.enemies, this.pepe.movementSpeed);
		this.worldLeftEdge.moveRight(this.pepe.movementSpeed);
		this.worldRightEdge.moveRight(this.pepe.movementSpeed);
	}

	/**
	 * Returns true or false if the arguments Models in game collide.
	 * @param {Model} obj1 - 
	 * @param {Model} obj2 -
	 * @returns {boolean} true || false
	 */
	static isColliding(obj1, obj2) {
		return ((obj2.x - obj1.x + obj2.collisionOffset.x[RIGHT_SIDE]) < (obj1.width - obj1.collisionOffset.x[LEFT_SIDE]) && (obj1.x - obj2.x + obj1.collisionOffset.x[LEFT_SIDE]) < (obj2.width - obj2.collisionOffset.x[RIGHT_SIDE])) && ((obj2.y - obj1.y + obj2.collisionOffset.y[ABOVE_SIDE]) < (obj1.height - obj1.collisionOffset.y[BELOW_SIDE])) && ((obj1.y - obj2.y + obj1.collisionOffset.y[BELOW_SIDE]) < (obj2.height - obj1.collisionOffset.y[ABOVE_SIDE]));
	}

	checkPepeToItemsCollision(timeStamp) {
		this.items.forEach((item, index) => {
			if (World.isColliding(this.pepe, item)) {
				this.items.splice(index, 1);
				if (item instanceof Coin)
					this.pepe.coins++;
				if (item instanceof Bottle)
					this.pepe.bottles++;
			}
		});
	}

	checkPepeToEnemiesCollision(timeStamp) {
		for (let i = 0; i < this.enemies.length; i++) {
			const enemy = this.enemies[i];
			if (enemy.status != "dead") {
				if (World.isColliding(this.pepe, enemy)) {
					if (enemy.canHit) {
						this.pepe.isHit = true;
						if (this.pepe.startHit === undefined) {
							console.log("FIRST HIT");
							this.pepe.startHit = timeStamp;
							this.pepe.intervalHit = IMMUNITY_TIME;
							this.pepe.healt -= enemy.damage;
						}
						const elapse = Math.trunc(timeStamp - this.pepe.startHit);
						if (elapse > this.pepe.intervalHit) {
							this.pepe.intervalHit = 1000 + elapse;
							this.pepe.healt -= enemy.damage;
						}
						break;
					} else {
						enemy.status = "dead";
						this.pepe.isHit = false;
						this.pepe.startHit = timeStamp;
					}
				} else {
					this.pepe.isHit = false;
					//this.pepe.startHit = timeStamp;
				}
				enemy.canHit = this.pepe.isIntersectingX(enemy) && !this.pepe.isAbove(enemy);
			}
		};
	}

	/**
	 * Draws a vertical visual reference Line as width as the canvas and at y = @GROUND_POS
	 */
	static drawGroundLine() {
		Draw.ctx.beginPath();
		Draw.ctx.moveTo(0, Draw.GROUND_POS);
		Draw.ctx.lineTo(Draw.cnv.width, Draw.GROUND_POS);
		Draw.ctx.stroke();
	}
}