// Point.js
// input.js
// allLevels.js
// frogger.js


var GameLevel = function( levelIndex,
													context
													)
{
console.log("gameLevel constructor");
	//create a copy of the level,maps and all elements
	this.map={};
	this.levelIx =levelIndex; 
	this.init();
	
	//this is the drawing context
	this.context = context;
	this.lastUpdate = 0;
	
	//reset the node size, map layout
  //to fit the canvas (so we don't overflow)
	this.sizeToWindow();
};

GameLevel.prototype.init = function()
{
	var level = AllLevels[this.levelIx];
	
	this.map.cols = level.cols;
	this.map.rows = level.rows;
	this.map.nodeHeight = level.nodeHeight;
	this.map.nodeWidth = level.nodeWidth;
		
		//copy map 
	this.map.nodes =  [];
	for(nodeIndex in level.nodes)
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
	for(enemyIndex in level.enemies)
	{
		var enemy = level.enemies[enemyIndex];
		if(enemy)
		{
			this.enemies[enemyIndex] = enemy.clone();
		}
	}
	
	//copy rewards
	this.rewards =[];
	for(rewardIndex in level.rewards)
	{
		var reward = level.rewards[rewardIndex];
		if(reward)
			this.rewards[rewardIndex] = reward.clone();
	}
	
	this.player = level.player.clone();
}


GameLevel.prototype.update = function()
{
	//update velocities
	//trigger events
	this.updateEnemies();
};

GameLevel.prototype.draw = function()
{
	this.drawMap();
	this.drawEnemies();
	this.drawRewards();
	this.drawToolBar();
	this.drawPlayer();
};

//this function draws the map onto the canvas
//called by: GameLevel.draw()
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
			this.context.drawImage(GameAssets[node.imageIndex].img,x,y);
			row = row+1;
			x = x + this.nodeSize.x;
			ix = ix +1;
		}
		col = col+1;
		y = y + this.nodeSize.y;
	}
};



GameLevel.prototype.calcRow = function(row,nodeY)
{
	return  (row ) * nodeY;
}

GameLevel.prototype.calcCol = function(col,nodeY)
{
	return  (col) * nodeY;
}

//draw the Enemies
//
GameLevel.prototype.drawEnemies = function()
{
	for(enemyIx in this.enemies)
	{
		var enemy = this.enemies[enemyIx];
		if(enemy)
		{
			var row = this.calcRow(enemy.position.y, this.nodeSize.y);//(enemy.position.y +0.5) * this.nodeSize.y;
			var enemyImageIndex = enemy.imageIndex;
			this.context.drawImage(GameAssets[enemyImageIndex].img,
											enemy.position.x, row,
											this.nodeSize.x,this.nodeSize.y);
		}
	}
};

//draw the Rewards
//
GameLevel.prototype.drawRewards = function()
{

};

GameLevel.prototype.drawPlayer = function()
{

	var player = this.player.sprite;
	var imageIndex = player.imageIndex;
	this.context.drawImage(GameAssets[imageIndex].img,
											this.calcCol(player.position.x,this.nodeSize.x),
											this.calcRow(player.position.y,this.nodeSize.y),
											this.nodeSize.x,this.nodeSize.y);

};

GameLevel.prototype.drawToolBar = function()
{
	var borderRight = this.nodeSize.x * (this.map.cols + 1);
	var borderBottom = this.nodeSize.y * (this.map.rows +1);
	
	this.context.drawImage(GameAssets.BORDER.img,
											borderRight,
											0,
											this.context.canvas.width ,this.context.canvas.height );
	this.context.drawImage(GameAssets.BORDER.img,
											0,
											borderBottom,
											this.context.canvas.width ,this.context.canvas.height);
};



GameLevel.prototype.updateEnemies = function(deltaTime)
{
	for(enemyIx in this.enemies)
	{
		var enemy = this.enemies[enemyIx];
		if(enemy)
			enemy.position.add(enemy.velocity.x, enemy.velocity.y);
		
		var mapMax = (this.nodeSize.x * ( this.map.cols +1.5));
		var mapMin = -this.nodeSize.x ;
		
		if(enemy.position.x> mapMax)
			enemy.position.x = mapMin;
		if(	enemy.position.x < mapMin)
			enemy.position.x = mapMax;
	}
};



GameLevel.prototype.setNodeSize = function()
{
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


//take the x,y
GameLevel.prototype.resetGamePiecesToWindow = function()
{
	for(enemyIx in this.enemies)
	{
		var enemy = this.enemies[enemyIx];
		if(enemy)
		{
			enemy.position.x = (enemy.position.x % this.windowSize.x);
		}
	}
	
	for(rewardIx in this.rewards)
	{
		var reward = this.rewards[enemyIx];
		if(reward)
		{
			reward.position.x = (reward.position.x % this.windowSize.x);
		}
	}
	
};


GameLevel.prototype.sizeToWindow = function()
{
	//reset the map nodes
	this.setNodeSize();
	
	//reset the y positions for each enemy
	this.resetGamePiecesToWindow();
	
	//resize the toolbars
};


GameLevel.prototype.handleKeyPress = function(userInput)//input.js
{
	var player = this.player.sprite;
	var verticalIncr =0;
	var horizontalIncr = 0;
	
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
		if((horizontalIncr+player.position.x)<0)
			horizontalIncr = 0;
		if((horizontalIncr+player.position.x)>this.map.cols)
			horizontalIncr = 0;
			
		if((verticalIncr+player.position.y)<0)
			verticalIncr = 0;
		if((verticalIncr+player.position.y)>this.map.rows)
			verticalIncr = 0;		
	
		player.position.y +=verticalIncr;
		player.position.x +=horizontalIncr;
		this.player.state = State.JUMP;
		}
		
};