// run this function when the document is loaded
window.onload = function() {

	var midmid;
	const outer = document.createElement("div");
	document.body.appendChild(outer);

	outer.style.backgroundColor = "red";
	outer.style.height = "500px";
	outer.style.width = "70%";

	outer.style.display = "flex";
	outer.style.justifyContent = "space-around";
	outer.style.marginTop = "2em";
	outer.style.marginLeft = "auto";
	outer.style.marginRight = "auto";

	function createMidDiv() {
 		const mid = document.createElement("div");
 		outer.appendChild(mid);

 		mid.style.display = "flex";
 		mid.style.backgroundColor = "purple";
 		mid.style.flexGrow = "1";
		mid.style.paddingTop = "1em";
		mid.style.paddingBottom = "1em";
		mid.style.margin = "1em";
		mid.style.border = "1em";
	}

	function createMidMidDiv() {
		midmid = document.createElement("div");
 		outer.appendChild(midmid);

 		midmid.style.display = "flex";
 		midmid.style.backgroundColor = "green";
 		midmid.style.flexGrow = "1";
		midmid.style.paddingTop = "1em";
		midmid.style.paddingBottom = "1em";
		midmid.style.margin = "auto";
		midmid.style.border = "1em";
	}

	function createInsideMidMid() {
		const inside = document.createElement("div");
 		midmid.appendChild(inside);

 		inside.style.display = "flex";
 		inside.style.backgroundColor = "black";
 		inside.style.flexGrow = "1";
		inside.style.paddingTop = "1em";
		inside.style.paddingBottom = "1em";
		inside.style.margin = "2em";
		inside.style.border = "1em";
	}

	createMidDiv();
	createMidMidDiv();

	for (let i = 0; i < 6; i++) createInsideMidMid();
	
	createMidDiv();

}