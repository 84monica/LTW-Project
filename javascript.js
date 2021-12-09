// run this function when the document is loaded
window.onload = function() {
	class Board {
		constructor() {
			this.board;
			this.mid;
			this.midmid;
			this.in;
			this.hole;
			this.holesList = [];
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

		createPlayerBigHole() {
			this.mid = document.createElement("div");
			this.board.appendChild(this.mid);
   
			this.mid.style.display = "flex";
			this.mid.style.backgroundColor = "#8f6a4a";
			this.mid.style.flexGrow = "1";
			this.mid.style.paddingTop = "1em";
			this.mid.style.paddingBottom = "1em";
			this.mid.style.margin = "1em";
			this.mid.style.borderColor = "black";
			this.mid.style.borderStyle = "solid";
			this.mid.style.borderRadius = "30px";
	   }

	   createMidMidDiv() {
			this.midmid = document.createElement("div");
			this.board.appendChild(this.midmid);

			this.midmid.style.justifyContent = "space-around";
			this.midmid.style.margin = "auto";
			this.midmid.style.flexGrow = "1";
			this.midmid.style.paddingTop = "1em";
			this.midmid.style.paddingBottom = "1em";
			this.midmid.style.margin = "1em";
			this.midmid.style.border = "1em";
		}

		createInDiv() {
			this.in = document.createElement("div");
			this.in.style.justifyContent = "space-around";
			this.in.style.height = "50%";
			this.in.style.display = "flex";
			this.midmid.appendChild(this.in);
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
				for (let i = 0; i < 4; i++) {
					this.seeds.push(this.createSeed());
				}
				this.numberOfSeeds.push(4);
			}

			// show seeds if seeds already exists
			else {
				for (let i = 0; i < this.numberOfSeeds[indexHole]; i++) this.showSeeds();
			}

			// push current hole to holes list
			this.holesList.push(this.hole);
		}

		showSeeds() {
			// shows current seeds
			this.createSeed();
		}

		clean() {
			// cleans previous board
			document.getElementById("board").innerHTML = '';
		}

		update() {
			// upates board by cleaning and creating a new one
			this.holesList = [];
			this.clean();
			this.createBoard();
			this.createPlayerBigHole();
			this.createMidMidDiv();
			this.createInDiv();
			// create player holes for player 1
			for (let i = 5; i >= 0; i--) this.createPlayerHoles(i);
			this.createInDiv();
			// create player holes for player 2
			for (let i = 6; i < 12; i++) this.createPlayerHoles(i);
			this.createPlayerBigHole();
			//[this.holesList[0], this.holesList[1], this.holesList[2], this.holesList[3], this.holesList[4], this.holesList[5]] = [this.holesList[5], this.holesList[4], this.holesList[3], this.holesList[2], this.holesList[1], this.holesList[0]];
		}

		createSeed() {
			// creates seeds
			var seed = document.createElement("div");
			this.hole.appendChild(seed);

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
		}

		moveSeed(indexHole) {
			// updates number of seeds in class board
			// empties hole
			var seedsInHole = this.numberOfSeeds[indexHole];
			this.numberOfSeeds[indexHole] = 0;

			// distributes seeds counter-clockwise
			for (let i=1; i<=seedsInHole; i++) {
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