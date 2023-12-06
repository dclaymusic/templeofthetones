function drawLevel()
{
	//resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	const levelW = 10;
	const levelH = 9;
	mapW = levelW;
	mapH = levelH;



	if(level == 6) { shuffleTotems(); }

	puzzleSolved = false;

	problem = [null,null,null,null,null];

	var levelItemMap = [];
	var levelGameMap = [];
	rows = [];

	if(level < 1)
	{
		levelGameMap = [
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1
		];
	}
	else if(level >= 1 && level <= 2)
	{
		if(level == 1 && firstRound) { 
			firstRound = false;
			startTime = Date.now();
			loadBg();
			playBg();
			loadSnd(17); playSnd(17);
		}
		ascendingPick(3);

		rows = [[3,sortedPitches[2]],[4,sortedPitches[1]],[5,sortedPitches[0]]];
		levelGameMap = [
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,11,9,9,9,9,9,1,1,1,
			1,2,5,5,5,5,5,1,1,1,
			1,2,5,5,5,5,5,totems[level-1],3,1,
			1,2,5,5,5,5,5,1,1,1,
			1,11,9,9,9,9,9,1,1,1,
			1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1
		];
	}
	else if(level <= 4)
	{
		ascendingPick(5);
		rows = [[2,sortedPitches[4]],[3,sortedPitches[3]],[4,sortedPitches[2]],[5,sortedPitches[1]],[6,sortedPitches[0]]];
		levelGameMap = [
			1,1,1,1,1,1,1,1,1,1,
			1,11,9,9,9,9,9,1,1,1,
			1,2,5,5,5,5,5,1,1,1,
			1,2,5,5,5,5,5,1,1,1,
			1,2,5,5,5,5,5,totems[level-1],3,1,
			1,2,5,5,5,5,5,1,1,1,
			1,2,5,5,5,5,5,1,1,1,
			1,11,9,9,9,9,9,1,1,1,
			1,1,1,1,1,1,1,1,1,1
		];
	}
	else if(level == 5)
	{
		ascendingPick(7);
		rows = [[1,sortedPitches[6]], [2,sortedPitches[5]],[3,sortedPitches[4]],[4,sortedPitches[3]],[5,sortedPitches[2]],
				[6,sortedPitches[1]],[7,sortedPitches[0]]];
		levelGameMap = [
			1,11,9,9,9,9,9,1,1,1,
			1,2,5,5,5,5,5,1,1,1,
			1,2,5,5,5,5,5,1,1,1,
			1,2,5,5,5,5,5,1,1,1,
			1,2,5,5,5,5,5,totems[level-1],3,1,
			1,2,5,5,5,5,5,1,1,1,
			1,2,5,5,5,5,5,1,1,1,
			1,2,5,5,5,5,5,1,1,1,
			1,11,9,9,9,9,9,1,1,1,
		];
	}
	else if(level == 6)
	{

		let mix = shuffleArray([0,1,2,3,4]);
		
		ascendingPick(5);
		

		rows = [[2,totems[mix[0]]-11], [3,totems[mix[1]]-11],
			[4,totems[mix[2]]-11],[5,totems[mix[3]]-11],[6,totems[mix[4]]-11]];
	
		levelGameMap = [
			1,1,1,1,1,1,1,1,1,1,
			1,11,9,9,9,9,9,1,3,1,
			1,2,5,5,5,5,5,totems[mix[0]],2,1,
			1,2,5,5,5,5,5,totems[mix[1]],2,1,
			1,2,5,5,5,5,5,totems[mix[2]],2,1,
			1,2,5,5,5,5,5,totems[mix[3]],2,1,
			1,2,5,5,5,5,5,totems[mix[4]],2,1,
			1,11,9,9,9,9,9,1,3,1,
			1,1,1,1,1,1,1,1,1,1,
		];
	}
	else if(level == 8)
	{
		rows = [[1,6],[2,5],[3,4],[4,3],[5,2],[6,1],[7,0]];
		levelGameMap = [
		40,49,49,49,49,49,49,49,49,49,
		2,5,5,5,5,5,5,5,5,5,
		2,5,5,5,5,5,5,5,5,5,
		42,5,5,5,5,5,5,5,5,5,
		55,5,5,5,5,5,5,5,5,5,
		43,5,5,5,5,5,5,5,5,5,
		2,5,5,5,5,5,5,5,5,5,
		2,5,5,5,5,5,5,5,5,5,
		40,9,9,9,9,9,9,9,9,9];
	}



	for(let i = 0; i < levelGameMap.length; i++)
	{ itemMap[i] = 0;}


	gameMap = levelGameMap;
	// itemMap = levelItemMap;

	solutionSequence = []

	var starting_pos = [];
	if(level == 0) { starting_pos = [2,4] }
	else { starting_pos = [1,4]; }
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

	levelTick = false;

	if(level == 0) { canMove = false; }
	else { canMove = true; }

}

function drawLevelTiles(currentFrameTime, currentSecond)
{
	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
			//draw gameMap
			var tile = tileTypes[gameMap[toIndex(x,y)]];
			ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				x*tileW, y*tileH, tileW, tileH);

			//to draw more complex shapes, move the "itemMap" draw below to it's own independent x/y for loop
			
			//draw itemMap
			// if (itemMap[toIndex(x,y)] != 0)
			// {
			// 	var item = itemTypes[itemMap[toIndex(x,y)]];
			// 	ctx.drawImage(tileset, item.sprite[0].x, item.sprite[0].y, item.sprite[0].w, item.sprite[0].h,
			// 	x*tileW, y*tileH, item.sprite[0].w, item.sprite[0].h);
			// }
		}
	}

	//draw character
	if(level != 0 && !gameEnd)
	{
		var sprite = player.sprites[player.direction];
		ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
			player.position[0], player.position[1],
			player.dimensions[0], player.dimensions[1])
	}

	if(level == 0) { 
		drawTitle();
	}
	else if(level <= 6 && !gameEnd) {
		drawTextBar();
	}

	if(gameEnd)
	{
		drawEndTitle();
	}

}

function processLevelTiles(tick)
{
	if(tick)
	{
		loadSnd(18); playSnd(18);
		//totems
		if(thisTileIs() >= 21 && thisTileIs() <= 25)
		{
			setPlayerTile(26);
			gameMap[toIndex(8,0)] = 4;
		}
		if(thisTileIs() == 4)
		{
			//new level


			if(level == 6 && playerY() == 1)
			{
				loadSnd(19); playSnd(19);
				level = 1;
				round++;
				levelTick=true;
			}

			//end of game
			else if(level == 6 && playerY() == 7)
			{
				bg.disconnect();
				loadSnd(19); playSnd(19);
				gameEnd = true;
				canMove = false;
				for(let i = 0; i < gameMap.length; i++)
				{ gameMap[i] = 1; }
				endTime = toHMS((Date.now() - startTime)/1000);
			}
			else {
				loadSnd(17); playSnd(17);
				level++;
				levelTick = true;
			}
		}
	}
}

function ascendingPick(number)
{
	solution = [];
	pitches = [];
	newPitches = [];
	sortedPitches = [];

	if(level != 6)
	{
		pitches = shuffleArray([0,1,2,3,4,5,6]);

	}
	else{
		pitches = shuffleArray([12,13,14,15,16]);
	}
	//ascending array of pitches of a given number
	newPitches = pitches.splice(0,number);

	//arranges a solution 5 sounds long
	for(let i = 0; i < 5; i++)
	{
		//original random shuffled array
		if(i >= newPitches.length)
		{ solution.push(newPitches[randomInt(newPitches.length-1)]); }
		else
		{ solution.push(newPitches[i]); }
	}	

	//sorts pitch choices for solfege display
	sortedPitches = newPitches.sort();


	
	
}

function shuffleTotems()
{
	let mixed = shuffleArray([0,1,2,3,4])

	solution = [allSolutions[mixed[0]],allSolutions[mixed[1]],allSolutions[mixed[2]],allSolutions[mixed[3]],allSolutions[mixed[4]]];
}