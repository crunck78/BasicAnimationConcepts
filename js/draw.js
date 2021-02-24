export class Draw {
	constructor() {
		if (new.target === Draw) {
			throw new TypeError("Cannot construct Draw instances directly");
		}
	}

	draw() {
		throw new TypeError("Methode has no implementation!");
	}
	
	static cnv;
	static ctx;

	static drawElements(elements) {
		elements.forEach(element => {
			element.draw();
		});
	}
	
	/**
	 * Used to clear The Canvas on repainting, should be called 1st, before any other draw calls.
	 */
	static clearCanvas() {
		Draw.ctx.beginPath();
		Draw.ctx.rect(0, 0, Draw.cnv.width, Draw.cnv.height);
		Draw.fillStyle = "white";
		Draw.ctx.fill();
	}

	/**
	 * Draws a rectangle using the properties of passed argument Object that must contain x, y, width and height fields declared and initialized
	 * @param {Model} elm - element to draw a rectangle using its fields values {x: number, y: number , width: number, height: number}
	 */
	static drawModelRect(elm) {
		Draw.ctx.beginPath();
		Draw.ctx.rect(elm.x, elm.y, elm.width, elm.height);
		Draw.ctx.stroke();
	}

	static init() {
		Draw.cnv = document.getElementsByTagName["canvas"][0];
		Draw.cnv.width = window.innerWidth;
		Draw.cnv.height = window.height;
		Draw.ctx = Draw.cnv.getContext("2d");
	}
}
