// run this function when the document is loaded
window.onload = function() {


	const outer = document.createElement("div");
	document.body.appendChild(outer);

	function createMidDiv() {
 		const mid = document.createElement("div");
 		outer.appendChild(mid);

 		mid.style.backgroundColor = "purple";
 		mid.style.flexGrow = "1";
		mid.style.paddingTop = "1em";
		mid.style.paddingBottom = "1em";
		mid.style.margin = "1em";
		mid.style.border = "1em";

	}

	outer.style.backgroundColor = "red";
	outer.style.height = "500px";
	outer.style.width = "70%"
	outer.style.margin = "30px";

	outer.style.display = "flex";
	outer.style.justifyContent = "space-around";
	outer.style.marginTop = "2em";
	outer.style.marginLeft = "auto";
	outer.style.marginRight = "auto";

	createMidDiv();
	createMidDiv();
	createMidDiv();

}