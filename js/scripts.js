import { Draw } from "./draw.js"
import { Game } from "./game.js"
import { Log } from "./log.js"

window.addEventListener("load", ()=>{
	document.getElementById("load").classList.add("d-none");
	document.getElementById("touchpad").classList.remove("d-none");
	Draw.init();
	const newGame = new Game();
	newGame.draw();
	//newGame.listenForTouches(newGame.level.pepe, newGame);
	newGame.listenForKeys(newGame.level.pepe, newGame);
});
