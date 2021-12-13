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
			document.body.appendChild(this.board);

			this.board.style.backgroundColor = "#dbbb9e";
			this.board.style.height = "500px";
			this.board.style.width = "70%";
			this.board.style.display = "flex";
			this.board.style.justifyContent = "space-around";
			this.board.style.marginTop = "2em";
			this.board.style.marginLeft = "auto";
			this.board.style.marginRight = "auto";
			this.board.style.borderColor = "black";
			this.board.style.borderStyle = "solid";
			this.board.style.borderRadius = "30px";
		}

		createPlayerBigHole(playerIndex) { 
			/* player 1 has index 0; player 2 as index 1  */
			this.bigHole = document.createElement("div");
			this.board.appendChild(this.bigHole);
   
			this.bigHole.style.display = "flex";
			this.bigHole.style.backgroundColor = "#8f6a4a";
			this.bigHole.style.flexGrow = "1";
			this.bigHole.style.paddingTop = "1em";
			this.bigHole.style.paddingBottom = "1em";
			this.bigHole.style.margin = "1em";
			this.bigHole.style.borderColor = "black";
			this.bigHole.style.borderStyle = "solid";
			this.bigHole.style.borderRadius = "30px";
			
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
			this.board.appendChild(this.midDiv);

			this.midDiv.style.justifyContent = "space-around";
			this.midDiv.style.margin = "auto";
			this.midDiv.style.flexGrow = "1";
			this.midDiv.style.paddingTop = "1em";
			this.midDiv.style.paddingBottom = "1em";
			this.midDiv.style.margin = "1em";
			this.midDiv.style.border = "1em";
		}

		createInDiv() {
			this.in = document.createElement("div");
			this.in.style.justifyContent = "space-around";
			this.in.style.height = "50%";
			this.in.style.display = "flex";
			this.midDiv.appendChild(this.in);
		}

		changePlayer() {
			if (this.currentPlayer == this.player2) this.currentPlayer = this.player1;
			else this.currentPlayer = this.player2;
		}

		createPlayerHoles(indexHole) {
			this.hole = document.createElement("div");
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

			this.hole.style.display = "flex";
			this.hole.style.backgroundColor = "black";
			this.hole.style.flexGrow = "1";
			this.hole.style.paddingTop = "1em";
			this.hole.style.paddingBottom = "1em";
			this.hole.style.border = "auto";
			this.hole.style.display = "inline-flex";
			this.hole.style.backgroundColor = "#8f6a4a";
			this.hole.style.margin = "1em";
			this.hole.style.width = "100px"
			this.hole.style.borderColor = "black";
			this.hole.style.borderStyle = "solid";
			this.hole.style.borderRadius = "30px";

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

		showSeeds() {
			// shows current seeds
			this.hole.appendChild(this.createSeed());
		}

		clean() {
			// cleans previous board
			document.getElementById("board").innerHTML = '';
		}

		showCurrentPlayer() {
			document.getElementById("player").innerHTML = "Player" + (this.currentPlayer+1) + ", make your move";
		}

		update() {
			// upates board by cleaning and creating a new one
			// cleans board
			this.clean();

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

		createSeed() {
			// creates seeds
			var seed = document.createElement("div");

			seed.style.paddingTop = "1em";
			seed.style.paddingBottom = "1em";
			seed.style.backgroundColor = "black";
			seed.style.borderRadius = "30px";
			seed.style.flexGrow = "1";
			seed.style.width = "20px";
			seed.style.height = "12px";
			seed.style.justifyContent = "space-aroud";
			seed.style.marginTop = "0.5em";
			seed.style.marginBottom = "0.5em";	
			
			return seed;
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
						document.getElementById("player").innerHTML = "Player" + (this.currentPlayer+1) + ", you gained a free move";
						this.changePlayer();
					}
				}
				// if big hole from player 2
				if (indexHole+i == 12 && this.currentPlayer == this.player2) {
					this.bigHoleList[this.player2]++;
					seedsInHole--;
					// if last seed is in current player big hole then player gains a free move
					if (seedsInHole == 0) {
						document.getElementById("player").innerHTML = "Player" + (this.currentPlayer+1) + ", you gained a free move";
						this.changePlayer();
					} 
				}
				// distributes seeds in holes
				if (seedsInHole != 0) {
					this.numberOfSeeds[(indexHole+i)%12]++;
					seedsInHole--;
					// capture condition
					if (seedsInHole == 0) {
						if (this.numberOfSeeds[(indexHole+i)%12] == 1) {
							if (this.numberOfSeeds[11-((indexHole+i)%12)] == 0) break;
							if (this.currentPlayer == 0) {
								this.bigHoleList[0] += this.numberOfSeeds[(indexHole+i)%12] + this.numberOfSeeds[11-((indexHole+i)%12)];
							} else {
								this.bigHoleList[1] += this.numberOfSeeds[(indexHole+i)%12] + this.numberOfSeeds[11-((indexHole+i)%12)];
							}
							this.numberOfSeeds[(indexHole+i)%12] = 0;
							this.numberOfSeeds[11-((indexHole+i)%12)] = 0;
						}
					}
				}
				i++;
			}
			console.log(indexHole + " facing " + (11-indexHole));
			console.log(this.numberOfSeeds[indexHole] + " - " + this.numberOfSeeds[11-indexHole]);

			//if (indexHole + seedsInHole+1 == 6 && this.currentPlayer == this.player1) console.log("lmao");


			// change current player
			this.changePlayer();
			// updates board so we can see the changes
			this.update();
		}
	}
	
	// initializes board
	this.board = new Board();
	// creates board
	this.board.update();

}