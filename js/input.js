//this file holds all of the input entered by the user
//the current events logged are
// key up
// key down
// window resized
//
// Class hierarchy
// game.html
//		|
//		|_input.js
//
//Frogger.js is given passed the userInput & windowSize variables
// so it can track the events 
// and send them to GameLevel.js


/*
* @constructor	
*	@description 
*		holds the keys pressed by the user
*
*/
var KeysPressed = function()
{
	this.SPACE=32;
	this.LEFT = 37;
	this.UP = 38;
	this.RIGHT = 39;
	this.DOWN = 40;
  this.timePressedTolerance=0; //the time allowed between key presses (prevents accidental double presses
	this.pressedKeys=[];
	this.timeLastPressed=0; //used to avoid double key presses
};

/*
* @returns void
*	@description 
*		clears the array of key presses to prevent accidental double keying
*		called by the Frogger.handleKeyPress() 
*/
KeysPressed.prototype.resetArrows = function()
{
	this.pressedKeys[this.SPACE] =false;
	this.pressedKeys[this.LEFT] =false;
	this.pressedKeys[this.UP] =false;
	this.pressedKeys[this.RIGHT] =false;
	this.pressedKeys[this.DOWN] =false;
};

/*
* @returns void
* @param {number}	which key was pressed/released
*	@param {boolean} indicates to activate/disable the key
*	@description 
*		called whenever a key is pressed or released
*		attached to the key up and key down events
*/
KeysPressed.prototype.setKey = function(key,status)
{
	var d = new Date();
	userInput.pressedKeys[key] = status;
	userInput.timeLastPressed = d.getTime();
};


/*
* @constructor
* @param {number}	newWidth
*	@param {number} newHeight
*	@description 
*		tracks window resize events
*/
var WindowResized = function(startWidth, startHeight)
{
	this.width = startWidth;
	this.height = startHeight;
	this.resized = false;
};

/*
* @returns void
*	@description 
*		called whenever the window is resized
*/
WindowResized.prototype.resizeWindow = function()
{
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.resized = true;
};


/*
* @returns void
*	@description 
*		attaches the keydown event to function userInput.setKey()
*/
document.addEventListener('keydown', function(e) {
	userInput.setKey(e.keyCode,true);
});

/*
* @returns void
*	@description 
*		attaches the keyup event to function userInput.setKey()
*/
document.addEventListener('keyup', function(e) {
	 userInput.setKey(e.keyCode,false);
});

/*
* @returns void
*	@description 
*		resets keys when window loses focus
*/
window.addEventListener('blur', function() {
		userInput.pressedKeys = {};
});

/*
* @returns void
*	@description 
*		listens to key press events
*/
window.input = {
			isDown: function(key) {
					return  userInput.pressedKeys[key.toUpperCase()];
			}
	};
	
/*
* @returns void
*	@description 
*		listens to the resize event
*/
window.addEventListener('resize' , function(event)
{
	windowSize.resizeWindow();
});
	
//holds the key presses (passed to Frogger)
var userInput = new KeysPressed();

//holds the window resize event (passed to Frogger)
var windowSize = new WindowResized(window.innerWidth,window.innerHeight);
