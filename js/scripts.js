const RIGHT = 0;
const LEFT = 1;
const GRAVITY = 98.1;
let cnv = document.getElementById("cnv");
cnv.width = window.innerWidth;
cnv.height = window.innerWidth * 0.75;
cnv.style.border = "3px solid black";
let ctx = cnv.getContext("2d");
const GROUND_POS = cnv.height - 150;

let log = document.getElementById("log");
let startDraw;
let startUpdate;
let startJump;
let MOVEMENT_SPEED = 20;

let player = createPlayer(20, GROUND_POS, 150, 100);
let obj = createObj(cnv.width - 200, GROUND_POS, 150, 100);

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
	
	//console.log(isColliding(player, obj));
	//console.log(player.requestJump);
	
	requestAnimationFrame(updateLoop);
}

//function updatePlayer(timeStamp){
// 	//TODO
//	let timeStampInSec = timeStamp / 1000;
//	player.y = (player.jumpVelocity * timeStampInSec) + (0.5 * GRAVITY * Math.pow(timeStampInSec, 2)) + GROUND_POS;
//	log.innerHTML = `${player.y}<br>${Math.trunc(timeStampInSec)}<br>${reqId}`;
//	if( player.y <= GROUND_POS && timeStampInSec > 0)
//		requestAnimationFrame(updatePlayer);
//}

function updatePlayer(timeStamp){
	
	if(startJump === undefined){
		//log.innerHTML += `<br>FIRST JUMP START<br>`;
		startJump = timeStamp;
	}else if(player.y <= GROUND_POS){
		//log.innerHTML = `<br>PERFORMING JUMP<br>`;
	}else{
		//log.innerHTML += `<br>PERFORMING NEXT JUMP<br>`;
		startJump = timeStamp;
	}
	const elapse = (timeStamp - startJump) / 1000;
	//log.innerHTML += `<br>${player.y}<br>${elapse}<br>${startJump}<br>`;
	player.y = (player.jumpVelocity * elapse) + (0.5 * GRAVITY * Math.pow(elapse, 2)) + GROUND_POS;
	//log.innerHTML += `<br>${player.y}<br>${elapse}<br>${startJump}<br>`;
	if(player.y <= GROUND_POS){
		//log.innerHTML += `<br>STILL IN THERE AIR<br>`;
		requestAnimationFrame(updatePlayer);
	}
	else{
		log.innerHTML = `<br>LANDED ON GROUND POS<br>`;
		//player.y = GROUND_POS;
	}
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
		isMovingRight: false,
		isJumping: false,
		direction: RIGHT,
		allowJump: false,
		jumpVelocity: -200,
		jumpRequestTime: 0
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
//listenForKeys(player);

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
	character.allowJump = character.y >= GROUND_POS ? true : false;
	if(character.allowJump){
		log.innerHTML += `<br>Allow Jump Request<br>`;
		window.requestAnimationFrame(updatePlayer);
	}else{
		log.innerHTML = `<br>Reject Jump Request<br>`;
	}
  });

  document.getElementById("trow-pad").addEventListener("touchstart", function (e) {
   	e.preventDefault();
  });
}

function listenForKeys(character) {
	document.addEventListener("keydown", function (e) {
	  const k = e.key;
	  if (e.code == "Space") {

	  }

	  if (k == "ArrowRight") {
		character.isMovingRight = true;
		character.direction = RIGHT;
	  }
	  if (k == "ArrowLeft") {
		character.isMovingLeft = true;
		character.direction = LEFT;
	  }

	  if (k == "d") {
		
	  }
	});

	document.addEventListener("keyup", function (e) {
	  const k = e.key;
	  if (k == "ArrowRight") {
		character.isMovingRight = false;
	  }
	  if (k == "ArrowLeft") {
		character.isMovingLeft = false;
	  }
	});
  }
