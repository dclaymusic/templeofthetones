window.addEventListener("keydown", function(e) {
    //add codes here
    // if(soundsLoaded && openingTitleTick) { 
    //     openingTitleTick = false; updateTitle(''); 
    //     playSnd(144); playBgSnd(151,'bglobby');
    //     startTime = Date.now();
    // }
    if(e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 83 || e.keyCode == 68 || e.keyCode == 32) { keyTick = true; }
    if(e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 83 || e.keyCode == 68 || e.keyCode == 32) { keysDown[e.keyCode] = true; }
    if(e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 83 || e.keyCode == 68 || e.keyCode == 32) { keysUp[e.keyCode] = false; }
    if(e.keyCode == 32)
    {
        spaceTick = true;
    }
});
window.addEventListener("keyup", function(e) {
    if(e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 83 || e.keyCode == 68 || e.keyCode == 32) { keyTick = false; }
    if(e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 83 || e.keyCode == 68 || e.keyCode == 32) { keysDown[e.keyCode] = false; }
    if(e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 83 || e.keyCode == 68 || e.keyCode == 32) { keysUp[e.keyCode] = true; }
    if(e.keyCode == 32 && spaceTick)
    {
        //INIT GAME FROM MENU
        if(level == 0) { 
            gameStartTick = true; 
            if(isChallengeMode)
            {
                level++;
                levelTick = true;
            }
            else
            {
                level = 8;
                levelTick = true; 
            }

        }


        else 
        {
            if(isChallengeMode)
            {
                    //CHALLENGE MODE PLAY
                let ind = playerX() - 2;

                if(thisTileIs() == 5) 
                {

                    for(let y = 0; y < mapH; y++)
                    {
                        if(gameMap[toIndex(playerX(),y)] == 7 || 
                            (gameMap[toIndex(playerX(),y)] >= 13 && gameMap[toIndex(playerX(),y)] <= 19)) { 
                            gameMap[toIndex(playerX(),y)] = 5;
                            problem[ind] = null;
                        }
                    }
                
                    //finding right sound to play
                    
                    for(let i = 0; i < rows.length; i++)
                    {
                        if(rows[i][0] == playerY()) 
                        { 
                            if(level != 6) { 
                                setPlayerTile(rows[i][1]+13); 
                                problem[ind] = rows[i][1];
                            }
                            else { 
                                setPlayerTile(7); 
                                problem[ind] = rows[i][1] + 2;
                            }
                            
                        }
                    }
                    if(level != 6) { loadSnd(problem[ind]); playSnd(problem[ind]); }
                    else{ loadSnd(problem[ind]); playSnd(problem[ind]); }
                
                }

                else if(thisTileIs() == 7 || (thisTileIs() >= 13 && thisTileIs() <= 19))
                {
                    setPlayerTile(5);
                    problem[ind] = null;
                    
                }
        
                if(thisTileIs() == 11 && !puzzleSolved)
                {
                    playSequence();
                }
                        
            }
            
            //if Free Play
            else 
            {
                    if(thisTileIs() == 5)
                    {
                        // for(let y = 0; y < mapH; y++)
                        // {
                        //     if(gameMap[toIndex(playerX(),y)] >= 13 && gameMap[toIndex(playerX(),y)] <= 19) { 
                        //         gameMap[toIndex(playerX(),y)] = 5;
                        //     }
                        // }

                        //finding right sound to play
                        if(playerY() > 0) { 
                            for(let i = 0; i < rows.length; i++)
                            {
                                if(gameMap[toIndex(playerX(),rows[i][0])] >= 13 &&
                                gameMap[toIndex(playerX(),rows[i][0])] <= 19)
                                {
                                    if(!isPlaying) { loadSnd(rows[i][1]); playSnd(rows[i][1]); }
                                }
                                if(rows[i][0] == playerY()) 
                                { 
                                    setPlayerTile(rows[i][1]+13);
                                    if(!isPlaying) { loadSnd(rows[i][1]); playSnd(rows[i][1]); }
                                }
                            }
                        }
                    }
                    else if((thisTileIs() >= 13 && thisTileIs() <= 19) || 
                            (thisTileIs() >= 33 && thisTileIs() <= 39))
                            {
                                setPlayerTile(5);
                            }
                    if(playerY() == 0 && playerX() > 0)
                    {
                        if(thisTileIs() == 49) { setPlayerTile(44); }
                        else { 
                            setPlayerTile(thisTileIs()+1);
                        }
                        if(thisTileIs() != 49)
                        {  loadSnd(thisTileIs()-37); playSnd(thisTileIs()-37);  }

                        
                        //CYCLE THRU TOTEMS
                    }
                    if(thisTileIs() == 40)
                    {
                        togglePlay();
                        swapTiles(40,41);

                    }
                    else if(thisTileIs() == 41)
                    {
                        togglePlay();
                        swapTiles(41,40);
                    }

                    if(thisTileIs() == 42) //erase
                    {
                        loadSnd(18); playSnd(18);
                        for(let y = 0; y < 8; y++)
                        {
                            for(let x = 1; x < mapW; x++)
                            {
                                if(y > 0) { gameMap[toIndex(x,y)] = 5; }
                                else { gameMap[toIndex(x,y)] = 32; }
                            }
                        }
                    }

                    if(thisTileIs() == 43) //shuffle
                    {
                        loadSnd(18); playSnd(18);
                        //clear tiles
                        for(let y = 0; y < 8; y++)
                        {
                            for(let x = 1; x < mapW; x++)
                            {
                                if(y > 0) { gameMap[toIndex(x,y)] = 5; }
                                else { 
                                    //add rhythms
                                    gameMap[toIndex(x,0)] = 49; 
                                    let r = randomInt(5);
                                    gameMap[toIndex(x,0)] = r + 44;
                                }
                            }
                        }


                        //finesse a little
                        for(let x = 1; x <= 9; x++)
                        {
                            let r = randomInt(7);
                            for(let i = 0; i < rows.length; i++)
                            {
                                if(rows[i][0] == r)
                                {
                                    setTileTo(x, rows[i][0], rows[i][1]+13);
                                }
                            }
                        }
             
                    }

                    if(thisTileIs() == 55)
                    {
                        setPlayerTile(56);
                        if(firstBg)
                        {
                            loadBg();
                            playBg();
                            firstBg = false;
                        }
                        else
                        {
                            bg.connect(audioCtx.destination);
                            loadSnd(18);playSnd(18);
                        }
                        
                    }
                    else if(thisTileIs() == 56)
                    {
                        setPlayerTile(55);
                        bg.disconnect();
                        loadSnd(18);playSnd(18);
                    }

            }
            


        }
       
    }
});



function highlightTiles(mod)
{
    for(let y = 1; y < 8; y++)
    {
        if(gameMap[toIndex(playerX() + mod + 1,y)] >= 13 && gameMap[toIndex(playerX() + mod + 1,y)] <= 19) { 
            gameMap[toIndex(playerX() + mod + 1,y)] += 20;
        }
        if(gameMap[toIndex(playerX() + mod,y)] >= 33 && gameMap[toIndex(playerX() + mod,y)] <= 39) { 
            gameMap[toIndex(playerX() + mod,y)] -= 20;
        } 

        if(gameMap[toIndex(playerX() + mod + 1,y)] == 7) 
        { gameMap[toIndex(playerX() + mod + 1,y)] = 8; }

        if(gameMap[toIndex(playerX() + mod,y)] == 8) 
        { gameMap[toIndex(playerX() + mod,y)] = 7; }

        if(gameMap[toIndex(playerX() + mod + 1,y)] >= 44 && gameMap[toIndex(playerX() + mod + 1,y)] <= 48) { 
            gameMap[toIndex(playerX() + mod + 1,y)] += 6;
        }
        if(gameMap[toIndex(playerX() + mod,y)] >= 44 && gameMap[toIndex(playerX() + mod,y)] <= 48) { 
            gameMap[toIndex(playerX() + mod,y)] -= 6;
        } 
    }

}




function playSequence()
{

    let timeout;
    timeout = 500;

    let playingSolution = false;

    let count = 0;
    for(let i = 0; i < solution.length; i++)
    {
        if(problem[i] == solution[i])
        { count++; }
    }

    if(playerY() <= 3) { playingSolution = true; }
    canMove = false;
    setPlayerTile(12);

    //sound 1
    setTileTo(playerX()+1,playerY(),10);
    if(!playingSolution) { 
        highlightTiles(0);
        if(problem[0] != null)
        {
           loadSnd(problem[0]); playSnd(problem[0]);
        } 
    }
    else {
        loadSnd(solution[0]); playSnd(solution[0]);
    }
    

        //sound 2
        setTimeout(() => {

            if(!playingSolution) { 
                highlightTiles(1);
                if(problem[1] != null)
                {
                    loadSnd(problem[1]); playSnd(problem[1]);
                } 
            }
            else {
                loadSnd(solution[1]); playSnd(solution[1]);
            }
            setTileTo(playerX()+2,playerY(),10);
            setTileTo(playerX()+1,playerY(),9);
    
            //sound 3
            setTimeout(() => {

                if(!playingSolution) { 
                    highlightTiles(2);
                    if(problem[2] != null)
                    {
                        loadSnd(problem[2]); playSnd(problem[2]);
                    } 
                }
                else {
                    loadSnd(solution[2]); playSnd(solution[2])
                }
                setTileTo(playerX()+3,playerY(),10);
                setTileTo(playerX()+2,playerY(),9);

                //sound 4
                setTimeout(() => {

                    if(!playingSolution) { 
                        highlightTiles(3);
                        if(problem[3] != null)
                        {
                            loadSnd(problem[3]); playSnd(problem[3]);
                        } 
                    }
                    else {
                        loadSnd(solution[3]); playSnd(solution[3]);
                    }
                    setTileTo(playerX()+4,playerY(),10);
                    setTileTo(playerX()+3,playerY(),9);
                    
                    //sound 5
                    setTimeout(() => {

                        if(!playingSolution) { 
                            highlightTiles(4); 
                            if(problem[4] != null)
                            {
                                loadSnd(problem[4]); playSnd(problem[4]);
                            } 
                        }
                        else {
                            loadSnd(solution[4]); playSnd(solution[4]);
                        }
                        setTileTo(playerX()+5,playerY(),10);
                        setTileTo(playerX()+4,playerY(),9);

                        //end
                        setTimeout(() => {

                            if(!playingSolution) { 
                                highlightTiles(5);
                                

                                //PROBLEM SOLVED
                                if(count == 5)
                                { 
                                    
                                    puzzleSolved = true;
                                    for(let y = 0; y < mapH; y++)
                                    {
                                        if(gameMap[toIndex(8,4)] == 3) { gameMap[toIndex(8,4)] = 4; }
                                    }
                                    if(level != 6) { 
                                        gameMap[toIndex(7,4)] = 2 ; 
                                        loadSnd(totemSounds[level-1]);
                                        playSnd(totemSounds[level-1]);
                                    }
                                    else {
                                        //final puzzle
                                        loadSnd(17); playSnd(17);
                                        gameMap[toIndex(8,1)] = 4;
                                        gameMap[toIndex(8,7)] = 4;
                                        for(let y = 2; y < 7; y++ )
                                        {
                                            gameMap[toIndex(7,y)] = 2;
                                        }
                                        // for(let i = 0; i < totemSounds.length; i++)
                                        // {
                                            
                                        //     setTimeout(() => {
                                        //         loadSnd(totemSounds[i]); playSnd(totemSounds[i]);
                                        //     }, i*100);
                                        // }
                                    }
                                    
                                    
                                }
                            }
                            setTileTo(playerX()+5,playerY(),9);
                            setPlayerTile(11);
                            canMove = true;
                        }, timeout);
                    }, timeout);
                }, timeout);
            }, timeout);
        }, timeout);
    //if Y <= 2 - play solution
    //else play problem
    
}

function togglePlay() {
	isPlaying = !isPlaying;
    loadSnd(18); playSnd(18);
	if(isPlaying)
	{
		metronomeInc = 0;
		timer = setInterval(metronome, 250);
	}
	else
	{
		metronomeInc = 0;
		for(let y = 0; y < 9; y++)
		{
            for(let x = 0; x < 10; x++)
            {
                if(gameMap[toIndex(x,y)] >= 33 && gameMap[toIndex(x,y)] <= 39)
                {
                    gameMap[toIndex(x,y)] -= 20;
                }
                if(gameMap[toIndex(x,y)] == 10)
                {
                    gameMap[toIndex(x,y)] = 9;
                }
                if(gameMap[toIndex(x,y)] >= 50 && gameMap[toIndex(x,y)] <= 54)
                {
                    gameMap[toIndex(x,y)] -= 6;
                }
            }
		}
		clearInterval(timer);
	}
}

function metronome()
{
	for(let y = 0; y < 9; y++)
	{
        //totems
        if(gameMap[toIndex(metronomeInc+1,y)] >= 44 && gameMap[toIndex(metronomeInc+1,y)] <= 48)
        {
            gameMap[toIndex(metronomeInc+1,y)] += 6;
            loadSnd(gameMap[toIndex(metronomeInc+1,y)]-43); playSnd(gameMap[toIndex(metronomeInc+1,y)]-43);
        }
        if(gameMap[toIndex(metronomeInc,y)] >= 50 && gameMap[toIndex(metronomeInc,y)] <= 54)
        {
            gameMap[toIndex(metronomeInc,y)] -= 6;
        }
        if(metronomeInc == 0 && (gameMap[toIndex(9,y)] >= 50 && gameMap[toIndex(9,y)] <= 54)) 
        { 
            gameMap[toIndex(9,y)] -= 6;
        }



        if(gameMap[toIndex(metronomeInc+1,y)] >= 13 && gameMap[toIndex(metronomeInc+1,y)] <= 19)
        {
            loadSnd(gameMap[toIndex(metronomeInc+1,y)]-13); playSnd(gameMap[toIndex(metronomeInc+1,y)]-13); 
            gameMap[toIndex(metronomeInc+1,y)] += 20;
        }
        if(gameMap[toIndex(metronomeInc+1,y)] == 9)
        {
            gameMap[toIndex(metronomeInc+1,y)] = 10;
        }

        if(metronomeInc == 0 && (gameMap[toIndex(9,y)] >= 33 && gameMap[toIndex(9,y)] <= 39)) 
        { 
            gameMap[toIndex(9,y)] -= 20;
        }
        else if(metronomeInc == 0 && gameMap[toIndex(9,y)] == 10)
        {
            gameMap[toIndex(9,y)] = 9;
        }
        else {
            if(gameMap[toIndex(metronomeInc,y)] >= 33 && gameMap[toIndex(metronomeInc,y)] <= 39)
            {
                gameMap[toIndex(metronomeInc,y)] -= 20;
            }
            if(gameMap[toIndex(metronomeInc,y)] == 10)
            {
                gameMap[toIndex(metronomeInc,y)] = 9;
            }
        }

    }
	metronomeInc = ((metronomeInc + 1) % 9);
	// if(metronomeInc == songImages.length)
	// {
	// 	setTimeout(togglePlay, tempo);
	// }
}