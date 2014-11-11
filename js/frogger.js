//reference files
//constants.js
//GameLevel.js
//input.js

var Frogger = function(canvasId ,userInput,windowResized)
{
	this.windowSize =windowResized;
	this.canvas = document.getElementById(canvasId);
	this.context = this.canvas.getContext("2d");
	this.context.canvas.width = this.windowSize.width * cWINDOW_CLIP_PERCENTAGE;
	this.context.canvas.height = this.windowSize.height * cWINDOW_CLIP_PERCENTAGE;
	this.userInput = userInput;
	this.gameLevel = new GameLevel(1, this.context);
};

Frogger.prototype.resize = function()
{
	if(this.windowSize.resized 
		&& this.windowSize.width>350 
		&& this.windowSize.height>400
		&& this.windowSize.width<900 
		&& this.windowSize.height<900)
	{
		this.context.canvas.width = this.windowSize.width;
		this.context.canvas.height = this.windowSize.height;
		this.gameLevel.sizeToWindow();
		this.windowSize.resized= false;
	}	
};


Frogger.prototype.handleKeyPress = function()
{
	this.gameLevel.handleKeyPress(this.userInput);
	this.userInput.resetArrows();
}

Frogger.prototype.update = function()
{
	this.resize();
	this.context.clearRect(0,0,this.windowSize.width,this.windowSize.height);
	this.handleKeyPress();
	this.gameLevel.update();
	this.gameLevel.draw();
};




