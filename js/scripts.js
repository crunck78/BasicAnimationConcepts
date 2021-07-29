import { Draw } from "./draw.js"
import { Game } from "./game.js"
import { Log } from "./log.js"
import { createAllAnimations } from "./animations.js"
import { Hud } from "./hud.js";


	const allAnimations = await createAllAnimations();
	document.getElementById("load").classList.add("d-none");
	document.getElementById("touchpad").classList.remove("d-none");
	const newGame = new Game(allAnimations);
	
	// newGame.listenForKeys2();
	window.Draw = Draw;
	window.Game = Game;
