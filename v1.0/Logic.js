/*
 * game logic functions
 */
(function () {
    if (typeof Snake === 'undefined') {
        Snake = {};
    }
    Snake.extend({
	init: function (){
		Snake.setOneTimeVars();
		Snake.setNewGameVars();
		Snake.setMenuVars();
		Snake.displayMainMenu();
		Snake.menu = setInterval(Snake.mainMenu, 100);
	},
	
	intervalChange: function (){
		clearInterval(Snake.game);
		Snake.game = setInterval(Snake.gameFlow, Snake.speed);
	},
	
	demoSpeed: function (){
		while (true){
			var number = parseInt(Math.random()*500);
			if (number >= 100){
				return number;
			}
		}
	},
	
	Pauseing: function (){
		if (Snake.gamestate != Snake.PAUSE) {
			Snake.displayPause(); 
			Snake.gamestate = Snake.PAUSE;
		} else {
			Snake.clearBoard(); 
			Snake.displayScore(); 
			Snake.gamestate = Snake.PLAY;
		}
	},
	
	getScores: function (){
		if (localStorage["p1"]){	
			for (var inc=0; inc<10; inc++){
				Snake.topplayers[Snake.topplayers.length] = localStorage["p"+(inc+1)];
				Snake.topscores[Snake.topscores.length] = localStorage["s"+(inc+1)];
			}
		}
	},
	
	updateComputers: function (snknum){
		// if not a human, run the function related to the difficulty
		if (snknum+1 > Snake.human){
			if (Snake.comdifs[snknum] == "easy"){
				Snake.easyCom(snknum+1);
			
			} else if (Snake.comdifs[snknum] == "medium"){
				Snake.mediumCom(snknum+1);
			
			} else if (Snake.comdifs[snknum] == "hard"){
				Snake.hardCom(snknum+1);
			}
		} 
	},
	
	boardLocation: function (row, col){
		// returns the pixel location for the entered coordinance
		var x2 = (row+1)*Snake.imagesize;
		var y2 = col*Snake.imagesize;
		var x = x2-Snake.imagesize;
		var y = y2;
		
		return [x,y,x2,y2];
	},
	
	updateSnakeColor: function (snknum){
		if (snknum == 0){
			Snake.snakecolor = 'green';
		}
		else if (snknum == 1){
			Snake.snakecolor = 'blue';
		}
		else if (snknum == 2){
			Snake.snakecolor = 'yellow';
		}
		else if (snknum == 3){
			Snake.snakecolor = 'purple';
		}
	},
	
	updateEat: function (snk){
		Snake.aplate[Snake.aplate.length] = [Snake.apple[0], Snake.apple[1], snk];
		Snake.applecounts[snk] += 1;
		Snake.scores[snk] +=Snake.scoring;
		Snake.displayScore();
		Snake.placeApple();
	},
	
	checkForGameover: function (){
		var returner = true
		var count = 0
		for (var inc=0; inc<Snake.players; inc++){
			if (Snake.snakes[inc][Snake.snakes[inc].length-1][3] != "dead"){
				if (Snake.players == 1){
					returner = false
				}
				count +=1 
			}
		}
		if (count > 1){
			returner = false
		}
		
		return returner
	},
	
	startGame: function (){
		Snake.updateBoard();
		Snake.placeApple();
		Snake.clearBoard();
		clearInterval(Snake.menu);
		Snake.displayScore();
		Snake.savedirs[0] = "right"
		Snake.gamestate = Snake.PLAY
		Snake.game = setInterval(Snake.gameFlow, Snake.speed);
	},
	
	placeApple: function () {
		while(true){
			var row = parseInt(Math.random()*Snake.boardsize);
			var col = parseInt(Math.random()*Snake.boardsize);
			if (Snake.board[row][col] == Snake.BLANK){
				Snake.board[row][col] = Snake.APPLE;
				Snake.apple = [row, col];	
				break;
			}
		}
	},
	
	gameFlow: function (){
		if (Snake.enter == true) {
			Snake.Pauseing(); 
			Snake.enter = false;
		}
		
		if (Snake.gamestate != Snake.PAUSE){
			Snake.updateSnake();
			if (Snake.checkForGameover() == true){
				Snake.gamestate = Snake.GAMEOVER;
				clearInterval(Snake.game);
				Snake.displayGameOver();
				if (Snake.players == 1){
					setTimeout("Snake.addScore()","1000");
				}
				else{
					Snake.displayMultiScores();
					Snake.game = '';
					Snake.gamestate = Snake.SCORE2;
				Snake.menu = setInterval(Snake.listenForMainMenu, 100);
				}
			}
			else{Snake.displayBoard();}
		}
	},
	
	updateBoard: function (){
		Snake.setBoardVars();
		Snake.setSnakesVars();
		for (var snk=0;snk<Snake.players;snk++){
			Snake.snake = Snake.snakes[snk];
			for (inc=0;inc<Snake.snake.length;inc++){
				Snake.board[Snake.snake[inc][0]][Snake.snake[inc][1]] = Snake.SNAKE;
			}
		}
		Snake.imagesize = parseInt(Snake.canvas.width/Snake.boardsize)
	},
	
	resizeCanvas: function (){
		var ml = Snake.canvas.offsetWidth;
		Snake.canvas.style.marginLeft = -(ml/2)+"px";
		var mt = Snake.canvas.offsetHeight;
		Snake.canvas.style.marginTop = -(mt/2)+"px";
		Snake.upButton.style.marginTop = -(mt/2+48)+"px";
		Snake.leftButton.style.marginLeft = -(ml/2+48)+"px";
		Snake.downButton.style.marginBottom = -(mt/2+48)+"px";
		Snake.rightButton.style.marginRight = -(ml/2+48)+"px";
	},
	
	runDemo: function (){
		Snake.head = Snake.snake[Snake.snake.length-1]
		if (Snake.head[0] == Snake.apple[0] && Snake.head[1] == Snake.apple[1]) {
			Snake.updateEat(0);
			}
		 if (Snake.head[3] == "dead"){
			clearInterval(Snake.demo)
			Snake.savedir1 = "down";
			Snake.listenForMainMenu();
		}
		else{
			Snake.easyCom(1);
			Snake.updateSnake();
			Snake.displayBoard();
			Snake.displayDemoWords();
			 Snake.listenForEndDemo();
		}
	},
	
	orderScores: function (){
		var plist = Snake.topplayers;
		var slist = Snake.topscores;
		
		Snake.topplayers = [];
		Snake.topscores = [];
		
		var biggest = -1;
		var number = 0;
		
		while (plist.length > 0){
			for (var inc=0;inc<plist.length; inc++){
				if (parseInt(slist[inc]) > biggest) {
					biggest = parseInt(slist[inc]); number = inc;
				}
			}
			if (plist[number] != '') {
				Snake.topscores[Snake.topscores.length] = parseInt(slist[number]); 
				Snake.topplayers[Snake.topplayers.length] = plist[number];
			}
			else{
				Snake.topscores[Snake.topscores.length] = ""; 
				Snake.topplayers[Snake.topplayers.length] = "";
			}
			plist.splice(number,number+1)
			slist.splice(number,number+1)
			biggest = -1
			number = 0
		}
	},
	
	orderMultiScores: function (){
		var biggest = -1
		var mply = []
		var scos = Snake.scores
		var num = 0
		while(true){	
			for (var inc=0; inc<scos.length; inc++){
				if (scos[inc] > biggest){
					num = inc;
					biggest = scos[inc];
				}
			}
			mply[mply.length] = "Player"+(num+1)
			mply[mply.length] = biggest;
			scos[num] = "used";
			biggest = -1;
			num = 0;
			if (mply.length == Snake.players*2){		
				return mply;
			}
		}
	},
	
	addScore: function (){
		var ini = prompt("please enter you initals", "");
		Snake.getScores();
		if (ini == null || ini == "") {ini = "N/A"; }
		Snake.topplayers[Snake.topplayers.length] = ini.slice(0, [3]).toUpperCase();
		Snake.topscores[Snake.topscores.length] = Snake.score1;
		Snake.orderScores();
		for (var inc=0; inc<10; inc++){
			if (inc >= Snake.topplayers.length) {localStorage["p"+(inc+1)] = ''; localStorage["s"+(inc+1)] = '';}
			else{localStorage["p"+(inc+1)] = Snake.topplayers[inc]; localStorage["s"+(inc+1)] = Snake.topscores[inc];}
		}
		Snake.displayScores();
		Snake.setNewGameVars();
		Snake.game = '';
		Snake.gamestate = Snake.SCORE1;
		Snake.menu = setInterval(Snake.listenForMainMenu, 100);
	},
	
	updateSnake: function (){
		for (var snk=0; snk<Snake.players; snk++){
			Snake.snake = Snake.snakes[snk];
			Snake.head = Snake.snake[Snake.snake.length-1];
			if (Snake.head[0] == Snake.apple[0] && Snake.head[1] == Snake.apple[1]){
				if (Snake.gamestate != Snake.DEMO) {
					Snake.updateEat(snk);
				}
			}
			Snake.updateComputers(snk);
			Snake.directions[snk] = Snake.savedirs[snk];
			
			if (Snake.head[3] == "dead" && Snake.aplate.length > 0 && Snake.aplate[0][2] == snk) {
				Snake.aplate.splice(0,1)
			}
			
			if (Snake.head[3] != 'dead' ){
				Snake.direction = Snake.directions[snk]	;
				if (Snake.direction == "right"){
					if (Snake.head[0]+1 != Snake.board.length && Snake.board[Snake.head[0]+1][Snake.head[1]] != Snake.SNAKE){
						Snake.snake[Snake.snake.length] = [Snake.head[0]+1,Snake.head[1],"right"];
						Snake.board[Snake.head[0]+1][Snake.head[1]] = Snake.SNAKE;
					} else {
						Snake.snake[Snake.snake.length-1][3] = "dead";
					}
				} else if (Snake.direction == "left") {
					if (Snake.head[0]-1 != -1 && Snake.board[Snake.head[0]-1][Snake.head[1]] != Snake.SNAKE){
						Snake.snake[Snake.snake.length] = [Snake.head[0]-1,Snake.head[1],"left"];
						Snake.board[Snake.head[0]-1][Snake.head[1]] = Snake.SNAKE;
					} else {
						Snake.snake[Snake.snake.length-1][3] = "dead";
					}
				} else if (Snake.direction == "down") {
					if (Snake.head[1]+1 != Snake.board.length && Snake.board[Snake.head[0]][Snake.head[1]+1] != Snake.SNAKE){
						Snake.snake[Snake.snake.length] = [Snake.head[0],Snake.head[1]+1, "down"];
						Snake.board[Snake.head[0]][Snake.head[1]+1] = Snake.SNAKE;
					} else {
						Snake.snake[Snake.snake.length-1][3] = "dead";
					}
				} else if (Snake.direction == "up" && Snake.board[Snake.head[0]][Snake.head[1]-1] != Snake.SNAKE) {
					if (Snake.head[1]-1 != -1){
						Snake.snake[Snake.snake.length] = [Snake.head[0],Snake.head[1]-1, "up"];
						Snake.board[Snake.head[0]][Snake.head[1]-1] = Snake.SNAKE;
					} else {
						Snake.snake[Snake.snake.length-1][3] = "dead";
					}
				}
				if (Snake.aplate.length > 0 && Snake.aplate[0][0] == Snake.snake[0][0] && Snake.aplate[0][1] == Snake.snake[0][1]) {
					Snake.aplate.splice(0,1);
				} else {
					if (Snake.head[3] != 'dead'){
						Snake.snkold[Snake.snkold.length] = Snake.snake[0];
						Snake.board[Snake.snake[0][0]][Snake.snake[0][1]] = Snake.BLANK;
						Snake.snake.splice(0,1);
					}
				}
			}
		}
	},
	
	multiC1: function (plys, hums, brdsz){
		Snake.players = plys;
		Snake.human = hums;
		Snake.boardsize = brdsz
		Snake.scoring = parseInt((400/Snake.boardsize)*Snake.speedcount)
	}});
}());

window.onload = Snake.init;