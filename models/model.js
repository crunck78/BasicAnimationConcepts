export class Model {
    constructor(xPos, yPos, distance, scale, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.base_img = new Image();
        this.distance = distance;
        this.scale = scale;
        this.width = width;
        this.heigth = height;
    }
}