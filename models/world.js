import { Draw } from "./../js/draw.js"
import { Character } from "./character.js"
import { Scene } from "./scene.js"
import { Enemy } from "./enemy.js"
import { Item } from "./item.js"
import { Background } from "./background.js"
import { Model } from "./model.js"
import { Bottle } from "./bottle.js"
import { Coin } from "./coin.js"
import { ENEMY_LENGTH, IMMUNITY_TIME, ITEM_LENGTH, SCENE_LENGTH, LEFT_DIRECTION, RIGHT_DIRECTION, LEFT_SIDE, RIGHT_SIDE, ABOVE_SIDE, BELOW_SIDE, DEBUG_ON, LOG, ACTIONS } from "../js/constants.js"
import { Camera } from "../js/camera.js"

export class World extends Draw {
	constructor(allAnimations) {
		super();
		this.worldLeftEdge = new Model(10, 0, 1, 1, 1, Draw.cnv.height);
		this.worldRightEdge = new Model(Draw.cnv.width * 2, 0, 1, 1, 1, Draw.cnv.height);
		this.worldCenter = new Model(Draw.cnv.width / 2, 0, 1, 1, 1, Draw.cnv.height);
		this.sky = new Background(0, 0, 1, 1, Draw.cnv.width, Draw.cnv.height, "white", "img/sky.png");
		this.character = new Character(10, Draw.GROUND_POS - (allAnimations.pepeAnimations["idle"][0].height * 0.2), 1, 1, allAnimations.pepeAnimations["idle"][0].width * 0.2, allAnimations.pepeAnimations["idle"][0].height * 0.2, "blue", "walk", allAnimations.pepeAnimations, allAnimations.bottleAnimations);
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
	draw(timeStamp) {
		Draw.ctx.save();

		this.sky.draw();
		Draw.drawElements(this.scenes);
		Draw.drawElements(this.items);
		Draw.drawElements(this.enemies);
		this.worldLeftEdge.draw();
		this.worldRightEdge.draw();
		this.worldCenter.draw();
		this.character.draw();
		World.drawGroundLine();
		
		Draw.ctx.restore();
	}

	/**
	 * Update World
	 * @param {number} timeStamp -
	 */
	update(timeStamp) {
		this.character.update(timeStamp);
		this.enemies.forEach(enemy => {
			enemy.update(timeStamp);
		});
	}

	checkCollisions(timeStamp) {
		this.character.checkCollisions(this.enemies, this);
		this.character.checkCollisions(this.items, this);
	}


	setCameraTrack() {
		if(this.character.x * this.character.direction < Draw.cnv.width / 2)
			this.character.tracking = true;
	}

	/**
	 * Returns true or false if the arguments Models in game collide.
	 * @param {Model} obj1 - 
	 * @param {Model} obj2 -
	 * @returns {boolean} true || false
	 */
	static isColliding(obj1, obj2) {

		// let translateOffsetX1 = !obj1.tracking ? obj1.x : obj1.x + (Camera.x * obj1.distance);
		// let translateOffsetX2 = !obj2.tracking ? obj2.x : obj2.x + (Camera.x * obj2.distance);
		// let translateOffsetY1 = !obj1.tracking ? obj1.y : obj1.y + (Camera.y * obj1.distance);
		// let translateOffsetY2 = !obj2.tracking ? obj2.y : obj2.y + (Camera.y * obj2.distance);

		let translateOffsetX1 = obj1.x;//!obj1.tracking ? obj1.x : obj1.x + (Camera.x * obj1.distance);
		let translateOffsetX2 = obj2.x;//!obj2.tracking ? obj2.x : obj2.x + (Camera.x * obj2.distance);
		let translateOffsetY1 = obj1.y;//!obj1.tracking ? obj1.y : obj1.y + (Camera.y * obj1.distance);
		let translateOffsetY2 = obj2.y;//!obj2.tracking ? obj2.y : obj2.y + (Camera.y * obj2.distance);

		return ((translateOffsetX1 + translateOffsetX2 - obj2.collisionOffset.x[RIGHT_SIDE])
			< (obj1.width - obj1.collisionOffset.x[LEFT_SIDE])
			&& (translateOffsetX1 - translateOffsetX2 + obj1.collisionOffset.x[LEFT_SIDE])
			< (obj2.width - obj2.collisionOffset.x[RIGHT_SIDE]))
			&& ((translateOffsetY2 - translateOffsetY1 + obj2.collisionOffset.y[ABOVE_SIDE])
				< (obj1.height - obj1.collisionOffset.y[BELOW_SIDE]))
			&& ((translateOffsetY1 - translateOffsetY2 + obj1.collisionOffset.y[BELOW_SIDE])
				< (obj2.height - obj1.collisionOffset.y[ABOVE_SIDE]));
	}

	deleteElement(elm) {
		if (elm instanceof Enemy)
			this.enemies.splice(this.enemies.indexOf(elm), 1);
		if (elm instanceof Item)
			this.items.splice(this.items.indexOf(elm), 1);
	}

	handleActionsRequests(timeStamp) {
		this.character.handleActionsRequests(timeStamp);

		// let translateOffsetXLeft = this.worldLeftEdge.focused ? this.worldLeftEdge.x : this.worldLeftEdge.x + (Camera.x * this.worldLeftEdge.distance);
		// let translateOffsetXRight = this.worldRightEdge.focused ? this.worldRightEdge.x : this.worldRightEdge.x + (Camera.x * this.worldRightEdge.distance);

		// if (ACTIONS['moveLeft']['requested']) {
		// 	// if (Camera.x <= 0 - 5 || this.character.x >= 0 - 5){
		// 	// 	if(this.character.x >= 0 - 5)
		// 	// 		this.character.x -= 5;
		// 	// 	else
		// 	// 		Camera.x += 5;
		// 	// }
				
		// }
		// if (ACTIONS['moveRight']['requested']) {
		// 	if(translateOffsetXRight >= Draw.cnv.width + 5){
		// 		if(!World.isColliding(this.pepe, this.worldCenter))
		// 			this.character.x += 5;
		// 		else	
		// 			Camera.x -= 5;
					
		// 	}
		// }


		// if (translateOffsetXLeft <= 0) {
		// 	if (!World.isColliding(this.pepe, this.worldLeftEdge)) {
		// 		//this.focuseWorld();
		// 	}
		// } else if (translateOffsetXRight <= Draw.cnv.width) {
		// 	if (!World.isColliding(this.pepe, this.worldCenter)) {
		// 		//this.focuseWorld();
		// 	} else {
		// 		//this.focuseChar();
		// 	}
		// } else {
		// 	//this.focuseChar();
		// }

		// if (!World.isColliding(this.pepe, this.worldRightEdge)) {
		// 	if (!World.isColliding(this.pepe, this.worldCenter)) {
		// 		//this.focuseWorld();
		// 	} else {
		// 		if (translateOffsetXRight >= Draw.cnv.width) {
		// 			//this.focuseChar();
		// 		}

		// 		else {
		// 			if (!World.isColliding(this.pepe, this.worldRightEdge)) {
		// 				//this.focuseWorld();
		// 			}

		// 		}
		// 	}
		// }
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