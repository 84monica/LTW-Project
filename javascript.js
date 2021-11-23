// run this function when the document is loaded
window.onload = function() {
	class Board {
		constructor() {
			this.midmid;
			this.outer = document.createElement("div");
			document.body.appendChild(this.outer);
		}
		createOuterDiv() {
			this.outer.style.backgroundColor = "red";
			this.outer.style.height = "500px";
			this.outer.style.width = "70%";

			this.outer.style.display = "flex";
			this.outer.style.justifyContent = "space-around";
			this.outer.style.marginTop = "2em";
			this.outer.style.marginLeft = "auto";
			this.outer.style.marginRight = "auto";
		}

		createMidDiv() {
			const mid = document.createElement("div");
			this.outer.appendChild(mid);
   
			mid.style.display = "flex";
			mid.style.backgroundColor = "purple";
			mid.style.flexGrow = "1";
			mid.style.paddingTop = "1em";
			mid.style.paddingBottom = "1em";
			mid.style.margin = "1em";
			mid.style.border = "1em";
	   }

	   createMidMidDiv() {
			this.midmid = document.createElement("div");
			this.outer.appendChild(this.midmid);

			this.midmid.style.display = "flex";
			this.midmid.style.backgroundColor = "green";
			this.midmid.style.flexGrow = "1";
			this.midmid.style.paddingTop = "1em";
			this.midmid.style.paddingBottom = "1em";
			this.midmid.style.margin = "auto";
			this.midmid.style.border = "1em";
		}

		createInsideMidMid() {
			const inside = document.createElement("div");
			this.midmid.appendChild(inside);

			inside.style.display = "flex";
			inside.style.backgroundColor = "black";
			inside.style.flexGrow = "1";
			inside.style.paddingTop = "1em";
			inside.style.paddingBottom = "1em";
			inside.style.margin = "2em";
			inside.style.border = "1em";
		}
	}

	this.board = new Board();
	this.board.createOuterDiv();
	this.board.createMidDiv();
	this.board.createMidMidDiv();

	for (let i = 0; i < 6; i++) this.board.createInsideMidMid();
	
	this.board.createMidDiv();

}