import { Draw } from "./draw.js";

export class Hud extends Draw {
    
    constructor(player) {
        super();
        this.player = player;
        this.hud = document.getElementById("hud");
        this.init();    
        this.lifeBar = document.getElementById("life-bar");
        this.bottlesCounter = document.getElementById("bottles");
        this.coinsCounter = document.getElementById("coins");
    }

    init() {
        //TODO ADD COINS UND BOTTLES BAR
        this.show();
        this.hud.innerHTML = `
        <div id="bars-container" class="hud-element">
            <img id="life-bar" src="img/HUD/life-bar/life_${this.player.health}.png">
        </div>

        <div id="item-list" class="hud-element">
            <div class="item">
                <img src="img/HUD/bottle.png">
                <p id="bottles" class="counter">${this.player.bottles}</p>
            </div>
            <div class="item">
                <img src="img/HUD/coin.png">
                <p id="coins" class="counter">${this.player.coins}</p>
            </div>
        </div>
        `;
    }

    update(timeStamp){
        this.coinsCounter.innerHTML = this.player.coins;
        this.bottlesCounter.innerHTML = this.player.bottles;
        this.lifeBar.src = `img/HUD/life-bar/life_${this.player.health}.png`;
    }

    show() {
        this.hud.classList.remove("d-none");
    }

    hide() {
        this.hud.classList.add("d-none");
    }

    toggle(){
        this.hud.classList.toggle("d-none");
    }

}