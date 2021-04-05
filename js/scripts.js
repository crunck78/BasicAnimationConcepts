import { Draw } from "./draw.js"
import { Game } from "./game.js"
import { Log } from "./log.js"
import { createAllAnimations } from "./animations.js"

window.addEventListener("load", async ()=>{
	let allAnimations = await createAllAnimations();
	document.getElementById("load").classList.add("d-none");
	//document.getElementById("touchpad").classList.remove("d-none");
	Draw.init();
	const newGame = new Game(allAnimations);
	requestAnimationFrame(newGame.draw.bind(newGame));
	requestAnimationFrame(newGame.checkForCollisions.bind(newGame));
	requestAnimationFrame(newGame.update.bind(newGame));
	//newGame.listenForTouches(newGame.level.pepe, newGame);
	newGame.listenForKeys(newGame.level.pepe, newGame);
});