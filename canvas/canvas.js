export class Canvas{
    constructor(){
        this.cnv = document.getElementsByTagName["canvas"][0];
        this.cnv.width = window.innerWidth;
        this.cnv.height = window.innerHeight;
        this.ctx = this.cnv.getContext("2d");
    }
}