import { Item } from './item.js'
 
export class Coin extends Item{

    constructor(xPos, yPos, distance, scale, width, height, color, status, animationObj){
        super(xPos, yPos, distance, scale, width, height, color, status, animationObj);
    }
}