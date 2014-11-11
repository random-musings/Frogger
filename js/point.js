
var Point = function(newX,newY)
{
	this.x = newX;
	this.y = newY;
};

Point.prototype.add = function( newX,newY)
{
	this.x = this.x +newX;
	this.y = this.y +newY;
}

Point.prototype.subtract = function( newX,newY)
{
	this.x = this.x - newX;
	this.y = this.y - newY;
}

Point.prototype.copy = function(newPoint)
{
	if(newPoint)
	{
		this.x = newPoint.x;
		this.y = newPoint.y;
	}
}
