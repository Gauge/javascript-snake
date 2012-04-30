/**
 *  key listener functions
 */

(function () {
    if (typeof Snake === 'undefined') {
        Snake = {};
    }
    Snake.extend({
        listenForMainMenu: function () {
            if (Snake.savedirs[0] == "down"){
                Snake.savedirs[0] = "right";
                
                clearInterval(Snake.menu);
                Snake.gamestate == Snake.MENU;
                Snake.setNewGameVars();
                Snake.setMenuVars();
                Snake.displayMainMenu();
                Snake.menu = setInterval(Snake.mainMenu, 100);
            }
        },
        
        listenForMultiMenu: function () {
            clearInterval(Snake.menu);
            Snake.setMenuVars();
            Snake.menupo += 10;
            Snake.menupo2 += 15;
            Snake.displayMultiMenu();
            Snake.menu = setInterval(Snake.multiChoose, 100);
            
        },
        
        listenForEndDemo: function () {
            if (Snake.enter == true){
                Snake.enter = false;
                clearInterval(Snake.demo);
                Snake.savedirs[0] = "down";
                Snake.listenForMainMenu();
            }
        },
        
        listenForZoom: function (operation) {
            if (operation == "in") {Snake.canvas.width += 30; Snake.canvas.height += 30;}
            else if (operation == "out") {Snake.canvas.width -= 30; Snake.canvas.height -= 30;}
            
            Snake.imagesize = parseInt(Snake.canvas.width/Snake.boardsize);
            Snake.textshow = [Snake.canvas.width/2, Snake.canvas.height/2];
            
            if (Snake.gamestate ==  Snake.HELP) {Snake.displayHelp();}
            
            else if (Snake.gamestate == Snake.MENU) {
            	Snake.displayMainMenu();
            }
            else if (Snake.gamestate == Snake.MENU2) {
            	Snake.displayMultiMenu();
            }
            else if (Snake.gamestate == Snake.MENU3) {
            	Snake.displayChooseDiffs(Snake.time+1);
            }
            
            else if (Snake.gamestate == Snake.PLAY || Snake.gamestate == Snake.DEMO) {
            	Snake.displayScore();
            }
            
            else if (Snake.gamestate == Snake.PAUSE) {
            	Snake.showBoard(); 
            	Snake.showPause();
            }
            else if (Snake.gamestate == Snake.SCORE1) {
            	Snake.displayScores();
            }
            else if (Snake.gamestate == Snake.SCORE2) {
            	Snake.displayMultiScores();
            }
            Snake.resizeCanvas();
        },
        
        listenForChangeDir: function (key) {
            var notdir = {"right":"left","left":"right","up":"down","down":"up"};
            if (Snake.KEY_CODES[key]){
                if (Snake.KEY_CODES[key] == 'slow'){
                    if (Snake.speedcount > 1){
                        Snake.speed += 50;
                        Snake.speedcount -= 1;
                        Snake.scoring = parseInt((400/Snake.boardsize)*Snake.speedcount);
                        if (Snake.game != '') {Snake.intervalChange();}
                    }
                }
                
                else if (Snake.KEY_CODES[key] == 'fast'){
                    if (Snake.speedcount < 8){
                        Snake.speed -= 50;
                        Snake.speedcount += 1;
                        Snake.scoring = parseInt((400/Snake.boardsize)*Snake.speedcount);
                        if (Snake.game != '') {Snake.intervalChange();}
                    }
                }
                
                else if (Snake.KEY_CODES[key] == 'enter') {
                	Snake.enter = true;
                }
                else if (Snake.KEY_CODES[key] == 'back'){
                	Snake.back = true;
                }
                else if (key < 60){
                    if (notdir[Snake.directions[0]] != Snake.KEY_CODES[key]) {
                        Snake.savedirs[0] = Snake.KEY_CODES[key];
                    }
                }
                else if (Snake.human != 1){
                    if (key > 60 && notdir[Snake.directions[1]] != Snake.KEY_CODES[key]) {
                        Snake.savedirs[1] = Snake.KEY_CODES[key];
                    }
                }
            }
        }
    });
}());