
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

