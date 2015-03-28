(function () {
    if (typeof Snake === 'undefined') {
        Snake = {};
    }
    Snake.extend({
	clearBoard: function (){
		Snake.context.save();
		Snake.context.fillStyle = "white";
		Snake.context.fillRect(0,0, Snake.canvas.width, Snake.canvas.height);
		Snake.context.restore();
	},
	
	displayMainMenu: function (){
		Snake.clearBoard();
		Snake.context.font = "20px Times New Roman";
		Snake.context.fillText("Welcom to Snake!",Snake.textshow[0]-65, 30)
		Snake.context.font = "25px Impact";
		Snake.context.fillText("NORMAL", Snake.textshow[0]-37.5, 60);
		Snake.context.fillText("CUSTOM", Snake.textshow[0]-37.5, 90);
		Snake.context.fillText("MULTI", Snake.textshow[0]-37.5, 120);
		Snake.context.fillText("HELP", Snake.textshow[0]-37.5, 150);
		Snake.context.fillText("press enter to continue", Snake.textshow[0]-125, 210);
		Snake.context.drawImage(Snake.head1, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25);
	},
	
	displayMultiMenu: function (){
		Snake.clearBoard();
		Snake.context.font = "20px Times New Roman";
		Snake.context.fillText("choose playing style",Snake.textshow[0]-85, 30)
		Snake.context.font = "25px Impact";
		Snake.context.drawImage(Snake.multipx1, Snake.textshow[0]-50, 40)
		Snake.context.drawImage(Snake.multipx2, Snake.textshow[0]-50, 90)
		Snake.context.drawImage(Snake.multipx3, Snake.textshow[0]-50, 140)
		Snake.context.drawImage(Snake.multipx4, Snake.textshow[0], 40)
		Snake.context.drawImage(Snake.multipx5, Snake.textshow[0], 90)
		Snake.context.drawImage(Snake.multipx6, Snake.textshow[0], 140)
		Snake.context.fillText("press enter to continue", Snake.textshow[0]-125, 210);
		Snake.context.fillText("press escape to go back", Snake.textshow[0]-125, 240);
		Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
	},
	
	displayChooseDiffs: function (snk){
		Snake.clearBoard();
		Snake.context.font = "20px Times New Roman";
		Snake.context.fillText("choose difficulty for computer "+snk,Snake.textshow[0]-125, 30)
		Snake.context.font = "25px Impact";
		Snake.context.fillText("EASY", Snake.textshow[0]-37.5, 60);
		Snake.context.fillText("MEDIUM", Snake.textshow[0]-37.5, 90);
		Snake.context.fillText("HARD", Snake.textshow[0]-37.5, 120);
		Snake.context.fillText("press enter to continue", Snake.textshow[0]-125, 180);
		Snake.context.fillText("press escape to go back", Snake.textshow[0]-125, 210);
		Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
	},
	
	displayHelp: function (){
		Snake.clearBoard();
		Snake.context.font = "20px Impact"
		Snake.context.fillText("use the arrow keys to move", 1, 30)
		Snake.context.fillText("player two uses (w a s d) to move", 1, 60)
		Snake.context.fillText("to speed up and down use + and -", 1, 120)
		Snake.context.fillText("to pause use the enter button", 1, 150)
		Snake.context.fillText("press the down key to continue",Snake.textshow[0]-120, 210)
	},
	
	displayDemoWords: function (){
		Snake.context.font = "25px Impact";
		Snake.context.fillStyle = "white"
		Snake.context.fillText("PRESS ENTER",Snake.textshow[0]-62.5, Snake.textshow[1]-20);
		Snake.context.fillStyle = 'black'
		Snake.context.fillText("PRESS ENTER",Snake.textshow[0]-62.5, Snake.textshow[1]-20);
	},
	
	displayScore: function (){
		Snake.context.save();
		Snake.context.lineWidth = 50;
		Snake.context.strokeStyle = "white";
		
		Snake.context.beginPath();
		Snake.context.moveTo(0,9);
		Snake.context.lineTo(Snake.canvas.width, 9);
		Snake.context.stroke();
		
		Snake.context.restore();
		Snake.context.font = "20px Times New Roman";
		if(Snake.human == 1){
			Snake.context.fillText("apples " + Snake.applecounts[0], 0, 30);
			Snake.context.fillText("score " + Snake.scores[0], Snake.canvas.width-100, 30);
		}
		if (Snake.human == 2){
			Snake.context.fillText("P1 apples " + Snake.applecounts[0], 0, 15);
			Snake.context.fillText("score " + Snake.scores[0], Snake.canvas.width-100, 15);
			Snake.context.fillText("P2 apples " + Snake.applecounts[1], 0, 30);
			Snake.context.fillText("score " + Snake.scores[1], Snake.canvas.width-100, 30);
		}
	},
	
	displayPause: function (){
		Snake.context.font = "20px Impact"
		Snake.context.fillText("PAUSED",Snake.textshow[0]-30, Snake.textshow[1]-20);
	},
	
	displayGameOver: function (){
		Snake.clearBoard();
		Snake.displayScore();
		Snake.context.font = "30px Impact";
		Snake.context.fillText("GAME OVER",Snake.textshow[0]-60, Snake.textshow[1]);
	},
	
	displayCoverSnake: function (){
		while(Snake.snkold.length > 0){
			var cov = Snake.snkold[0]
			var loc = Snake.boardLocation(cov[0],cov[1]);
			Snake.context.save();
			Snake.context.translate(1, 41);
			Snake.context.drawImage(Snake.blank, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
			Snake.snkold.splice(0,1);
			Snake.context.restore();
		}
	},
	
	displaySnakeColor: function (loc){
		Snake.context.save();
		Snake.context.lineWidth = Snake.imagesize;
		Snake.context.beginPath();
		Snake.context.strokeStyle = Snake.snakecolor;
		Snake.context.moveTo(loc[0], loc[1]+Snake.imagesize/2);
		Snake.context.lineTo(loc[2], loc[3]+Snake.imagesize/2)
		Snake.context.stroke();
		Snake.context.restore();
	},
	
	displayMultiScores: function (){
		Snake.clearBoard();
					 
		Snake.context.font = "30px Impact";
		Snake.context.fillText("RESULTS", Snake.textshow[0]-50, 25);
		
		Snake.context.beginPath();
		Snake.context.moveTo(0, 27);
		Snake.context.lineTo(Snake.canvas.width, 27);
		Snake.context.stroke();
		
		Snake.context.save();
		Snake.context.font = "20px Times New Roman";
		Snake.context.translate(1, 30);
		
		var prtpos = 0;
		var mdict = Snake.orderMultiScores()
		for (var inc=0; inc<Snake.players*2; inc+=2){
			prtpos += 20
			Snake.context.fillText(mdict[inc]+"  ", Snake.textshow[0]-80, prtpos)
			Snake.context.fillText(mdict[inc+1], Snake.textshow[0]+40, prtpos)	
		}
		var undead = null
		for (var inc=0; inc<Snake.players; inc++){
			if (Snake.snakes[inc][Snake.snakes[inc].length-1][3] != "dead"){
				undead = inc+1
			}
		}
		prtpos += 30
		Snake.context.fillText("Last Standing: Player"+undead , Snake.textshow[0]-80, prtpos)
		prtpos += 20
		Snake.context.fillText("Points Winner: "+ mdict[0], Snake.textshow[0]-80, prtpos)
		Snake.context.font = "20px Impact";
		Snake.context.fillText("press the down key to continue",Snake.textshow[0]-120, 210)
		Snake.context.restore();
	},
	
	displayScores: function (){
		Snake.topplayers = [];
		Snake.topscores = [];
		Snake.getScores();
		Snake.clearBoard();
		
		Snake.context.font = "30px Impact";
		Snake.context.fillText("HIGH SCORES", Snake.textshow[0]-75, 25);
		
		Snake.context.beginPath();
		Snake.context.moveTo(0, 27);
		Snake.context.lineTo(Snake.canvas.width, 27);
		Snake.context.stroke();
		
		Snake.context.save();
		Snake.context.font = "20px Times New Roman";
		Snake.context.translate(1, 30);
		var prtpos = 0;
		for (var inc=0; inc<10; inc++){
			prtpos += 20
			if (inc >= Snake.topscores.length){
				
				if (inc != 9) {
					Snake.context.fillText("  " + (inc+1) + ". ", Snake.textshow[0]-80, prtpos);
					}
				else {
					Snake.context.fillText((inc+1) + ". ", Snake.textshow[0]-80, prtpos);
					}
				}
			
			else if (inc != 9){
				Snake.context.fillText("  " + (inc+1) + ". " + Snake.topplayers[inc], Snake.textshow[0]-80, prtpos);
				Snake.context.fillText(Snake.topscores[inc], Snake.textshow[0]+40, prtpos);}
			
			else{
				Snake.context.fillText((inc+1) + ". " + Snake.topplayers[inc], Snake.textshow[0]-80, prtpos);
				Snake.context.fillText(Snake.topscores[inc], Snake.textshow[0]+40, prtpos);}}
		
		Snake.context.font = "25px Impact";
		Snake.context.fillText("press down to start", Snake.textshow[0]-90, Snake.canvas.height-50);
		Snake.context.restore();
	},
	
	displayBoard: function () {
		Snake.displayCoverSnake();
		Snake.context.save();
		Snake.context.translate(1, 41);
		
		var loc = Snake.boardLocation(Snake.apple[0], Snake.apple[1]);
		Snake.context.drawImage(Snake.aplimg, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
		for (var snk=0; snk<Snake.players; snk++){
			Snake.updateSnakeColor(snk);
			Snake.snake = Snake.snakes[snk];
			for (var inc=0;inc<Snake.snake.length;inc++){
				var loc = Snake.boardLocation(Snake.snake[inc][0],Snake.snake[inc][1]);
				if (inc == 0){
					if (Snake.snake[0][2] == "right") {
						Snake.displaySnakeColor(loc); 
						Snake.context.drawImage(Snake.tail1, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						}
					else if (Snake.snake[0][2] == "left") {
						Snake.displaySnakeColor(loc); 
						Snake.context.drawImage(Snake.tail3, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						}
					else if (Snake.snake[0][2] == "up") {
						Snake.displaySnakeColor(loc); 
						Snake.context.drawImage(Snake.tail4, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						}
					else{
						Snake.displaySnakeColor(loc); 
						Snake.context.drawImage( Snake.tail2, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						}
					}
					
				else if (inc == Snake.snake.length-2){
					var snkpo = inc
					Snake.snkdir = Snake.snake[snkpo-1][2] + " " + Snake.snake[snkpo+1][2];
					
					if (Snake.snkdir == "right right" || Snake.snkdir == "left left") {
						Snake.displaySnakeColor(loc);
						Snake.context.drawImage(Snake.body1, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						}
					else if (Snake.snkdir == "left down" || Snake.snkdir == "up right"){
						Snake.displaySnakeColor(loc);
						Snake.context.drawImage(Snake.turn4, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						Snake.snake[snkpo][2] = Snake.snake[snkpo+1][2];
						}
					else if (Snake.snkdir == "left up" || Snake.snkdir == "down right"){
						Snake.displaySnakeColor(loc);
						Snake.context.drawImage(Snake.turn3, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						Snake.snake[snkpo][2] = Snake.snake[snkpo+1][2];
						}
					else if (Snake.snkdir == "right down" || Snake.snkdir == "up left"){
						Snake.displaySnakeColor(loc);
						Snake.context.drawImage(Snake.turn1, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						Snake.snake[snkpo][2] = Snake.snake[snkpo+1][2];
						}
					else if (Snake.snkdir == "right up" || Snake.snkdir == "down left"){
						Snake.displaySnakeColor(loc);
						Snake.context.drawImage(Snake.turn2, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						Snake.snake[snkpo][2] = Snake.snake[snkpo+1][2];
						}
					else {
						Snake.displaySnakeColor(loc);
						Snake.context.drawImage(Snake.body2, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						}
					}
					
				else if (inc == Snake.snake.length-1){
					var snkpo = Snake.snake.length-1;
					if (Snake.snake[Snake.snake.length-1][3] == 'dead'){
						if (Snake.snake[snkpo][2] == "right") {
							Snake.displaySnakeColor(loc); 
							Snake.context.drawImage(Snake.dead1, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
							}
						else if (Snake.snake[snkpo][2] == "left") {
							Snake.displaySnakeColor(loc); 
							Snake.context.drawImage(Snake.dead3, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
							}
						else if (Snake.snake[snkpo][2] == "up") {
							Snake.displaySnakeColor(loc); 
							Snake.context.drawImage(Snake.dead4, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
							}
						else {
						Snake.displaySnakeColor(loc); 
						Snake.context.drawImage(Snake.dead2, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						}
					}
					else{
						if (Snake.snake[snkpo][2] == "right") {
							Snake.displaySnakeColor(loc); 
							Snake.context.drawImage(Snake.head1, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
							}
						else if (Snake.snake[snkpo][2] == "left") {
							Snake.displaySnakeColor(loc); 
							Snake.context.drawImage(Snake.head3, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
							}
						else if (Snake.snake[snkpo][2] == "up") {
							Snake.displaySnakeColor(loc); 
							Snake.context.drawImage(Snake.head4, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
							}
						else {
						Snake.displaySnakeColor(loc); 
						Snake.context.drawImage(Snake.head2, loc[0], loc[1], Snake.imagesize, Snake.imagesize);
						}
					}
				}
			}
		}
		Snake.context.restore();
		Snake.context.strokeRect(0,40,Snake.canvas.width,Snake.canvas.width);
	},
	
	displayMenuPointer: function (listbottom,mp21, mp22){
			if (Snake.savedirs[0] == "down"){
				Snake.time = 0
				Snake.savedirs[0] = ""
			if (Snake.mchoice == listbottom){
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice = 1
				Snake.menupo2 = mp21
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
			else{
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice += 1
				Snake.menupo2 += 30
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
		}
		else if (Snake.savedirs[0] == "up"){
				Snake.time = 0
				Snake.savedirs[0] = ""
			if (Snake.mchoice == 1){
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice = listbottom
				Snake.menupo2 = mp22
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
			else{
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice -= 1
				Snake.menupo2 -= 30
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
		}
		else if (Snake.menuFirst){
			Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			Snake.menuFirst = false;
		}
	},
	
	displayMultiPointer: function (){
		if (Snake.savedirs[0] == "down"){
			Snake.savedirs[0] = ""
			if (Snake.mchoice == 5){
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice = 1
				Snake.menupo2 = 50
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
			else if (Snake.mchoice == 6){
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice = 2
				Snake.menupo2 = 50
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
			else{
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice += 2
				Snake.menupo2 += 50
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
		}
		else if (Snake.savedirs[0] == "up"){
			Snake.savedirs[0] = ""
			if (Snake.mchoice == 1){
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice = 5
				Snake.menupo2 = 150
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
			else if (Snake.mchoice == 2){
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice = 6
				Snake.menupo2 = 150
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
			else{
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice -= 2
				Snake.menupo2 -= 50
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
		}
		else if (Snake.savedirs[0] == "right"){
			Snake.savedirs[0] = ""
			if (Snake.menupo == 80){
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice += 1
				Snake.menupo = -50
				Snake.mhead = Snake.head3
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
			else{
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice -= 1
				Snake.menupo = 80
				Snake.mhead = Snake.head1
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
		}
		else if (Snake.savedirs[0] == "left"){
			Snake.savedirs[0] = ""
			if (Snake.menupo == 80){
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice += 1
				Snake.menupo = -50
				Snake.mhead = Snake.head3
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
			else{
				Snake.context.drawImage(Snake.blank, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
				Snake.mchoice -= 1
				Snake.menupo = 80
				Snake.mhead = Snake.head1
				Snake.context.drawImage(Snake.mhead, Snake.textshow[0]-Snake.menupo, Snake.menupo2, 25, 25)
			}
		}
	}});
}());