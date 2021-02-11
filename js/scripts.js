let cnv = document.getElementById("cnv");
cnv.width = window.innerWidth;
cnv.height = window.innerWidth * 0.75;
cnv.style.border = "3px solid black";
let ctx = cnv.getContext("2d");

let log = document.getElementById("log");
let startDraw;
let startUpdate;
let MOVEMENT_SPEED = 20;

let player = createPlayer(20, cnv.height - 150, 150, 100);
let obj = createObj(cnv.width - 200, cnv.height - 150, 150, 100);

function drawLoop(timestamp){
	if (startDraw === undefined)
    	startDraw = timestamp;
  	const elapsed = timestamp - startDraw;
	
	clearCanvas();
	draw(obj);
	draw(player);
	
	requestAnimationFrame(drawLoop);
}

function updateLoop(timestamp){
	if(player.isMovingLeft){
		obj.x += MOVEMENT_SPEED * obj.distance;
	}
	
	if(player.isMovingRight){
		obj.x -= MOVEMENT_SPEED * obj.distance;
	}
	
	obj.x -= obj.movementSpeed * obj.distance;
	
	//log.innerHTML = `${isColliding(player, obj)}`;
	
	requestAnimationFrame(updateLoop);
}

function createObj(xPos, yPos, width, height){
	return{
		x: xPos,
		y: yPos,
		width: width,
		height: height,
		movementSpeed: 1,
		distance: 1
	};
}

function createPlayer(xPos, yPos, width, height){
	return{
		x: xPos,
		y: yPos,
		width: width,
		height: height,
		isMovingLeft: false,
		isMovingRight: false
	};
}

function clearCanvas(){
	ctx.beginPath();
	ctx.rect(0, 0, cnv.width, cnv.height);
	ctx.fillStyle = "white";
	ctx.fill();
}

function draw( elm ){
	ctx.beginPath();
	ctx.rect(elm.x, elm.y, elm.width, elm.height);
	ctx.stroke();
}

function isColliding( obj1, obj2){
	return ((obj2.x - obj1.x + 10) < (obj1.width - 40) && (obj1.x - obj2.x + 40) < (obj2.width - 10)) && ((obj2.y - obj1.y + 10) < obj1.height);
}

drawLoop();
updateLoop();
listenForTouches(player);

e.preventDefault();


function listenForTouches(character) {
  document.getElementById("left-pad").addEventListener("touchstart", function (e) {
	  e.preventDefault();
	  character.isMovingLeft = true;
  });

  document.getElementById("left-pad").addEventListener("touchend", function (e) {
	e.preventDefault();
    character.isMovingLeft = false;
  });

  document.getElementById("right-pad").addEventListener("touchstart", function (e) {
	  e.preventDefault();
	  character.isMovingRight = true;
  });

  document.getElementById("right-pad").addEventListener("touchend", function (e) {
	e.preventDefault();
    character.isMovingRight = false;
  });

  document.getElementById("jump-pad").addEventListener("touchstart", function (e) {
	  e.preventDefault();
      character.isJumping = true;
  });

  document.getElementById("trow-pad").addEventListener("touchstart", function (e) {
   	e.preventDefault();
  });
}
