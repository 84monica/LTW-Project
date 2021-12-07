// run this function when the document is loaded
window.onload = function() {
	class Board {
		constructor() {
			this.board;
			this.mid;
			this.midmid;
			this.in;
			this.holes;
			this.seeds = [];
			this.numberOfSeeds = [];
		}

		createBoard() {
			this.board = document.createElement("div");
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
			this.holes = document.createElement("div");
			this.in.appendChild(this.holes);

			// DOESN'T WORK 
			// WHY
			//this.holes.addEventListener("click", this.moveSeed(3));
			this.holes.addEventListener("click", function() {alert ("botão")})

			this.holes.style.display = "flex";
			this.holes.style.backgroundColor = "black";
			this.holes.style.flexGrow = "1";
			this.holes.style.paddingTop = "1em";
			this.holes.style.paddingBottom = "1em";
			this.holes.style.border = "auto";
			this.holes.style.display = "inline-flex";
			this.holes.style.backgroundColor = "#8f6a4a";
			this.holes.style.margin = "1em";
			this.holes.style.borderColor = "black";
			this.holes.style.borderStyle = "solid";
			this.holes.style.borderRadius = "30px";

			// create seeds only one time
			// 0-23 player 1
			// 24-47 player 2
			if (this.seeds.length != 48) {
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
			// shows current seeds
			this.createSeed();
		}

		clean() {
			// cleans previous board
			// ERRO FAZ CLEAN DO CABEÇALHO
			document.body.innerHTML = '';
		}

		update() {
			// upates board by cleaning and creating a new one
			//this.clean();
			this.createBoard();
			this.createPlayerBigHole();
			this.createMidMidDiv();
			this.createInDiv();
			// create player holes for player 1
			for (let i = 0; i < 6; i++) this.createPlayerHoles(i);
			this.createInDiv();
			// create player holes for player 2
			for (let i = 6; i < 13; i++) this.createPlayerHoles(i);
			this.createPlayerBigHole();
		}

		createSeed() {
			// creates seeds
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

		moveSeed(indexHole) {
			// updates number of seeds in class board
			// empties hole
			var seedsInHole = this.numberOfSeeds[indexHole];
			this.numberOfSeeds[indexHole] = 0;

			// distributes seeds counter-clockwise
			for (let i = 1; i <= seedsInHole; i++) {
				if (indexHole-i < 0) this.numberOfSeeds[indexHole-i+8]++;
				else this.numberOfSeeds[indexHole-i]++;
			}
			// updates board so we can see the changes
			this.update();
		}
	}

	// initializes board
	this.board = new Board();
	// creates board
	this.board.update();

	// só para testar função
	this.board.moveSeed(2);
	
	class Game {
		constructor(Board) {
			this.board = Board;
		}
	}

	this.game = new Game(this.board);

}