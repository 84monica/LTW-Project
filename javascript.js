// run this function when the document is loaded
window.onload = function() {
	class Board {
		constructor() {
			this.board = document.createElement("div");
			this.mid;
			this.midmid;
			this.holes;
			this.seed = document.createElement("div");
			this.seeds = [];

		}

		createBoard() {
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

		createPlayerHoles() {
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

			// create seeds
			for (let i = 0; i < 4; i++) {
				this.seeds.push(this.createSeed());
			}

		}

		createSeed() {
			this.seed = document.createElement("div");
			this.holes.appendChild(this.seed);

			this.seed.style.paddingTop = "1em";
			this.seed.style.paddingBottom = "1em";
			this.seed.style.backgroundColor = "black";
			this.seed.style.borderRadius = "30px";
			this.seed.style.flexGrow = "1";
			this.seed.style.width = "20px";
			this.seed.style.height = "12px";
			this.seed.style.justifyContent = "space-aroud";
			this.seed.style.marginTop = "0.5em";
			this.seed.style.marginBottom = "0.5em";			
		}
	}

	this.board = new Board();
	this.board.createBoard();
	this.board.createPlayerBigHole();
	this.board.createMidMidDiv();

	for (let i = 0; i < 6; i++) this.board.createPlayerHoles();

	this.board.createPlayerBigHole();

	class Game {
		constructor() {

		}
	}
}