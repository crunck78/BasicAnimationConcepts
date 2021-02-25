export class Log{
    constructor(){
    }

	static ctx = document.getElementById("log");
	static print(msg){
		Log.ctx.innerHTML += `${msg}<br>`;
	}
	
	static clear(){
		Log.ctx.innerHTML = '';
	}
}
