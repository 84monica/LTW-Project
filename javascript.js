// run this function when the document is loaded
window.onload = function() {
	class Board {
		constructor() {
			this.board;
			this.bigHole;
			this.bigHoleList = [];
			this.midDiv;
			this.in;
			this.hole;
			this.seeds = [];
			this.numberOfSeeds = [];
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
				console.log(playerIndex);
			}

			// show seeds in big holes
			if (this.bigHoleList.length == 2) {
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

		createPlayerHoles(indexHole) {
			this.hole = document.createElement("div");
			this.in.appendChild(this.hole);

			const handler = (e) => {
				// select clicked hole 
				this.moveSeed(indexHole);
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

		update() {
			// upates board by cleaning and creating a new one
			// cleans board
			this.clean();

			// creates board
			this.createBoard();

			// player 1 big hole
			this.createPlayerBigHole(0);
			this.createMidMidDiv();
			this.createInDiv();

			// create player holes for player 1
			for (let i = 5; i >= 0; i--) this.createPlayerHoles(i);
			this.createInDiv();
			// create player holes for player 2
			for (let i = 6; i < 12; i++) this.createPlayerHoles(i);

			// player 2 big hole
			this.createPlayerBigHole(1);
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
			for (let i=1; i<=seedsInHole; i++) {
				// // if big hole from player 1
				// if (indexHole+i == 6) {
				// 	this.bigHoleList[0]++;
				// }
				// // if big hole from player 2
				// if (indexHole+1 == 11) {
				// 	this.bigHoleList[1]++;
				// }
				// else 
				this.numberOfSeeds[(indexHole+i)%12]++;
			}

			// updates board so we can see the changes
			this.update();
		}
	}

	// initializes board
	this.board = new Board();
	// creates board
	this.board.update();
	// O QUE FAZ ISTO?
	[this.board.numberOfSeeds[0], this.board.numberOfSeeds[1], this.board.numberOfSeeds[2], this.board.numberOfSeeds[3], this.board.numberOfSeeds[4], this.board.numberOfSeeds[5]] = [this.board.numberOfSeeds[5], this.board.numberOfSeeds[4], this.board.numberOfSeeds[3], this.board.numberOfSeeds[2], this.board.numberOfSeeds[1], this.board.numberOfSeeds[0]];
	
	class Game {
		constructor(Board) {
			this.board = Board;
		}
	}

	this.game = new Game(this.board);

}