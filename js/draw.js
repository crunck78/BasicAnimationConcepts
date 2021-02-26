export class Draw {
	constructor() {
		if (new.target === Draw) {
			throw new TypeError("Cannot construct Draw instances directly");
		}
	}

	draw() {
		throw new TypeError("Methode has no implementation!");
	}
	
	moveLeft() {
		throw new TypeError("Methode has no implementation!");
	}
	
	moveRight() {
		throw new TypeError("Methode has no implementation!");
	}
	
	static cnv;
	static ctx;
	static GROUND_POS;

	static drawElements(elements) {
		elements.forEach(element => {
			element.draw();
		});
	}
	
	static moveElementsRight(elements, movementSpeed) {
		elements.forEach(element => {
			element.x -= movementSpeed * element.distance;
		});
	}
	
	static moveElementsLeft(elements, movementSpeed) {
		elements.forEach(element => {
			element.x += movementSpeed * element.distance;
		});
	}
	
	/**
	 * Used to clear The Canvas on repainting, should be called 1st, before any other draw calls.
	 */
	static clearCanvas() {
		Draw.ctx.clearRect(0, 0, Draw.cnv.width, Draw.cnv.height);
	}

	/**
	 * Draws a rectangle using the properties of passed argument Object that must contain x, y, width and height fields declared and initialized
	 * @param {Model} elm - element to draw a rectangle using its fields values {x: number, y: number , width: number, height: number}
	 */
	static drawModelRect(elm) {
		Draw.ctx.beginPath();
		Draw.ctx.rect(elm.x, elm.y, elm.width, elm.height);
		Draw.ctx.fillStyle = `${elm.color}`;
		Draw.ctx.fill();
		Draw.ctx.stroke();
	}

	static init() {
		if(!Draw.cnv){
			Draw.cnv = document.getElementsByTagName("canvas")[0];
			Draw.cnv.style.border = `2px solid black`;
			Draw.cnv.classList.remove("d-none");
			Draw.cnv.width = window.innerWidth;
			Draw.cnv.height = window.innerHeight;
			Draw.ctx = Draw.cnv.getContext("2d");
			Draw.GROUND_POS = Draw.cnv.height - 150;
		}
	}
}
