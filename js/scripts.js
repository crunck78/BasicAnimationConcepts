import { Game } from "/../models/game.js"

/**
 * Reference to a div element used to log infos out.
 */
const log = document.getElementById("log");
/**
 * Reference to the canvas element.
 */
const cnv = document.getElementById("cnv");
cnv.width = window.innerWidth - window.innerWidth * 0.1;
cnv.height = window.innerHeight - window.innerHeight * 0.1;
cnv.style.border = "3px solid black";

/**
 * 2d rendering context to draw in the canvas.
 * @constant {CanvasRenderingContext2D}
 */
const ctx = cnv.getContext("2d");

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
/**
 * Holds the starting timeStamp of every jump animation.
 * @var {{number}}
 */
let startJump;
/**
 * Holds the starting timeStamp of every throw animation.
 * @var {{number}}
 */
let startThrow;
/**
 * Holds the starting timeStamp of the drawLoop function.
 * @var {{number}}
 */
let startDraw;

let obj = createObj(cnv.width - 200, GROUND_POS - 100, 150, 100);
let player = createPlayer(20, GROUND_POS - 100, 150, 100);
player.bottle.initY = player.y;

/**
 * Draws every frame of the game, all draw calles should be issue inside it.
 */
function drawLoop(timeStamp) {
	if(startDraw === undefined){
		startDraw = timeStamp;
	}
	clearCanvas();
	drawGroundLine();
	draw(obj);
	draw(player);
	if(player.throwInProgress){
		draw(player.bottle);
//		let bottle = new Image();
//		const elapseBottleChange = Math.trunc((timeStamp - startDraw) / 60);
//		bottle.src = ` C:/Users/scoo_/Documents/dev/GitHub/eu/el-pollo-loco-v3/img/bottle-throw/bottleThrow_${elapseBottleChange % 4}.png`;
//		if(bottle.complete)
//			ctx.drawImage(bottle, player.bottle.x, player.bottle.y, bottle.width * 0.2, bottle.height * 0.2);
	}
	requestAnimationFrame(drawLoop);
}

/**
 * Temporary function used for testing game functionalities like movements, collisions, etc
 */
function updateLoop() {
	obj.x -= obj.movementSpeed * obj.distance;
	if(isColliding(player, obj)){
		log.innerHTML = "Collision!";
	}else{
		log.innerHTML = "";
	}
	requestAnimationFrame(updateLoop);
}

/**
 * Invoked if Player presses down the left arrow. Cancelled if Player stops pressing
 */
function moveLeft(){
	obj.x += player.movementSpeed * obj.distance;
	player.requestMoveLeft = requestAnimationFrame(moveLeft);
}

/**
 * Invoked if Player presses down the right arrow. Cancelled if Player stops pressing
 */
function moveRight(){
	obj.x -= player.movementSpeed * obj.distance;
	player.requestMoveRight = requestAnimationFrame(moveRight);
}

/**
 * A function of Time that Calculates the change in vertical position of players's jumping motion.
 * @param {number} timeStamp - automatically passed, indicating the precise time requestAnimationFrame() was called.
 */
function jump(timeStamp) {
	if (startJump === undefined || !player.jumpInProgess)// jump start
		startJump = timeStamp;// set timer to 0
	const elapse = (timeStamp - startJump) / 1000; //SECONDS
	player.y = (player.jumpVelocity * elapse) + (0.5 * GRAVITY * Math.pow(elapse, 2)) + player.groundPos;// y= v*sin(angle)*deltaTime + 1/2*accel(Constant)*t^2 
	if ((player.y == player.groundPos && elapse == 0) || (elapse > 0 && player.y < player.groundPos)) {// first animation frame or not last animation frame
		player.jumpInProgess = true;
		requestAnimationFrame(jump);
	} else { // jump finnish
		player.jumpInProgess = false;
		player.y = player.groundPos; //adjust to same altitude
	}
}

/**
 * A function of Time that Calculates the change in positions of players's bottle's throw motion.
 * @param {number} timeStamp - automatically passed, indicating the precise time requestAnimationFrame() was called.
 */
function throwBottle(timeStamp){
	if (startThrow === undefined || !player.throwInProgress)
		startThrow = timeStamp; //throw start animation
	const elapse = (timeStamp - startThrow) / 1000; //SECONDS
	player.bottle.x = player.x + (-player.throwVelocity * Math.cos(player.throwAngle) * elapse); // x = xinit + (vinit * cos(angle)*changeInTime)
	player.bottle.y = (player.throwVelocity * Math.sin(player.throwAngle) * elapse) + (0.5 * GRAVITY * Math.pow(elapse, 2)) + player.bottle.initY; // y= v*sin(angle)*deltaTime + 1/2*accel(Constant)*t^2 + yinit
	if ((player.bottle.y == player.bottle.initY && elapse == 0) || (elapse > 0 && player.bottle.y < player.bottle.groundPos)) { // if first animation frame, or not last aniamtion frame
		player.throwInProgress = true;
		requestAnimationFrame(throwBottle);
	} else {
		player.throwInProgress = false;
		player.bottle.y = player.bottle.groundPos; // throw hit the ground , adjust to same altitude
	}
}

/**
 * Returns an object representing an item. Instance can be used as an argument to draw(elm) calls to visualize the item as a rectangle  
 * @param {number} xPos - cooordinate x on canvas
 * @param {number} yPos - coordinate y on canvas
 * @param {number} width - width of the instance
 * @param {number} height - height of the instance
 * @returns {{}} - object structure of a object in game
 */
function createObj(xPos, yPos, width, height) {
	return {
		x: xPos,
		y: yPos,
		groundPos: GROUND_POS - height,
		width: width,
		height: height,
		movementSpeed: 1,
		distance: 1
	};
}

/**
 * Returns an object representing the player. Instance can be used as an argument to draw(elm) calls to visualize player as a rectangle  
 * @param {number} xPos - cooordinate x on canvas
 * @param {number} yPos - coordinate y on canvas
 * @param {number} width - width of the instance
 * @param {number} height - height of the instance
 * @returns {{}} - object structure of a player
 */
function createPlayer(xPos, yPos, width, height) {
	return {
		x: xPos,
		y: yPos,
		groundPos: GROUND_POS - height,
		width: width,
		height: height,
		isMovingLeft: false,
		isMovingRight: false,
		direction: RIGHT,
		movementSpeed: 5,
		requestMoveRight: 0,
		requestMoveLeft: 0,
		jumpVelocity: -98.1 * 10,
		throwVelocity: -98.1 * 10,
		throwAngle: 0.78539816, //Radians -> 45 Degrees
		jumpInProgess: false,
		throwInProgress: false,
		bottle: createObj(xPos, yPos, 50, 50)
		// throwTime: (2 * this.jumpVelocity * Math.sin(this.throwVelocity)) / GRAVITY,
		// jumpTime: (2 * this.jumpVelocity) / GRAVITY
	};
}

/**
 * Used to clear The Canvas on repainting, should be called 1st, before any other draw calls.
 */
function clearCanvas() {
	ctx.beginPath();
	ctx.rect(0, 0, cnv.width, cnv.height);
	ctx.fillStyle = "white";
	ctx.fill();
}

/**
 * Draws a rectangle using the properties of passed argument Object that must contain x, y, width and height fields declared and initialized
 * @param {Object} elm - element to draw a rectangle using its fields values {x: number, y: number , width: number, height: number}
 */
function draw(elm) {
	ctx.beginPath();
	ctx.rect(elm.x, elm.y, elm.width, elm.height);
	ctx.stroke();
}

/**
 * Draws a vertical visual reference Line as width as the canvas and at y = @GROUND_POS
 */
function drawGroundLine() {
	ctx.beginPath();
	ctx.moveTo(0, GROUND_POS);
	ctx.lineTo(cnv.width, GROUND_POS);
	ctx.stroke();
}

/**
 * Returns true or false if the arguments objects in game collide
 * @param {{}} obj1 - 
 * @param {{}} obj2 -
 * @returns {boolean} - 
 */
function isColliding(obj1, obj2) {
	return ((obj2.x - obj1.x + 10) < (obj1.width - 40) && (obj1.x - obj2.x + 40) < (obj2.width - 10)) && ((obj2.y - obj1.y + 10) < obj1.height);
}

window.addEventListener("load", ()=>{
	document.getElementById("load").classList.add("d-none");
	cnv.classList.remove("d-none");
	//alert("works");
//	drawLoop();
//	updateLoop();
//	listenForTouches(player);
//	listenForKeys(player);
	const newGame = new Game();
	newGame.draw();
	Game.listenForTouches();
	Game.listenForKeys();
});