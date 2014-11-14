/*
* this loads all of the image for the gameImage
* it creates the  game pieces 
* game.html
* 		|
* 		|
* 		|	
* 		|_alllevels.js
* 		|		|
* 		|		|_gameAssets.js
* 		|		  the levels array creates sprites based off the 
* 		|			rewards,player,enemies arrays in this file
* 		|
* 		|_Frogger.js
* 				|
* 				|_Gamelevel.js
* 						|_gameAssets is referenced whenever an image is drawn
* 							to the canvas
* 
* references objects in javascript files
*  point.js, 
*  constants.js 
*  gameImage.js
*  gamePiece.js
*/

//All Images
var GameAssets = 
{
	'ALLIGATOR' : new GameImage( 'ALLIGATOR','images/alligator.png'),
	'ALLIGATOR_BACK' : new GameImage( 'ALLIGATOR_BACK','images/alligator_back.png'),
	'FROG' : new GameImage('FROG','images/frog_sm.png'),
	'FROGJUMP' : new GameImage('FROGJUMP','images/frogjump_sm.png'),
	'ENEMYBUG' : new GameImage('ENEMYBUG','images/enemy-bug.png'),
	'GEMBLUE' : new GameImage('GEMBLUE','images/gem blue.png'),
	'GEMGREEN' : new GameImage('GEMGREEN' ,'images/gem green.png'),
	'GEMORANGE' : new GameImage('GEMORANGE','images/gem orange.png'),
	'GRASS' : new GameImage('GRASS','images/grass-block.png'),
	'HEART' : new GameImage('HEART','images/heart.png'),
	'KEY' : new GameImage('KEY','images/key.png'),
	'LILYPAD' : new GameImage('LILYPAD','images/lilypad.png'),
	'LOG' : new GameImage('LOG','images/log.png'),
	'PAVEMENT' : new GameImage('PAVEMENT','images/pavement_plain.png'),
	'ROCK' : new GameImage('ROCK','images/rock.png'),
	'SELECTOR' : new GameImage('SELECTOR','images/selector.png'),
	'STAR' : new GameImage('STAR','images/star.png'),
	'STONEBLOCK' : new GameImage('STONEBLOCK','images/stone-block.png'),
	'TRUCK' : new GameImage('TRUCK','images/truck2.png'),
	'GARBAGETRUCK' : new GameImage('GARBAGETRUCK','images/garbagetruck.png'),
	'WATER' : new GameImage('WATER','images/water-block.png'),
	'BORDER' : new GameImage('BORDER','images/white.png'),
};

//all map pieces
var MapTurf =
{
	'GRASS' : 			new GamePiece(GameAssets.GRASS.index,true,0,0,0,false),
	'PAVEMENT' :  	new GamePiece(GameAssets.PAVEMENT.index,true,0,0,0,false),
	'ROCK' :  			new GamePiece(GameAssets.ROCK.index,false,0,0,0,false),
	'STONEBLOCK' :  new GamePiece(GameAssets.STONEBLOCK.index,true,0,0,0,false),
	'WATER' :  			new GamePiece(GameAssets.WATER.index,true,1,0,0,false),
};


var Enemies =
{
	'LILYPAD' :   new GamePiece(GameAssets.LILYPAD.index,true,0,0,0,false),
	'LOG' :       new GamePiece(GameAssets.LOG.index,true,0,0,0,false),
	'ALLIGATOR' : new GamePiece(GameAssets.ALLIGATOR.index,true,1,0,0,false),
	'ALLIGATOR_BACK' : new GamePiece(GameAssets.ALLIGATOR_BACK.index,true,0,0,0,false),
	'ENEMYBUG' :  new GamePiece(GameAssets.ENEMYBUG.index,true,1,0,0,false),
	'TRUCK' :     new GamePiece(GameAssets.TRUCK.index,true,1,0,0,false),
	'GARBAGETRUCK' :  new GamePiece(GameAssets.GARBAGETRUCK.index,true,1,0,0,false)
};

var Players =
{
	'FROG': new GamePiece(GameAssets.FROG.index,true,0,0,0,false),
};

var Rewards = 
{
	'GEMBLUE' : 	new GamePiece(GameAssets.GEMBLUE.index,true,0,1,0,false),
	'GEMGREEN' : 	new GamePiece(GameAssets.GEMGREEN.index,true,0,1,0,false),
	'GEMORANGE' : new GamePiece(GameAssets.GEMORANGE.index,true,0,1,0,false),
	'STAR' : 			new GamePiece(GameAssets.STAR.index,true,0,1,1,false),
	'HEART' : 			new GamePiece(GameAssets.HEART.index,true,0,0,1,false),
	'KEY' : 			new GamePiece(GameAssets.KEY.index,true,0,5,0,true)
};