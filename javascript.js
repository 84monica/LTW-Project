// run this function when the document is loaded
window.onload = function() {


	const outer = document.createElement("div");
	const mid_one = document.createElement("div");
	const mid_two = document.createElement("div");
	const mid_three = document.createElement("div");
	const inside_mid_two = document.createElement("div");

	outer.appendChild(mid_one);
	outer.appendChild(mid_two);
	outer.appendChild(mid_three);

	//  -----------------------------------
	// |  ///////     ///////     ///////  |
	// |  /     /     /     /     /     /  |
	// |  /     /     /  /  /     /     /  |
	// |  /     /     /     /     /     /  |
	// |  ///////     ///////     ///////  |
	//  -----------------------------------
	mid_two.appendChild(inside_mid_two);

	outer.style.backgroundColor = "red";
	outer.style.height = "500px";
	outer.style.width = "70%"
	outer.style.margin = "30px";

	outer.style.display = "flex";
	outer.style.justifyContent = "space-around";
	outer.style.marginTop = "2em";
	outer.style.marginLeft = "auto";
	outer.style.marginRight = "auto";


	mid_one.style.backgroundColor = "purple";
	mid_two.style.backgroundColor = "green";
	mid_three.style.backgroundColor = "purple";

	mid_one.style.flexGrow = "1";
	mid_one.style.paddingTop = "1em";
	mid_one.style.paddingBottom = "1em";
	mid_one.style.margin = "1em";
	mid_one.style.border = "1em";

	mid_two.style.flexGrow = "1";
	mid_two.style.paddingTop = "1em";
	mid_two.style.paddingBottom = "1em";
	mid_two.style.margin = "1em";
	mid_two.style.border = "1em";

	mid_three.style.flexGrow = "1";
	mid_three.style.paddingTop = "1em";
	mid_three.style.paddingBottom = "1em";
	mid_three.style.margin = "1em";
	mid_three.style.border = "1em";

	document.body.appendChild(outer);

}