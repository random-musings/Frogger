/*
* @class Frogger
* this is the main class for the frogger game
* game.html
* 		|
* 		|_Frogger.js
* 				|
* 				|_Gamelevel.js
* 
* reference files
* constants.js
* GameLevel.js
* input.js
*/

/*
* @constructor
*	@param {string}	the HTML5 canvas id
*	@param {KeysPressed}	listens to the key press events
*	@param {WindowResized} listens the window resized events
*	@description 
*		Creates a Frogger object
*
*/
var Frogger = function(canvasId ,userInput,windowResized)
{
	this.windowSize =windowResized;
	this.canvas = document.getElementById(canvasId);
	this.context = this.canvas.getContext('2d');
	this.context.canvas.width = this.windowSize.width * cWINDOW_CLIP_PERCENTAGE;
	this.context.canvas.height = this.windowSize.height * cWINDOW_CLIP_PERCENTAGE;
	this.userInput = userInput;
	this.gameLevel = new GameLevel(1, this.context);
};

/*
* @returns void
*	@description 
*		sends window resize notification to GameLevel and
*		resizes the canvas to the new browser size
*		called by the Frogger.update() 
*/
Frogger.prototype.resize = function()
{
	if(this.windowSize.resized )
	{
		this.context.canvas.width = this.windowSize.width;
		this.context.canvas.height = this.windowSize.height;
		this.gameLevel.setNodeSize();
		this.windowSize.resized= false;
	}	
};

/*
* @returns void
*	@description 
*		sends key presses to GameLevel and
*		clears the keypress buffer so double presses don't occur
*		called by the Frogger.update() 
*/
Frogger.prototype.handleKeyPress = function()
{
	this.gameLevel.handleKeyPress(this.userInput);
	this.userInput.resetArrows();
};

/*
* @returns void
*	@description 
*		called once per animationframe to handle all canvas updates
*		called by the game.html  gameLoop()
*/
Frogger.prototype.update = function()
{
	this.resize();
	this.context.clearRect(0,0,this.windowSize.width,this.windowSize.height);
	this.handleKeyPress();
	this.gameLevel.update();
	this.gameLevel.draw();
};




