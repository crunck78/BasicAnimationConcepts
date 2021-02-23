export class Draw{
	constructor() {
    	if (new.target === Draw) {
      		throw new TypeError("Cannot construct Draw instances directly");
    	}
		//this.startDraw;
  	}
	
	draw(){
		throw new TypeError("Methode has no implementation!");
	}
	
	drawElements(elements){
		elements.forEach( element =>{
			element.draw();
		});
	}
}
