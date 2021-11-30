// run this function when the document is loaded
window.onload = function() {
	class Board {
		constructor() {
			this.board;
			this.mid;
			this.midmid;
			this.holes;
			this.seeds = [];
			this.numberOfSeeds = [];
		}

		createBoard() {
			this.board = document.createElement("div")
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

			this.midmid.style.display = "flex";
			this.midmid.style.flexGrow = "1";
			this.midmid.style.paddingTop = "1em";
			this.midmid.style.paddingBottom = "1em";
			this.midmid.style.margin = "auto";
			this.midmid.style.border = "1em";
		}

		createPlayerHoles(indexHole) {
			this.holes = document.createElement("div");
			this.midmid.appendChild(this.holes);

			this.holes.style.display = "flex";
			this.holes.style.backgroundColor = "black";
			this.holes.style.flexGrow = "1";
			this.holes.style.paddingTop = "1em";
			this.holes.style.paddingBottom = "1em";
			this.holes.style.border = "auto";
			this.holes.style.display = "flex";
			this.holes.style.backgroundColor = "#8f6a4a";
			this.holes.style.margin = "1em";
			this.holes.style.borderColor = "black";
			this.holes.style.borderStyle = "solid";
			this.holes.style.borderRadius = "30px";

			// create seeds only one time
			if (this.seeds.length != 24) {
				for (let i = 0; i < 4; i++) {
					this.seeds.push(this.createSeed());
					this.numberOfSeeds.push(4);
				}
			}
			// show seeds if seeds already exists
			else {
				for (let i = 0; i < this.numberOfSeeds[indexHole]; i++) this.showSeeds();
			}
		}

		showSeeds() {
			this.createSeed();
		}

		clean() {
			// cleans previous board
			// DOESNT WORK

			/*
			this.board.style.display = "none";
			this.mid.style.display = "none";
			this.midmid.style.display = "none";
			this.holes.style.display = "none";
			*/
		}

		update() {
			this.clean();
			this.createBoard();
			this.createPlayerBigHole();
			this.createMidMidDiv();
			for (let i = 0; i < 6; i++) this.createPlayerHoles(i);
			this.createPlayerBigHole();
		}

		createSeed() {
			var seed = document.createElement("div");
			this.holes.appendChild(seed);

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
	}

	this.board = new Board();
	this.board.update();


	class Game {
		constructor(Board) {
			this.board = Board;
		}

		buttonclick() {
			// clicks on board holes
			
			/*
			var pagebutton = document.getElementById("selfclick");
			pagebutton.click();
			*/
		}

		moveSeed(indexHole) {
			// updates number of seeds in class board

			// empties hole
			var seedsInHole = this.board.numberOfSeeds[indexHole];
			this.board.numberOfSeeds[indexHole] = 0;

			// distributes seeds

		}
	}

	this.game = new Game(this.board);
	// empies hole index 3
	this.game.moveSeed(3);
	this.board.update();
}