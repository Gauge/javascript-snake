(function () {
    if (typeof Snake === 'undefined') {
        Snake = {};
    }
    Snake.extend({
	helpMenu: function (){
		clearInterval(Snake.menu);
		Snake.gamestate = Snake.HELP;
		Snake.displayHelp();
		Snake.menu = setInterval(Snake.listenForMainMenu, 100);
	},
	
	costomMenu: function (){
		Snake.size = prompt("please enter a board size", "big, bigger, biggest");
		if (Snake.size == "big"){Snake.boardsize = 20;  Snake.scoring = parseInt((400/Snake.boardsize)*Snake.speedcount)}
		else if (Snake.size == "bigger") {Snake.boardsize = 30; Snake.scoring = parseInt((400/Snake.boardsize)*Snake.speedcount)}
		else if (Snake.size == "biggest") {Snake.boardsize = 40; Snake.scoring = parseInt((400/Snake.boardsize)*Snake.speedcount);}
		else {return false}
	},
	
	mainMenu: function (){
		Snake.time += 1
		Snake.displayMenuPointer(4,35,125);
		// changes direction back to the right
		Snake.savedir1 = "";
		if (Snake.enter == true){
			Snake.enter = false;
			Snake.size = ''
			if (Snake.mchoice == 2) {
				Snake.costomMenu();
			}
			if (Snake.mchoice == 1 || Snake.size == "big" || Snake.size == "bigger" || Snake.size == "biggest" ) {
				Snake.startGame();
			}
			else if (Snake.mchoice == 3) {
				Snake.gamestate = Snake.MENU2; 
				Snake.listenForMultiMenu();
			}
			else if (Snake.mchoice == 4) {
				Snake.helpMenu(); 
			}
		}
		if (Snake.time == 50){
			Snake.clearBoard();
			Snake.updateBoard();
			Snake.placeApple();
			Snake.gamestate = Snake.DEMO;
			clearInterval(Snake.menu);
			Snake.demo = setInterval(Snake.runDemo, Snake.demoSpeed());
		}
	},
	
	multiChoose: function (){
		Snake.displayMultiPointer();
		if (Snake.back == true){
			Snake.back = false
			clearInterval(Snake.menu)
			Snake.setMenuVars();
			Snake.displayMainMenu();
			Snake.gamestate = Snake.MENU
			Snake.menu = setInterval(Snake.mainMenu, 100);
		}
		else if (Snake.enter == true){
			Snake.enter = false
			if (Snake.mchoice == 1){
				Snake.multiC1(2,1,20)
			}
			else if (Snake.mchoice == 2){
				Snake.multiC1(2,2,20)
			}
			else if (Snake.mchoice == 3){
				Snake.multiC1(3,1,30)
			}
			else if (Snake.mchoice == 4){
				Snake.multiC1(3,2,30)
			}
			else if (Snake.mchoice == 5){
				Snake.multiC1(4,1,40)
			}
			else{
				Snake.multiC1(4,2,40)
			}
			Snake.gamestate = Snake.MENU3
			clearInterval(Snake.menu)
			Snake.setMenuVars();
			if (Snake.time == Snake.players-Snake.human){
				Snake.startGame();
			}
			else{
				Snake.displayChooseDiffs(1);
				Snake.menu = setInterval(Snake.chooseDiffs, 100)
			}
		}
	},
	
	chooseDiffs: function (){
		Snake.displayMenuPointer(3,35,95);
		if (Snake.back == true){
			Snake.back = false
			Snake.gamestate = Snake.MENU2
			Snake.listenForMultiMenu();
		}
		if(Snake.enter == true){
			Snake.enter = false
			Snake.pchosen += 1
			if (Snake.mchoice == 1){
				Snake.comdifs[Snake.pchosen] = "easy"
				Snake.displayChooseDiffs(Snake.pchosen+1);
			}
			else if (Snake.mchoice == 2){
				Snake.comdifs[Snake.pchosen] = "medium"
				Snake.displayChooseDiffs(Snake.pchosen+1);
			}
			else if (Snake.mchoice == 3){
				Snake.comdifs[Snake.pchosen] = "hard"
				Snake.displayChooseDiffs(Snake.pchosen+1);
			}
		}
		if (Snake.pchosen == Snake.players-Snake.human){
			Snake.startGame();
		}
	}});
}());
