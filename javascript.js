// run this function when the document is loaded
window.onload = function() {
	class Board {
		constructor() {
			this.board;
			// big player holes
			this.bigHole;
			this.bigHoleList = [];

			this.midDiv;
			this.in;
			
			// small holes and seeds
			this.hole;
			this.seeds = [];
			this.numberOfSeeds = [];

			// initializes players
			this.player1 = 0; this.player2 = 1;
			this.currentPlayer = this.player1;
		}

		createBoard() {
			this.board = document.getElementById("board");
			this.board.setAttribute('class', 'out');
			document.body.appendChild(this.board);
		}

		createPlayerBigHole(playerIndex) { 
			/* player 1 has index 0; player 2 as index 1  */
			this.bigHole = document.createElement("div");
			this.bigHole.setAttribute('class', 'in');
			this.board.appendChild(this.bigHole);
			
			// intializes big hole number of seeds with 0
			if (this.bigHoleList.length != 2) {
				this.bigHoleList.push(0);
			}

			// show seeds in big holes
			else {
				var numberOfSeeds = this.bigHoleList[playerIndex];
				for (let i = 0; i < numberOfSeeds; i++) {
					var seed = this.createSeed();
					this.bigHole.appendChild(seed);
				}
			}
		}

	    createMidMidDiv() {
			this.midDiv = document.createElement("div");
			this.midDiv.setAttribute('class', 'mid');
			this.board.appendChild(this.midDiv);
		}

		createInDiv() {
			this.in = document.createElement("div");
			this.in.setAttribute('class', 'inn');
			this.midDiv.appendChild(this.in);
		}

		createPlayerHoles(indexHole) {
			this.hole = document.createElement("div");
			this.hole.setAttribute('class', 'in');
			this.in.appendChild(this.hole);

			const handler = (e) => {
				// error if clicks on opponents hole
				if ((indexHole <= 5 && this.currentPlayer == this.player2) || (indexHole > 5 && this.currentPlayer == this.player1)) alert("That's the opponets hole!");
				else {
					// select clicked hole 
					this.moveSeed(indexHole);
				}
			};
			// clicks hole
			this.hole.addEventListener("click", handler);

			// create seeds only one time
			// 0-23 player 1
			// 24-47 player 2
			if (this.seeds.length != 48) {
				// four seeds per hole
				for (let i = 0; i < 4; i++) {
					var seed = this.createSeed();
					this.seeds.push(seed);

					this.hole.appendChild(seed);
				}
				this.numberOfSeeds.push(4);
			}

			// show seeds if seeds already exists
			else {
				for (let i = 0; i < this.numberOfSeeds[indexHole]; i++) this.showSeeds();
			}
		}

		createSeed() {
			// creates seeds
			var seed = document.createElement("div");
			seed.setAttribute('class', 'semente');
			
			return seed;
		}

		showSeeds() {
			// shows current seeds
			this.hole.appendChild(this.createSeed());
		}

		moveSeed(indexHole) {
			// updates number of seeds in class board
			// empties hole
			var seedsInHole = this.numberOfSeeds[indexHole];
			this.numberOfSeeds[indexHole] = 0;

			// distributes seeds counter-clockwise
			var i = 1;
			while(seedsInHole > 0) {
				// if big hole from player 1
				if (indexHole+i == 6 && this.currentPlayer == this.player1) {
					this.bigHoleList[this.player1]++;
					seedsInHole--;
					// if last seed is in current player big hole then player gains a free move
					if (seedsInHole == 0) {
						alert("Player1 gained one more round!");
						this.changePlayer();
					}
				}
				// if big hole from player 2
				if (indexHole+i == 12 && this.currentPlayer == this.player2) {
					this.bigHoleList[this.player2]++;
					seedsInHole--;
					// if last seed is in current player big hole then player gains a free move
					if (seedsInHole == 0) {
						alert("Player2 gained one more round!");
						this.changePlayer();
					} 
				}
				// distributes seeds in holes
				if (seedsInHole != 0) {
					this.numberOfSeeds[(indexHole+i)%12]++;
					seedsInHole--;
					// capture opponent seeds condition
					if (seedsInHole == 0) {
						// if ends on opponent hole do nothing
						if ((indexHole+i <= 5 && this.currentPlayer == this.player2) || (indexHole+i > 5 && this.currentPlayer == this.player1)) break;
						if (this.numberOfSeeds[(indexHole+i)%12] == 1) {
							// if oppponent has zero seeds breaks
							if (this.numberOfSeeds[11-((indexHole+i)%12)] == 0) break;
							// capture seeds
							if (this.currentPlayer == this.player1) {
								this.bigHoleList[0] += this.numberOfSeeds[(indexHole+i)%12] + this.numberOfSeeds[11-((indexHole+i)%12)];
								alert("You captured the opponents seeds");
							} else {
								this.bigHoleList[1] += this.numberOfSeeds[(indexHole+i)%12] + this.numberOfSeeds[11-((indexHole+i)%12)];
								alert("You captured the opponents seeds");
							}
							// empty player current hole
							this.numberOfSeeds[(indexHole+i)%12] = 0;
							// empty opponent seeds
							this.numberOfSeeds[11-((indexHole+i)%12)] = 0;
						}
					}
				}
				i++;
			}

			// change current player
			this.changePlayer();
			// updates board so we can see the changes
			this.update();
		}

		endGame() {
			// condition to end game
			var end = true;

			// if player 2 has no seeds player 1 collects all of them
			for (let i = 5; i < 12; i++) {
				if (this.numberOfSeeds[i] != 0) end = false;
			}
			if (end) {
				// player 1 collects all of his seeds into bigHole
				for (let i = 0; i < 6; i++) {
					this.bigHoleList[this.player1] += this.numberOfSeeds[i];
				}
			}
			// if player 1 has no seeds player 2 collects all of them
			else {
				end = true;
				for (let i = 0; i < 6; i++) {
					if (this.numberOfSeeds[i] != 0) end = false;
				}
				if (end) {
					// player 2 collects all of his seeds into bigHole
					for (let i = 5; i < 12; i++) {
						this.bigHoleList[this.player1] += this.numberOfSeeds[i];
					}
				}
			}

			// wins the player with more seeds in the bigHoles
			if (end) {
				if (this.bigHoleList[this.player1] > this.bigHoleList[this.player2]) alert("Congratulations, Player1 won the Game!");
				else alert("Congratulations, Player2 won the Game!");
			}
		}

		changePlayer() {
			// updates player if the other player has made its move
			if (this.currentPlayer == this.player2) this.currentPlayer = this.player1;
			else this.currentPlayer = this.player2;
		}

		showCurrentPlayer() {
			// show current player in html
			document.getElementById("player").innerHTML = "Player" + (this.currentPlayer+1) + ", make your move";
		}

		clean() {
			// cleans previous board
			document.getElementById("board").innerHTML = '';
		}

		update() {
			// upates board by cleaning and creating a new one
			// cleans board
			this.clean();
			this.endGame();

			// creates board
			this.showCurrentPlayer();
			this.createBoard();

			// player 1 big hole
			this.createPlayerBigHole(this.player1);
			this.createMidMidDiv();
			this.createInDiv();

			// create player holes for player 1
			for (let i = 5; i >= 0; i--) this.createPlayerHoles(i);
			this.createInDiv();
			// create player holes for player 2
			for (let i = 6; i < 12; i++) this.createPlayerHoles(i);

			// player 2 big hole
			this.createPlayerBigHole(this.player2);
		}
	}
	
	// initializes board
	this.board = new Board();
	// creates board
	this.board.update();
}