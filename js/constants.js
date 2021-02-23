/**
 * Reference to a div element used to log infos out.
 */
const LOG = document.getElementById("log");
/**
 * Reference to the canvas element.
 */
const CNV = document.getElementById("cnv");
CNV.width = window.innerWidth - window.innerWidth * 0.1;
CNV.height = window.innerHeight - window.innerHeight * 0.1;
CNV.style.border = "3px solid black";

/**
 * 2d rendering context to draw in the canvas.
 * @constant {CanvasRenderingContext2D}
 */
const CTX = cnv.getContext("2d");

/**
 * The y coordinate representing the ground level of the game.
 */
const GROUND_POS = cnv.height - 150;
/**
 * Index to access the right side character animations array.  
 */
const RIGHT = 0;
/**
 * Index to access the left side character animations array.  
 */
const LEFT = 1;
/**
 * Value that affects the jumping and throwing motions.
 * @var {{number}}
 */
const GRAVITY = 9.81 * 100;

export { LOG, CNV, CTX, GROUND_POS, RIGHT, LEFT, GRAVITY };
