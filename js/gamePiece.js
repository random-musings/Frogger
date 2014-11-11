//this is the basic game piece
//it indicates the associated  image 
//and the points or damage inflicted by colliding with it

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