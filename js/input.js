//this file holds all of the input entered by the user
//the current events logged are
// key up
// key down
// window resized
//
// Class hierarchy
// Main.js
//		|
//		|_input.js
//


//holds the keys pressed by the user
var KeysPressed = function()
{
	this.SPACE=32;
	this.LEFT = 37;
	this.UP = 38;
	this.RIGHT = 39;
	this.DOWN = 40;
  this.timePressedTolerance; //the time allowed between key presses (prevents accidental double presses
	this.pressedKeys=[];
	this.timeLastPressed=0; //used to avoid double key presses
}

KeysPressed.prototype.resetArrows = function()
{
	this.pressedKeys[this.SPACE] =false;
	this.pressedKeys[this.LEFT] =false;
	this.pressedKeys[this.UP] =false;
	this.pressedKeys[this.RIGHT] =false;
	this.pressedKeys[this.DOWN] =false;
}
//called whenever a key is pressed or released
KeysPressed.prototype.setKey = function(key,status)
{
	var d = new Date();
	userInput.pressedKeys[key] = status;
	userInput.timeLastPressed = d.getTime();;
};

//holds the current window width & height
var WindowResized = function(startWidth, startHeight)
{
	this.width = startWidth;
	this.height = startHeight;
	this.resized = false;
}

//called whenever the window is resized
WindowResized.prototype.resizeWindow = function()
{
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.resized = true;
}

//events we listen to	
//user presses key
document.addEventListener('keydown', function(e) {
	userInput.setKey(e.keyCode,true);
});

//user releases key
document.addEventListener('keyup', function(e) {
	 userInput.setKey(e.keyCode,false);
});

//window loses focus
window.addEventListener('blur', function() {
		userInput.pressedKeys = {};
});

window.input = {
			isDown: function(key) {
					return  userInput.pressedKeys[key.toUpperCase()];
			}
	};
	
	//window is resized by user
window.addEventListener('resize' , function(event)
{
	windowSize.resizeWindow();
});
	

var userInput = new KeysPressed();
var windowSize = new WindowResized(window.innerWidth,window.innerHeight);
