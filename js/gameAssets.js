//references objects in javascript files
// point.js, 
// constants.js 
// gameImage.js
// gamePiece.js


//Images
var GameAssets = 
{
	"ALLIGATOR" : new GameImage( "ALLIGATOR","images/alligator.png"),
	"ALLIGATOR_BACK" : new GameImage( "ALLIGATOR_BACK","images/alligator_back.png"),
	"FROG" : new GameImage("FROG","images/frog_sm.png"),
	"FROGJUMP" : new GameImage("FROGJUMP","images/frogjump_sm.png"),
	"ENEMYBUG" : new GameImage("ENEMYBUG","images/enemy-bug.png"),
	"GEMBLUE" : new GameImage("GEMBLUE","images/Gem Blue.png"),
	"GEMGREEN" : new GameImage("GEMGREEN" ,"images/Gem Green.png"),
	"GEMORANGE" : new GameImage("GEMORANGE","images/Gem Orange.png"),
	"GRASS" : new GameImage("GRASS","images/grass-block.png"),
	"HEART" : new GameImage("HEART","images/Heart.png"),
	"KEY" : new GameImage("KEY","images/Key.png"),
	"LILYPAD" : new GameImage("LILYPAD","images/lilypad.png"),
	"LOG" : new GameImage("LOG","images/log.png"),
	"PAVEMENT" : new GameImage("PAVEMENT","images/pavement_plain.png"),
	"ROCK" : new GameImage("ROCK","images/Rock.png"),
	"SELECTOR" : new GameImage("SELECTOR","images/Selector.png"),
	"STAR" : new GameImage("STAR","images/Star.png"),
	"STONEBLOCK" : new GameImage("STONEBLOCK","images/stone-block.png"),
	"TRUCK" : new GameImage("TRUCK","images/truck2.png"),
	"GARBAGETRUCK" : new GameImage("GARBAGETRUCK","images/garbagetruck.png"),
	"WATER" : new GameImage("WATER","images/water-block.png"),
	"BORDER" : new GameImage("BORDER","images/white.png"),
};

var MapTurf =
{
	"GRASS" : 			new GamePiece(GameAssets.GRASS.index,true,0,0,0,false),
	"PAVEMENT" :  	new GamePiece(GameAssets.PAVEMENT.index,true,0,0,0,false),
	"ROCK" :  			new GamePiece(GameAssets.ROCK.index,false,0,0,0,false),
	"STONEBLOCK" :  new GamePiece(GameAssets.STONEBLOCK.index,true,0,0,0,false),
	"WATER" :  			new GamePiece(GameAssets.WATER.index,true,1,0,0,false),
};


var Enemies =
{
	"LILYPAD" :   new GamePiece(GameAssets.LILYPAD.index,true,0,0,0,false),
	"LOG" :       new GamePiece(GameAssets.LOG.index,true,0,0,0,false),
	"ALLIGATOR" : new GamePiece(GameAssets.ALLIGATOR.index,true,1,0,0,false),
	"ALLIGATOR_BACK" : new GamePiece(GameAssets.ALLIGATOR_BACK.index,true,0,0,0,false),
	"ENEMYBUG" :  new GamePiece(GameAssets.ENEMYBUG.index,true,1,0,0,false),
	"TRUCK" :     new GamePiece(GameAssets.TRUCK.index,true,1,0,0,false),
	"GARBAGETRUCK" :  new GamePiece(GameAssets.GARBAGETRUCK.index,true,1,0,0,false)
};


var Players =
{
	"FROG": new GamePiece(GameAssets.FROG.index,true,0,0,0,false),
}

var Rewards = 
{
	"GEMBLUE" : 	new GamePiece(GameAssets.GEMBLUE.index,true,0,5,0,false),
	"GEMGREEN" : 	new GamePiece(GameAssets.GEMGREEN.index,0,10,0,false),
	"GEMORANGE" : new GamePiece(GameAssets.GEMORANGE.index,0,15,0,false),
	"STAR" : 			new GamePiece(GameAssets.STAR.index,0,20,0,false),
	"STAR" : 			new GamePiece(GameAssets.STAR.index,0,20,1,false),
	"KEY" : 			new GamePiece(GameAssets.KEY.index,0,5,0,true)
};