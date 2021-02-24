import { Game } from "./game.js"

window.addEventListener("load", ()=>{
	alert("works");
	document.getElementById("load").classList.add("d-none");
	
	const newGame = new Game();
	//newGame.draw();
	//Game.listenForTouches();
	//Game.listenForKeys();
});
