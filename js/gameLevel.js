/*
* @class
* This file handles the game play for frogger (map,player, rewards,enemies)
* 
* game.html
* 		|
* 		|_Frogger.js
* 				|
* 				|_Gamelevel.js
* 
* javascript reference files
*  GameAssets.js
*  GamePiece.js
*  GameSprite.js
*  Player.js
*  Point.js
*  input.js
*  allLevels.js
*/

/*
* @public
* @constructor
* @param {number}  the level to load
* @param {context}	the drawing context
*/
var GameLevel = function( levelIndex,
													context
													)
{
	//create a copy of the level,maps and all elements
	this.map={};
	this.levelIx =levelIndex; 
	this.init();
	
	//this is the drawing context
	this.context = context;
	this.lastUpdate = 0;
	
	//reset the node size, map layout
  //to fit the canvas (so we don't overflow)
	this.setNodeSize();
};

/*
* @returns void
*	@description 
*		uses this.levelIx to load the first level into the game
*		called by the constructor 
*/
GameLevel.prototype.init = function()
{
	var level = AllLevels[this.levelIx];
	
	this.map.cols = level.cols;
	this.map.rows = level.rows;
	this.map.nodeHeight = level.nodeHeight;
	this.map.nodeWidth = level.nodeWidth;
		
	//copy map 
	this.map.nodes = [];
	var length  = level.nodes.length;
	for(var nodeIndex = 0;nodeIndex<length;nodeIndex++)
	{
		var node = level.nodes[nodeIndex];
		if(node)
			this.map.nodes[nodeIndex] = node.clone();
	}
	
	//set node size
	//the maximum node size
	this.maxNodeSize = new Point(this.map.nodeWidth,this.map.nodeHeight );
	this.nodeRatio  = new Point(this.maxNodeSize.x/this.maxNodeSize.y,
															this.maxNodeSize.y/this.maxNodeSize.x);
	this.nodeSize = new Point(0,0);
	this.toolBarSize = new Point(0,level.toolBarHeight);
	
	//copy Enemies
	this.enemies = [];
	length = level.enemies.length;
	for(var enemyIndex = 0;enemyIndex<length;enemyIndex++)
	{
		var enemy = level.enemies[enemyIndex];
		if(enemy)
		{
			this.enemies[enemyIndex] = enemy.clone();
			//randomly place enemies on the map
			this.enemies[enemyIndex].position.x +=  (Math.random() * this.map.cols);
		}
	}
	
	//copy rewards
	this.rewards =[];
	length = level.rewards.length;
	for(var rewardIndex = 0;rewardIndex<length; rewardIndex++)
	{
		var reward = level.rewards[rewardIndex];
		if(reward)
			this.rewards[rewardIndex] = reward.clone();
	}
	
	//init the player
	this.player = level.player.clone();
	this.velocityModifer =0;
}

// *******************
// ** DRAW FUNCTIONS
// *******************
/*
* @returns void
*	@description 
*		calls the drawing functions for players,rewards,toolbar,enemies
*		called by frogger.update()
*/
GameLevel.prototype.draw = function()
{
	this.drawMap();
	this.drawEnemies();
	this.drawRewards();
	this.drawPlayer();
	this.drawToolBar();
};

/*
* @returns void
*	@description 
*		this function draws the map onto the canvas
*		called by: GameLevel.draw()
*/
GameLevel.prototype.drawMap = function()
{
	//ensure that if window was resized - we draw the map accordingly
	var map = this.map;

	//holds the location in pixels of where we are on the canvas
	var x = 0; 
	var y = 0;
	
	//holds the current row/col location of the node
	var col =0;
	var row = 0;
	
	//holds the index of the map array
	var ix = 0;
	
	while(col<=map.cols)
	{
		x =0;
		row = 0;
		while(row<=map.rows)
		{
			var node = map.nodes[ix];
			//draw the terrain
			this.context.drawImage(GameAssets[node.imageIndex].img,x,y);
			row = row+1;
			x = x + this.nodeSize.x;
			ix = ix +1;
		}
		col = col+1;
		y = y + this.nodeSize.y;
	}
};


/*
* @param {number} position
* @param {number} nodeSize
* @returns {number}
*	@description 
* figure out where to draw the image on the canvas
* using the current position and the size of the node
*	called by drawEnemies
*					drawPlayer
*					drawRewards
*/
GameLevel.prototype.calcOffset = function(position,nodeSize)
{
	return  (position ) * nodeSize;
}


/*
* @returns void
*	@description 
*		this function draws the enemies onto the canvas
*		called by: GameLevel.draw()
*/
GameLevel.prototype.drawEnemies = function()
{
	var length = this.enemies.length;
	for(var enemyIx=0;enemyIx<length;enemyIx++)
	{
		var enemy = this.enemies[enemyIx];
		if(enemy)
		{
			var enemyImageIndex = enemy.imageIndex;
			this.context.drawImage(GameAssets[enemyImageIndex].img,
											this.calcOffset(enemy.position.x,this.nodeSize.x),
											 this.calcOffset(enemy.position.y, this.nodeSize.y),
											this.nodeSize.x,this.nodeSize.y);
		}
	}
};

/*
* @returns void
*	@description 
*		this function draws the rewards onto the canvas
*		called by: GameLevel.draw()
*/
GameLevel.prototype.drawRewards = function()
{
	var currTime = Date.now();
	var length = this.rewards.length;
	for(var rewardIx =0; rewardIx<length; rewardIx++)
	{
		var reward  = this.rewards[rewardIx];
		if(reward)
		{
			//the updateRewards time will set lastDisplayed 
			//so that this condition become false when 
			if( (currTime - reward.lastDisplayed)> reward.appearingTime.x)				
			{
				this.context.drawImage(GameAssets[reward.imageIndex].img,
											this.calcOffset(reward.position.x,this.nodeSize.x),
											this.calcOffset(reward.position.y, this.nodeSize.y),
											this.nodeSize.x,this.nodeSize.y);
			}
		}
	}
};

/*
* @returns void
*	@description 
*		this function draws the player onto the canvas
*		called by: GameLevel.draw()
*/
GameLevel.prototype.drawPlayer = function()
{

	var player = this.player;
	var imageIndex = player.imageIndex;
	this.context.drawImage(GameAssets[imageIndex].img,
											this.calcOffset(player.position.x,this.nodeSize.x),
											this.calcOffset(player.position.y,this.nodeSize.y),
											this.nodeSize.x,this.nodeSize.y);
};

/*
* @returns void
*	@description 
*		draws the toolBar on the right and bottom to obscure players
*		travelling off the game map.
*		the bottom stats like lives, points nd current level are drawn here
*		called by: GameLevel.draw()
*/
GameLevel.prototype.drawToolBar = function()
{
	var borderRight = this.nodeSize.x * (this.map.cols + 1);
	var borderBottom = this.nodeSize.y * (this.map.rows + 1);
	
	//obsuce the bottom and right sides of the map 
	//so characters gracefully disappear from the screen
	this.context.drawImage(GameAssets.BORDER.img,
											borderRight,
											0,
											this.context.canvas.width ,this.context.canvas.height );
	this.context.drawImage(GameAssets.BORDER.img,
											0,
											borderBottom,
											this.context.canvas.width ,this.context.canvas.height);

	//tool bar stats
	//draw lives
	this.context.font = 'bold 20pt Calibri';
	var toolY = (this.nodeSize.y *( this.map.cols+1));
	var textY = toolY+this.nodeSize.y/1.3;
	this.context.drawImage(GameAssets.HEART.img,
											this.nodeSize.x*2, toolY,
											this.nodeSize.x,this.nodeSize.y);
	this.context.fillText(' x'+this.player.lives,
											this.nodeSize.x*3, textY);
	//draw points
	this.context.drawImage(GameAssets.GEMBLUE.img,
											this.nodeSize.x*4, toolY,
											this.nodeSize.x,this.nodeSize.y);
	this.context.fillText(' x'+this.player.points,
											this.nodeSize.x*5, textY);
											
	//draw level
	var level = this.levelIx ==0?1:this.levelIx;
	this.context.fillText(' Level '+level,0, textY);
};



/*
* @returns void
*	@description 
*	this function is called every frameElement
*	to advance enemies though the world
*	move the player through the world
*	determine if the player has  
*	<ul>
*	<li>been killed 
*	<li>a reward
*	<li>reached the end of the level
*	</ul>
*	called by: Frogger.update()
*/
GameLevel.prototype.update = function()
{
	this.updateRewards();
	this.updateEnemies();
	this.updatePlayer();
};

/*
* @returns void
*	@description 
*		updates the visibility of the rewards
*		rewards will appear and disappear on a schedule.
*		called by: GameLevel.update()
*/
GameLevel.prototype.updateRewards = function()
{
	var currTime = Date.now();
	var length = this.rewards.length;
	for(var rewardIx=0;rewardIx<length;rewardIx++)
	{
		var reward  = this.rewards[rewardIx];

		if(reward)
		{
			//time has elapsed hide the reward
			//or if the reward has been reset - move it
			if(((currTime - reward.lastDisplayed)> reward.appearingTime.y) || (reward.lastDisplayed==0))
			{
				reward.lastDisplayed = currTime;
				//change the position
				var randX = (Math.random() * this.map.cols) % (this.map.cols-1) +1;
				var randY = (Math.random() * this.map.rows) % (this.map.rows-1) +1;
				reward.position.x = randX;
				reward.position.y = randY;
			}
		}
	}
};

/*
* @returns void
*	@description 
*		advances the enemies on the map
*		called by: GameLevel.update()
*/
GameLevel.prototype.updateEnemies = function(deltaTime)
{
	var length = this.enemies.length;
	for(var enemyIx=0;enemyIx<length;enemyIx++)
	{
		var enemy = this.enemies[enemyIx];
		if(enemy)
		{
			var velocityXMod  =enemy.velocity.x<0?-1*this.velocityModifer:this.velocityModifer;
			var velocityYMod  =0;
			enemy.position.add(enemy.velocity.x+velocityXMod, enemy.velocity.y+velocityYMod);
		}
		
		var mapMax =  this.map.cols +2;
		var mapMin = -2 ;
		
		//if we reached the end of the map reset to the beginning
		if(enemy.position.x> mapMax)
			enemy.position.x = mapMin;

		//if we reached the beginning of the map reset to the end
		if(	enemy.position.x < mapMin)
			enemy.position.x = mapMax;
	}
};

/*
* @returns {GameSprite}
*	@description 
*		determines if the player has reached a reward
*		if yes then return that reward
*		if no then return null
*		called by: GameLevel.updatePlayer()
*/
GameLevel.prototype.playerOnReward = function()
{
	var now = Date.now();
	var length = this.rewards.length;
	for(var rewardIx=0;rewardIx<length;rewardIx++)
	{
		var reward = this.rewards[rewardIx];
		if(reward  	&&			//reward is currently visible
			 (now)> (reward.appearingTime.x + reward.lastDisplayed) &&
			 (now)< (reward.appearingTime.y +reward.lastDisplayed) )
		{
			//are we standing close to it?
			var distanceX =Math.abs( this.player.position.x - reward.position.x);
			var distanceY = Math.abs(this.player.position.y - reward.position.y);
			if( distanceX < 0.9 && distanceY < 0.5)
			{	//player near reward - give it to him
					return reward;
			}
		}
	}
	return null;
};

/*
* @returns {GameSprite}
*	@description 
*		determines if the player is sitting on an enemy
*		called by: GameLevel.isPlayerSafe() to determine if the player is being run over by car/truck
*		called by: GameLevel.updatePlayerVelocity--> to determine if we are on a log/lily pad
*/
GameLevel.prototype.playerOnEnemy = function()
{
	var length = this.enemies.length;
	for(var enemyIx =0; enemyIx<length;enemyIx++)
	{
		var enemy = this.enemies[enemyIx];
		if(enemy)
		{
			var distanceX =Math.abs( this.player.position.x - enemy.position.x);
			var distanceY = Math.abs(this.player.position.y - enemy.position.y);
			if( distanceX < 0.6 && distanceY < 0.5)
			{
				return enemy;
			}
		}
	}
	return null;
};

/*
* @returns {GameSprite}
*	@description 
*		heck to see if the player is touching a violent enemy
*		or standing on a tile that does damage
*		called by: GameLevel.updatePlayer() 
*/
GameLevel.prototype.isPlayerSafe = function()
{
	var onEnemy = this.playerOnEnemy();
	if(onEnemy)
	{
		//if the enemy does no damage allow it
		if( onEnemy.damageInflicted==0)
			return true;
		return false;
	}
	//check to see if player is on a bad tile
	var mapCol = Math.floor(this.player.position.x);
	var mapRow = Math.floor(this.player.position.y);
	var index = mapRow * (this.map.rows+1)  + mapCol;
	var mapTile = this.map.nodes[index];		
	return ( mapTile.damageInflicted==0 );
};

/*
* @returns void
*	@description 
*		check to see where the player is
*		if they are on a log/lily pad- the player will be carried
*		called by: GameLevel.updatePlayer() 
*/
GameLevel.prototype.updatePlayerVelocity = function()
{
	//check if player is at edges of map then stop velocity
	if(this.player.position.x<=0	&& this.player.velocity.x<0)
	{
		this.player.velocity.x =0;
		this.player.velocity.y =0;
		return;
	}
	if(this.player.position.x>=this.map.cols && this.player.velocity.x>0)
	{
		this.player.velocity.x =0;
		this.player.velocity.y =0;
		return;
	}
	
	//check to see if we landed on a friendly player that is moving
	//if so then lets ride it
	var onFriendlyEnemy = this.playerOnEnemy();
	if(onFriendlyEnemy && onFriendlyEnemy.damageInflicted==0)
	{
		//adjust the player velocity to the gamePiece velocity
		var velocityXMod  = onFriendlyEnemy.velocity.x<0?-1*this.velocityModifer:this.velocityModifer;
		var velocityYMod  = 0;
		this.player.velocity.x = onFriendlyEnemy.velocity.x + velocityXMod;
		this.player.velocity.y = onFriendlyEnemy.velocity.y + velocityYMod;
	}else
	{
		this.player.velocity.x =0;
		this.player.velocity.y=0;
	}
	this.player.position.x += this.player.velocity.x;
	this.player.position.y += this.player.velocity.y;
};

/*
* @returns void
*	@description 
*		player touched a violent enemy or passed the level
*		reset them back to the beginning
*		called by: GameLevel.updatePlayer() 
*							 GameLevel.resetGame()
*/
GameLevel.prototype.resetPlayer = function()
{
	if(this.player.lives == 0)
	{
		this.player.lives = 5;
		this.player.points = 0;
	}
	this.player.velocity.x = 0;
	this.player.velocity.y = 0;
	this.player.position.x = 3;
	this.player.position.y = 5;
};

/*
* @returns void
*	@description 
*		If the player expends all of their lives the game is reset
*		vehicles are de-accelerated to their initial velocity
*		the default number of lives are restored
*		the level index is set to the beginning
*		called by: GameLevel.updatePlayer() 
*/
GameLevel.prototype.resetGame = function()
{
	this.velocityModifer =0;
	this.resetPlayer();
	this.levelIx = -1;
	this.velocityModifer = -cLEVEL_UP;
	this.loadNextLevel();
};

/*
* @returns void
*	@description 
*		Loads the next level
*		called by: GameLevel.updatePlayer() 
*		called by: GameLevel.resetGame()
*/
GameLevel.prototype.loadNextLevel = function()
{
	this.levelIx++;// = (this.levelIx+1) % AllLevels.length;
	var nextLevel  = (this.levelIx+1) % AllLevels.length;
	// ******************
	var level = AllLevels[nextLevel];
	
	this.map.cols = level.cols;
	this.map.rows = level.rows;
	this.map.nodeHeight = level.nodeHeight;
	this.map.nodeWidth = level.nodeWidth;
	this.map.nodes = [];

	//copies the next map 
	var length =level.nodes.length;
	for(var nodeIndex=0; nodeIndex<length; nodeIndex++)
	{
		var node = level.nodes[nodeIndex];
		if(node)
			this.map.nodes[nodeIndex] = node.clone();
	}
	
	//copy Enemies
	this.enemies = [];
	length = level.enemies.length;
	for(var enemyIndex =0; enemyIndex<length;enemyIndex++)
	{
		var enemy = level.enemies[enemyIndex];
		if(enemy)
		{
			this.enemies[enemyIndex] = enemy.clone();
			this.enemies[enemyIndex].position.x += Math.random()*enemyIndex;
		}
	}
	
	//copy rewards
	this.rewards =[];
	length = level.rewards.length;
	for(var rewardIndex =0;rewardIndex< length; rewardIndex++)
	{
		var reward = level.rewards[rewardIndex];
		if(reward)
			this.rewards[rewardIndex] = reward.clone();
	}
	
	//accelerate the vehicles
	this.velocityModifer += cLEVEL_UP;
	this.resetPlayer();
}

/*
* @returns void
*	@description 
*		this updates the player as the game proceeds
*		this functions checks to see if the player
*		<ul><li>is safe or died
*		<li>caught a reward
*		<li>Completed the level
*		<li>died to many times and thus reset the game
*		</ul>
*		called by: GameLevel.update() 
*/
GameLevel.prototype.updatePlayer = function()
{
	//move the player through the world
	this.updatePlayerVelocity();
	
	//check to see if the player landed on an enemy or unsafe square
	if(!this.isPlayerSafe())
	{	
		//player landed on unsafe spot
		this.player.lives--;
		if(this.player.lives>0)
			this.resetPlayer();
	}

	//check to see if player caught a reward
	var reward = this.playerOnReward();
	if(reward)
	{
		//assign that rewards points
		this.player.lives += reward.livesAwarded;
		this.player.points += reward.pointsAwarded;
		
		//rest the reward so it will be hidden and moved
		reward.lastDisplayed = 0;
	}
	
	//we ran out of lives start the game over
	if(this.player.lives<=0)
		this.resetGame();
	
	//we reached the other side load the next level
	if(this.player.position.y ==0)
		this.loadNextLevel();

};

/*
* @returns void
*	@description 
*		when the canvas/window/browser is resized
*		this will adjust the node size so the game will always fit on the screen
*		available screen size
*		called by: Frogger.resize() 
*/
GameLevel.prototype.setNodeSize = function()
{
	//clip the map area so we have room for tool bars
	//and statistics like lives, points, current level
	this.windowSize = new Point(this.context.canvas.width*cCLIP_PERCENTAGE,
														  this.context.canvas.height*cCLIP_PERCENTAGE);

 //figure out the maximum node size for each map square 
	//adjusted to size of window
	this.nodeSize.x = Math.min(this.nodeRatio.x * this.windowSize.x /this.map.cols,
														 this.nodeRatio.y * this.windowSize.y / this.map.cols);

	//ensure we don't exceed max node width
	this.nodeSize.x = Math.min(this.nodeSize.x,this.maxNodeSize.x); 
	this.nodeSize.y = this.nodeRatio.y *this.nodeSize.x;
};

/*
* @returns void
*	@description 
*		when the user has pressed the arrow keys
*		move the players position accordingly
*		called by: Frogger.handleKeyPress() 
*/
GameLevel.prototype.handleKeyPress = function(userInput)//input.js
{
	var player = this.player;
	var verticalIncr =0;
	var horizontalIncr = 0;
	
	//figure out what keys were pressed
	if(userInput.pressedKeys[userInput.DOWN])
		verticalIncr++;
	if(userInput.pressedKeys[userInput.UP])
		verticalIncr--;
	if(userInput.pressedKeys[userInput.RIGHT])
		horizontalIncr++;
	if(userInput.pressedKeys[userInput.LEFT])
		horizontalIncr--;

	if(verticalIncr!=0 || horizontalIncr!=0)
	{
		//ensure that the user cannot move off of the map
		if((horizontalIncr + player.position.x)<0)
			horizontalIncr = 0;
		if((horizontalIncr + player.position.x)>this.map.cols)
			horizontalIncr = 0;
			
		if((verticalIncr + player.position.y)<0)
			verticalIncr = 0;
		if((verticalIncr + player.position.y)>this.map.rows)
			verticalIncr = 0;		
	
		//adjust the player to the requested position
		player.position.y += verticalIncr;
		player.position.x += horizontalIncr;
	}
		
};