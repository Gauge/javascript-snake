(function () {
    if (typeof Snake === 'undefined') {
        Snake = {};
    }
    Snake.extend({
	easyCom: function (playnum){
		Snake.head = Snake.snakes[playnum-1][Snake.snakes[playnum-1].length-1]
		var direction = Snake.directions[playnum-1]
		if ((Snake.head[0]-Snake.apple[0]) > 0 && direction != "right"){
			Snake.savedirs[playnum-1] = "left";
		}
		else if(Snake.head[0]-Snake.apple[0] < 0 && direction != "left"){
			Snake.savedirs[playnum-1] = "right";
		}
		if (Snake.head[1]-Snake.apple[1] > 0 && direction != "down"){
			Snake.savedirs[playnum-1] = "up";
		}
		else if (Snake.head[1]-Snake.apple[1] < 0 && direction != "up"){
			Snake.savedirs[playnum-1] = "down";
		}
		if(Snake.confirmDir(Snake.savedirs[playnum-1]) == false){
			var chan = parseInt(Math.random()*10);
			if (chan != 5){
				var blanks = Snake.getBlankPo()
				for(var inc=0; inc<blanks.length; inc++){
					if (Snake.directions[playnum-1] == blanks[inc]){
						Snake.savedirs[playnum-1] = blanks[inc]
					} 
				}
				Snake.savedirs[playnum-1] = blanks[0]
			}
		}
	},
	
	mediumCom: function (playnum){
		Snake.head = Snake.snakes[playnum-1][Snake.snakes[playnum-1].length-1]
		var direction = Snake.directions[playnum-1]
		if ((Snake.head[0]-Snake.apple[0]) > 0 && direction != "right"){
			Snake.savedirs[playnum-1] = "left";
		}
		else if(Snake.head[0]-Snake.apple[0] < 0 && direction != "left"){
			Snake.savedirs[playnum-1] = "right";
		}
		if (Snake.head[1]-Snake.apple[1] > 0 && direction != "down"){
			Snake.savedirs[playnum-1] = "up";
		}
		else if (Snake.head[1]-Snake.apple[1] < 0 && direction != "up"){
			Snake.savedirs[playnum-1] = "down";
		}
		if(Snake.confirmDir(Snake.savedirs[playnum-1]) == false){
			var chan = parseInt(Math.random()*20);
			if (chan != 10){
				var blanks = Snake.getBlankPo()
				for(var inc=0; inc<blanks.length; inc++){
					if (Snake.directions[playnum-1] == blanks[inc]){
						Snake.savedir[playnum-1] = blanks[inc]
					} 
				}
				Snake.savedirs[playnum-1] = blanks[0]
			}
		}
	},
	
	hardCom: function (playnum){
		
	},
	
	getBlankPo: function (){
		var blanks = []
		if (Snake.board[Snake.head[0]+1][Snake.head[1]] == Snake.BLANK){
			blanks[blanks.length] =  'right'
		}
		else  if (Snake.board[Snake.head[0]-1][Snake.head[1]] == Snake.BLANK){
			blanks[blanks.length] =  'left'
		}
		else if (Snake.board[Snake.head[0]][Snake.head[1]-1] == Snake.BLANK){
			blanks[blanks.length] = "up"
		}
		else if (Snake.board[Snake.head[0]][Snake.head[1]+1] == Snake.BLANK){
			blanks[blanks.length] = "down"
		}
		return blanks
	},
	
	confirmDir: function (dir){
		if (dir == "right" && Snake.board[Snake.head[0]+1][Snake.head[1]] == Snake.SNAKE){
			return false
		}
		else if (dir == 'left' && Snake.board[Snake.head[0]-1][Snake.head[1]] == Snake.SNAKE){
			return false
		}
		else if (dir == 'up' && Snake.board[Snake.head[0]][Snake.head[1]-1] == Snake.SNAKE){
			return false
		}
		else if (dir == 'down' && Snake.board[Snake.head[0]][Snake.head[1]+1] == Snake.SNAKE){
			return false
		}
		return true
	}});
}());