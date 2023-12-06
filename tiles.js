function clearActiveChoice(min, max) {
    for(let i = 0; i < itemMap.length; i++)
    {
        if(itemMap[i] >= min && itemMap[i] <= max)
        {
            itemMap[i] -= 8;
        }
    }
}


//getting tile information related to player
function thisTileIs() 
{ return gameMap[toIndex(player.position[0]/tileW,player.position[1]/tileH)]; }

function thisItemIs()
{ return itemMap[toIndex(player.position[0]/tileW,player.position[1]/tileH)]; }

function setPlayerTile(tile)
{ return gameMap[toIndex(player.position[0]/tileW,player.position[1]/tileH)] = tile; }

function setPlayerItem(tile)
{ return itemMap[toIndex(player.position[0]/tileW,player.position[1]/tileH)] = tile; }

function setTileTo(x,y,tile)
{ return gameMap[toIndex(x,y)] = tile; }

function setItemTo(x,y,tile)
{ return itemMap[toIndex(x,y)] = tile; }

function playerX()
{ return player.position[0]/tileW; }

function playerY()
{ return player.position[1]/tileH }

function playerXY()
{ return [player.position[0]/tileW, player.position[1]/tileH] }

function movePlayer(startX,startY,endX,endY,isReversible)
{
    if(playerX() == startX && playerY() == startY)
    {
        player.position[0] = endX;
        player.position[1] = endY;
        player.placeAt(player.position[0], player.position[1]);
    }
    else if(playerX() == endX && playerY() == endY && isReversible == true)
    {
        player.position[0] = startX;
        player.position[1] = startY;
        player.placeAt(player.position[0], player.position[1]);
    }
}

function upperLeftTileIs(x,y,tile)
{
    if(gameMap[toIndex(x-1,y-1)] == tile)
    { return true }
    else { return false }
}

function upperTileIs(x,y,tile)
{
    if(gameMap[toIndex(x,y-1)] == tile)
    { return true }
    else { return false }
}


function upperRightTileIs(x,y,tile)
{
    if(gameMap[toIndex(x+1,y-1)] == tile)
    { return true }
    else { return false }
}


function leftTileIs(x,y,tile)
{
    if(gameMap[toIndex(x-1,y)] == tile)
    { return true }
    else { return false }
}


function rightTileIs(x,y,tile)
{
    if(gameMap[toIndex(x+1,y)] == tile)
    { return true }
    else { return false }
}

function lowerLeftTileIs(x,y,tile)
{
    if(gameMap[toIndex(x-1,y+1)] == tile)
    { return true }
    else { return false }
}

function lowerTileIs(x,y,tile)
{
    if(gameMap[toIndex(x,y+1)] == tile)
    { return true }
    else { return false }
}


function lowerRightTileIs(x,y,tile)
{
    if(gameMap[toIndex(x+1,y+1)] == tile)
    { return true }
    else { return false }
}

function toIndex(x, y)
{
	return((y * mapW) + x);
}

function fromIndex(m)
{
	x = m % mapW;
	y = (m - (m % mapW)) / mapH;
	return([x, y]);
}

function randomInt(max)
{
	rand_val = Math.floor(Math.random() * Math.floor(max + 1))
	return rand_val;
}

function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function chooseFromArray(array) {
    return array[randomInt(array.length-1)];
  }

  function swapTiles(tile1, tile2) {
    for(let x = 0; x < mapW; x++)
    {
        for(let y=0; y<mapH; y++)
        {
            if(gameMap[toIndex(x,y)] == tile1)
            {
                gameMap[toIndex(x,y)] = tile2;
            }
        }
    }
  }

  function swapItems(tile1, tile2) {
    for(let x = 0; x < mapW; x++)
    {
        for(let y=0; y<mapH; y++)
        {
            if(itemMap[toIndex(x,y)] == tile1)
            {
                itemMap[toIndex(x,y)] = tile2;
            }
        }
    }
  }