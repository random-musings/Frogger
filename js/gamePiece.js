/*
* @class GamePiece
* game.html
* 		|
* 		|_GameAssets.js
* 		|		|
* 		|		|_GamePiece.js
* 		|
* 		|_GameSprite.js
* 					|
* 					|_GamePiece.js
* this is the basic game piece
* it indicates the imageIndex,points,lives,damage inflicted 
* GameAssets creates all the game pieces 
* GamePiece is the nested class to GameSprite
*/


/*
* @constructor
* @param{number} imageIndex - the image to draw
* @param{number} canWalkOn - can a player move to this square
* @param{number} damageInflicted - does the player receive damage  
* @param{number} pointsAwarded - does the player receive points
* @param{number} livesAwarded - does the player receive lives
* @param{number} isKey - does player earn a key
* @description create a gamePiece
*/
var GamePiece = function(imageIndex,
														canWalkOn,
														damageInflicted,
														pointsAwarded,
														livesAwarded,
														isKey)
{
	this.imageIndex = imageIndex;
	this.canWalkOn  = canWalkOn;
	this.damageInflicted = damageInflicted;
	this.pointsAwarded = pointsAwarded;
	this.livesAwarded = livesAwarded;
	this.isKey = isKey;
};

/*
* @returns {GamePiece}
* @description creates a copy of the gamePiece
*/
GamePiece.prototype.clone = function()
{
 var gp = new GamePiece(	 this.imageIndex,
																		this.canWalkOn,
																		this.damageInflicted,
																		this.pointsAwarded,
																		this.livesAwarded,
																		this.isKey);
	return gp;
};