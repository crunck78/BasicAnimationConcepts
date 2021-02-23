import { Model } from "./model";

export class Draw {
	constructor() {
		if (new.target === Draw) {
			throw new TypeError("Cannot construct Draw instances directly");
		}
	}

	draw() {
		throw new TypeError("Methode has no implementation!");
	}

	static drawElements(elements) {
		elements.forEach(element => {
			element.draw();
		});
	}

	/**
 	* Draws a rectangle using the properties of passed argument Object that must contain x, y, width and height fields declared and initialized
 	* @param { Model } elm - element to draw a rectangle using its fields values {x: number, y: number , width: number, height: number}
 	*/
	static draw(elm) {
		
		ctx.beginPath();
		ctx.rect(elm.x, elm.y, elm.width, elm.height);
		ctx.stroke();
	}
}
