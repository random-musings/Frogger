/*
* @class GameSprite
* GameSprite holds the position/velocity/size of a GamePiece
* game.html
* 		|
* 		|_AllLevel.js
* 					|
* 					|_GameSprite.js 
* Referenced javascript files
*  Point.js
*  GamePiece.js
*/

/*
*	@constructor
* @extends GamePiece
* @param {GamePiece}
* @param {number} posX - current position on the x axis
* @param {number} posY - current position on the y axis
* @param {number}	velX - the horizontal velocity of the gamePiece
* @param {number} velY - the vertical velocity of the gamePiece
* @param {number} sizeX - the width of gamePiece (for collisions)
* @param {number} sizeY - the height of the gamePieve (for collisions)
* @param {number} appearStart - the time the reward/gamePiece appears
* @param {number} appearEnd - the time the reward/gamePiece disappears
*/
var GameSprite  = function( gamePiece, //gamePiece.js
														posX,posY, //point.js placement in columns of enemy
														velX,velY, //point.js speed/direction of item in pixels
														sizeX,sizeY, //point.js ued to calculate the bounding/collision radius
														appearStart,appearEnd //point.js when in the level the object appears/disappears
														)
{
	GamePiece.call(this,gamePiece.imageIndex,
											gamePiece.canWalkOn,
											gamePiece.damageInflicted,
											gamePiece.pointsAwarded,
											gamePiece.livesAwarded,
											gamePiece.isKey);

	this.position = new Point(posX,posY);
	this.velocity = new Point(velX,velY);
	this.size = new Point(sizeX,sizeY);
	this.appearingTime = new Point(appearStart,appearEnd);
	this.lastDisplayed=0;
};

//setup the inheritance
GameSprite.prototype = Object.create(GamePiece.prototype);
GameSprite.prototype.constructor = GameSprite;
GameSprite.prototype.parent = GamePiece.prototype;


/*
* @returns {GamePiece}
* @description creates a copy of the GameSprite
*/
GameSprite.prototype.clone = function()
{
	var gamePiece  = new GamePiece(this.imageIndex,
																		this.canWalkOn,
																		this.damageInflicted,
																		this.pointsAwarded,
																		this.livesAwarded,
																		this.isKey);
	var newSprite = new GameSprite(
							gamePiece,
							this.position.x,this.position.y,
							this.velocity.x, this.velocity.y,
							this.size.x, this.size.y,
							this.appearingTime.x, this.appearingTime.y
							);
	return newSprite;
};
