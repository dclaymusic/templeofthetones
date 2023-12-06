function drawTextBar()
{
    //draw the most recent player stats
	ctx.font = "8px Gameboy";
	ctx.fillStyle = "#faf5df";
	ctx.textAlign = "right";
    ctx.fillText("R:" + round, tileW*9.75, tileH*0.5);
	ctx.fillText("L:" + level, tileW*9.75, tileH*8.75);
}

function drawTitle()
{
    ctx.drawImage(bgTitle, 0, 0);
    //draw the most recent player stats

    if(bgbuff != null)
	{ canMove = true;
        ctx.font = "16px Gameboy";
        ctx.fillStyle = "#faf5df";
        ctx.textAlign = "left";
        ctx.fillText(".         .", tileW*2.1, tileH*arrowY); 
    }
    else { canMove = false; }
    //draw the most recent player stats
	// ctx.font = "8px Gameboy";
	// ctx.fillStyle = "#faf5df";
	// ctx.textAlign = "center";
    // ctx.fillText("Temple of the Tones", tileW*5, tileH*2);
    // ctx.fillText("Use 'WASD' to move,", tileW*5, tileH*6);
    // ctx.fillText("Use 'SPACE' to", tileW*5, tileH*6.75);
    // ctx.fillText("activate tiles.", tileW*5, tileH*7.5);
    // ctx.fillText("Sound on!", tileW*5, tileH*8.25);
}

function drawEndTitle()
{
    ctx.drawImage(endTitle, 0, 0);
    //draw the most recent player stats
	ctx.font = "8px Gameboy";
	ctx.fillStyle = "#faf5df";
	ctx.textAlign = "center";
	ctx.fillText("Rounds: " + round, tileW*5, tileH*7);
    ctx.fillText("Time: " + endTime, tileW*5, tileH*7.75);
    //draw the most recent player stats
	// ctx.font = "8px Gameboy";
	// ctx.fillStyle = "#faf5df";
	// ctx.textAlign = "center";
    // ctx.fillText("Temple of the Tones", tileW*5, tileH*2);
    // ctx.fillText("Use 'WASD' to move,", tileW*5, tileH*6);
    // ctx.fillText("Use 'SPACE' to", tileW*5, tileH*6.75);
    // ctx.fillText("activate tiles.", tileW*5, tileH*7.5);
    // ctx.fillText("Sound on!", tileW*5, tileH*8.25);

}

function drawIcon(thisItemType, xPos, yPos)
{
        //draw character
        var tile = itemTypes[thisItemType];
        ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
            xPos, yPos,
            tile.sprite[0].w * 0.5, tile.sprite[0].h * 0.5);
}


function updateArrow()
{
    loadSnd(18);playSnd(18);
    menuTick++;
    if(menuTick%2 == 0) { 
        arrowY = 7;
        isChallengeMode = true;
    }
    else { 
        arrowY = 7.9;
        isChallengeMode = false;
    }
}