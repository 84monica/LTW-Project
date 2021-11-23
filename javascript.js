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
	outer.style.height = "400px";
	outer.style.margin = "30px";


	document.body.appendChild(outer);


}