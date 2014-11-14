/*
* @class Player
* this is the player 
* game.html
* 		|
* 		|_AllLevel.js 
* 		|		|_Player.js is created for each level of the map
* 		|
* 		|_Frogger.js
* 				|
* 				|_GameLevel.js 
* 						|_Player.js variable is copied from level during init()
*/

/*
* @constructor {Player}
* @description creates a player
*/
var Player  =  function( playerSprite, //the GameSprite.js
														points,				//current number of points
														lives)				//current number of lives
{
	this.sprite = new GameSprite(playerSprite, 
															playerSprite.position.x,playerSprite.position.y, // placement in columns of enemy
															playerSprite.velocity.x,playerSprite.velocity.y, // speed/direction of item in pixels
															playerSprite.size.x,playerSprite.size.y, // used to calculate the bounding/collision radius
															playerSprite.appearingTime.x,playerSprite.appearingTime.y );									
	this.points = points;
	this.lives = lives;
};

/*
* @returns {Player}
* @description creates a copy of the player
*/
Player.prototype.clone = function()
{

	var newPlayer = new Player(
					this.sprite,
					this.points,
					this.lives
					);
	return newPlayer;
};

