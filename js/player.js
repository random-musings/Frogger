

var Player  =  function( playerSprite, //the GameSprite.js
														points,				//current number of points
														lives,
														state)				//current number of lives
{
	this.sprite = new GameSprite(playerSprite, 
															playerSprite.position.x,playerSprite.position.y, // placement in columns of enemy
															playerSprite.velocity.x,playerSprite.velocity.y, // speed/direction of item in pixels
															playerSprite.size.x,playerSprite.size.y, // used to calculate the bounding/collision radius
															playerSprite.appearingTime.x,playerSprite.appearingTime.y );									
	this.points = points;
	this.lives = lives;
	this.state = state;
};

Player.prototype = Object.create(GameSprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.parent = GameSprite.prototype;

Player.prototype.clone = function()
{

	var newPlayer = new Player(
					this.sprite,
					this.points,
					this.lives,
					this.state
					);
	return newPlayer;
};

