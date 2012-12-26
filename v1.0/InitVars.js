(function () {
    if (typeof Snake === 'undefined') {
        Snake = {};
    }
    Snake.extend({
	setOneTimeVars: function (){
		//get canvas element
		Snake.canvas = document.getElementById('SnakeCanvas')
		Snake.context = Snake.canvas.getContext('2d');
		//create sentering height and width
		Snake.textshow = [Snake.canvas.width/2, Snake.canvas.height/2]
		//create keypress dictionarys
		if (navigator.appName == 'Opera'){
			Snake.KEY_CODES = {
	  		27: "back",
	  		83: 'down',
	  		65: 'left',
	  		68: 'right',
	  		87: 'up',
	  		13: 'enter',
	  		37: 'left',
	  		38: 'up',
	  		39: 'right',
	  		40: 'down',
	  		109: 'slow',
	  		61: 'fast'
			}
		}
		else if (navigator.appName == "Netscape"){
			Snake.KEY_CODES = {
	  		27: "back",
	  		83: 'down',
	  		65: 'left',
	  		68: 'right',
	  		87: 'up',
	  		13: 'enter',
	  		37: 'left',
	  		38: 'up',
	  		39: 'right',
	  		40: 'down',
	  		109: 'slow',
	  		107: 'fast',
	  		189: 'slow',
		  	187: 'fast'
	  		
			}
		}
		//listen for keypress
		Snake.upButton = document.getElementById('up');
		Snake.downButton = document.getElementById('down');
		Snake.leftButton = document.getElementById('left');
		Snake.rightButton = document.getElementById('right');
		Snake.zoominButton = document.getElementById('zoomin');
		Snake.zoomoutButton = document.getElementById('zoomout');
		Snake.zoominButton.onclick = function() {Snake.listenForZoom('in');};
		Snake.zoomoutButton.onclick = function() {Snake.listenForZoom('out');};
		Snake.upButton.onclick = function () {Snake.listenForChangeDir(38);};
		Snake.downButton.onclick = function () {Snake.listenForChangeDir(40);};
		Snake.leftButton.onclick = function () {Snake.listenForChangeDir(37);};
		Snake.rightButton.onclick = function () {Snake.listenForChangeDir(39);};
		window.addEventListener("keydown",function (e) {Snake.listenForChangeDir(e.keyCode); e.preventDefault();}, false);
		
		//diclare constants
		//board
		Snake.BLANK = 0;
		Snake.SNAKE = 1;
		Snake.APPLE = 2;
		
		//gamestates
		Snake.GAMEOVER = 0;
		Snake.PLAY = 1;
		Snake.PAUSE = 2;
		Snake.DEMO = 3;
		Snake.HELP = 4;
		Snake.SCORE1 = 5;
		Snake.SCORE2 = 6;
		Snake.MENU = 7;
		Snake.MENU2 = 8;
		Snake.MENU3 = 9;
		
		//import images
		// <this will be changed>
		Snake.aplimg = new Image();
		Snake.aplimg.src = "../art/RedApple.jpg";
		
		Snake.tail1 = new Image();
		Snake.tail1.src = "../art/tail1.png";
	
		Snake.tail2 = new Image();
		Snake.tail2.src = "../art/tail2.png";
		
		Snake.tail3 = new Image();
		Snake.tail3.src = "../art/tail3.png";
		
		Snake.tail4 = new Image();
		Snake.tail4.src = "../art/tail4.png";
		
		Snake.body1 = new Image();
		Snake.body1.src = "../art/strate1.png";
		
		Snake.body2 = new Image();
		Snake.body2.src = "../art/strate2.png";
		
		Snake.head1 = new Image();
		Snake.head1.src = "../art/head1.png";
	
		Snake.head2 = new Image();
		Snake.head2.src = "../art/head2.png";
		
		Snake.head3 = new Image();
		Snake.head3.src = "../art/head3.png";
	
		Snake.head4 = new Image();
		Snake.head4.src = "../art/head4.png";
			
		Snake.turn1 = new Image();
		Snake.turn1.src = "../art/turn1.png";
		
		Snake.turn2 = new Image();
		Snake.turn2.src = "../art/turn2.png";
		
		Snake.turn3 = new Image();
		Snake.turn3.src = "../art/turn3.png";
		
		Snake.turn4 = new Image();
		Snake.turn4.src = "../art/turn4.png";
		
		Snake.dead1 = new Image();
		Snake.dead1.src = "../art/dead1.png";
	
		Snake.dead2 = new Image();
		Snake.dead2.src = "../art/dead2.png";
	
		Snake.dead3 = new Image();
		Snake.dead3.src = "../art/dead3.png";
		
		Snake.dead4 = new Image();
		Snake.dead4.src = "../art/dead4.png";
		
		Snake.blank = new Image();
		Snake.blank.src = "../art/blank.jpg";
		
		Snake.multipx1 = new Image();
		Snake.multipx1.src = "../art/multichoice1.jpg";
	
		Snake.multipx2 = new Image();
		Snake.multipx2.src = "../art/multichoice2.jpg";
		
		Snake.multipx3 = new Image();
		Snake.multipx3.src = "../art/multichoice3.jpg";
	
		Snake.multipx4 = new Image();
		Snake.multipx4.src = "../art/multichoice4.jpg";
	
		Snake.multipx5 = new Image();
		Snake.multipx5.src = "../art/multichoice5.jpg";
	
		Snake.multipx6 = new Image();
		Snake.multipx6.src = "../art/multichoice6.jpg";
	},
	
	setNewGameVars: function() {
		
		Snake.players = 1;
		Snake.human = 1;
		Snake.playersdead = [];
		Snake.gamestate = Snake.MENU;
		Snake.enter = false;
		Snake.back = false
		
		Snake.aplate = [];
		
		Snake.applecounts = [0, 0, 0, 0];
		Snake.scores = [0, 0, 0, 0];
		Snake.topscores = [];
		Snake.topplayers = [];

		
		Snake.boardsize = 15;
		Snake.speed = 500;
		Snake.speedcount = 1;
		Snake.scoring = parseInt((400/this.boardsize)*this.speedcount);
		Snake.snkold = [];
		Snake.snakecolor = 'green';
		
		Snake.savedirs = ["", "left", "right", "left"];
		Snake.directions = ["", "left", "right", "left"];
		Snake.comdifs = ["easy", "easy", "easy"];
	},
	
	setSnakesVars: function () {
		if (Snake.players == 1){
			Snake.snakes = [[[0,0,"right"],[1,0,"right"],[2,0,"right"]]]
		}
		else if (Snake.players == 2){
			Snake.snakes = [[[0,0,"right"],[1,0,"right"],[2,0,"right"]],
				[[Snake.boardsize-1,0,"left"],[Snake.boardsize-2,0,"left"],[Snake.boardsize-3,0,"left"]]]
		}
		else if (Snake.players == 3){
			Snake.snakes = [[[0,0,"right"],[1,0,"right"],[2,0,"right"]],
				[[Snake.boardsize-1,0,"left"],[Snake.boardsize-2,0,"left"],[Snake.boardsize-3,0,"left"]],
				[[0,Snake.boardsize-1,"right"],[1,Snake.boardsize-1,"right"],[2,Snake.boardsize-1,"right"]]]
		}
		else if (Snake.players == 4){
			Snake.snakes = [[[0,0,"right"],[1,0,"right"],[2,0,"right"]],
				[[Snake.boardsize-1,0,"left"],[Snake.boardsize-2,0,"left"],[Snake.boardsize-3,0,"left"]],
				[[0,Snake.boardsize-1,"right"],[1,Snake.boardsize-1,"right"],[2,Snake.boardsize-1,"right"]],
				[[Snake.boardsize-1,Snake.boardsize-1,"left"],[Snake.boardsize-2,Snake.boardsize-1,"left"],[Snake.boardsize-3,Snake.boardsize-1,"left"]]]
		}
	},
	
	setBoardVars: function () {
		Snake.board = [];
		for (var inc=0; inc<Snake.boardsize; inc++){
			Snake.board[inc] = [];
			for (var inc2=0; inc2<Snake.boardsize; inc2++) {
				Snake.board[inc][inc2] = Snake.BLANK;
			}
		}
	},
	
	setMenuVars: function () {
		Snake.time = 0;
		Snake.pchosen = 0;
		Snake.mchoice = 1;
		Snake.menupo = 70;
		Snake.menupo2 = 35;
		Snake.mhead = Snake.head1;
	}});
}());