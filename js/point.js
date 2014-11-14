/*
* @class Point
* this provides an object that hold two paired values
* it is used to holder, positions,velocities, size (height,width)
* 
* 
* game.html
* 		|
* 		|_AllLevel.js
* 		|		|_Point.js holds the map positions, and used to create game Sprites
* 		|
* 		|_Frogger.js
* 		|		|
* 		|		|_GameLevel.js
* 		|				|_Point.js (nodeSize,maxNodeSize) for the current map
* 		|
* 		|_GameSprite
* 					|_Points.js (position,velocity,size,appearing time)
*/
	
/*
* @constructor 
* this provides an object that hold  paired values
*/
var Point = function(newX,newY)
{
	this.x = newX;
	this.y = newY;
};

/*
* @param {Number} newX -add to the point.x variable
* @param {Number} newY -add to the point.y variable
* @returns void
*/
Point.prototype.add = function( newX,newY)
{
	this.x = this.x +newX;
	this.y = this.y +newY;
};

/*
* @param {Number} newX  subtract to the point.x variable
* @param {Number} newY -subtract to the point.y variable
* @returns void
*/
Point.prototype.subtract = function( newX,newY)
{
	this.x = this.x - newX;
	this.y = this.y - newY;
};

/*
* @param {Point} newPoint - copies the values into this point
* @returns void
*/
Point.prototype.copy = function(newPoint)
{
	if(newPoint)
	{
		this.x = newPoint.x;
		this.y = newPoint.y;
	}
};
