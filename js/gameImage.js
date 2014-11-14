/*
* @class GameImage
* game.html
* 		|
* 		|_GameAssets.js
* 				|
* 				|_GameImage.js
* 
* creates an index and 
* loads an image for use by the canvas/context
*/

/*
* @constructor 
*	@param {string} the reference to the image
* @param {string} path to the image
*/
var GameImage = function(index,src)
{
	this.index = index;
	this.img = new Image();
	this.img.src = src;
}