import { GROUND_POS } from "./constants.js"

export class Canvas{
    constructor(){
    }

	static cnv = document.getElementsByTagName["canvas"][0];
	static ctx;

	/**
	 * Used to clear The Canvas on repainting, should be called 1st, before any other draw calls.
	 */
	static clearCanvas() {
		Canvas.ctx.beginPath();
		Canvas.ctx.rect(0, 0, Canvas.cnv.width, Canvas.cnv.height);
		Canvas.fillStyle = "white";
		Canvas.ctx.fill();
	}

	/**
	 * Draws a rectangle using the properties of passed argument Object that must contain x, y, width and height fields declared and initialized
	 * @param {Model} elm - element to draw a rectangle using its fields values {x: number, y: number , width: number, height: number}
	 */
	static drawModelRect(elm) {
		Canvas.ctx.beginPath();
		Canvas.ctx.rect(elm.x, elm.y, elm.width, elm.height);
		Canvas.ctx.stroke();
	}

	/**
	 * Draws a vertical visual reference Line as width as the canvas and at y = @GROUND_POS
	 */
	static drawGroundLine() {
		Canvas.ctx.beginPath();
		Canvas.ctx.moveTo(0, GROUND_POS);
		Canvas.ctx.lineTo(Canvas.cnv.width, GROUND_POS);
		Canvas.ctx.stroke();
	}

	static init() {
		Canvas.cnv.width = window.innerWidth;
		Canvas.cnv.height = window.height;
		Canvas.ctx = Canvas.cnv.getContext("2d");
	}
}
