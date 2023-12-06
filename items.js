function pickUpItem(itemToFind)
{
    if(itemMap[toIndex(playerX(), playerY())] == itemToFind)  
	{
            //specific item effects
            if(thisItemIs() == 2) { updateTextBar("You got a key!"); hasCastle1Key = true; }
            if(thisItemIs() == 3) { updateTextBar("You picked up a peculiar fruit."); hasApple = true; }
            if(thisItemIs() == 4) { updateTextBar("You got 20 gold pieces!"); gold += 20; }
            if(thisItemIs() == 5) { updateTextBar("You got 5 gold pieces!"); gold += 5; }
		
        //then get rid of it
        itemMap[toIndex(playerX(), playerY())] = 0;
	}



}

function switchTile(tileToFind, tileToChange)
{
    if(gameMap[toIndex(playerX(), playerY())] == tileToFind)
	{
        if(gameMap[toIndex(playerX(), playerY())] == 8)
         { setTileTo(2,16,10); updateTextBar("You hear a mysterious click in a nearby hall.")}
		gameMap[toIndex(playerX(), playerY())] = tileToChange;
	}
}

function switchItem(itemToFind, itemToChange)
{
    if(itemMap[toIndex(playerX(), playerY())] == itemToFind)
	{
            //specific item effects
            // if(itemMap[toIndex(playerX(), playerY())] == 8)
            // { itemMap[toIndex(2,16)] = 10; }

		itemMap[toIndex(playerX(), playerY())] = itemToChange;
	}
}


