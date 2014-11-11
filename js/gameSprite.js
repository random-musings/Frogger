
//Referenced javascript files
// Point.js
// GamePiece.js

var GameSprite  = function( gamePiece, //gamePiece.js
														posX,posY, //point.js placement in columns of enemy
														velX,velY, //point.js speed/direction of item in pixels
														sizeX,sizeY, //point.js ued to calculate the bounding/collision radius
														appearStart,appearEnd //point.js when in the level the object appears/disappears
														)
{
	console.log("gamesprite before  init "+gamePiece.imageIndex);
	this.parent.constructor.call(this,gamePiece.imageIndex,
																		gamePiece.canWalkOn,
																		gamePiece.damageInflicted,
																		gamePiece.pointsAwarded,
																		gamePiece.livesAwarded,
																		gamePiece.isKey);

	this.position = new Point(posX,posY);
	this.velocity = new Point(velX,velY);
	this.size = new Point(sizeX,sizeY);
	this.appearingTime = new Point(appearStart,appearEnd);
};

GameSprite.prototype = Object.create(GamePiece.prototype);
GameSprite.prototype.constructor = GameSprite;
GameSprite.prototype.parent = GamePiece.prototype;

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
