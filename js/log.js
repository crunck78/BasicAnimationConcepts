export class Log{
    constructor(){
    }

	static ctx = document.getElementById("log");
	static print(msg){
		Log.ctx.innerHTML = `${msg}`;
	}
	
	static clear(){
		Log.ctx.innerHTML = '';
	}
}
