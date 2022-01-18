// run this function when the document is loaded
window.onload = function() {
	class Board {
		constructor() {
			this.board;
			// big player holes
			this.bigHole;
			this.bigHoleList = [];

			this.midDiv;
			this.in;
			
			// small holes and seeds
			this.hole;
			this.seeds = [];
			this.numberOfSeeds = [];

			// initializes players
			this.player1 = 0; this.player2 = 1;
			this.currentPlayer = this.player1;
		}

		createBoard() {
			this.board = document.getElementById("board");
			this.board.setAttribute('class', 'out');
			document.body.appendChild(this.board);
		}

		createPlayerBigHole(playerIndex) { 
			/* player 1 has index 0; player 2 as index 1  */
			this.bigHole = document.createElement("div");
			this.bigHole.setAttribute('class', 'in');
			this.board.appendChild(this.bigHole);
			
			// initializes big hole number of seeds with 0
			if (this.bigHoleList.length != 2) {
				this.bigHoleList.push(0);
			}

			// show seeds in big holes
			else {
				var numberOfSeeds = this.bigHoleList[playerIndex];
				for (let i = 0; i < numberOfSeeds; i++) {
					var seed = this.createSeed();
					this.bigHole.appendChild(seed);
				}
			}
		}

	    createMidMidDiv() {
			this.midDiv = document.createElement("div");
			this.midDiv.setAttribute('class', 'mid');
			this.board.appendChild(this.midDiv);
		}

		createInDiv() {
			this.in = document.createElement("div");
			this.in.setAttribute('class', 'inn');
			this.midDiv.appendChild(this.in);
		}

		createPlayerHoles(indexHole) {
			this.hole = document.createElement("div");
			this.hole.setAttribute('class', 'in');
			this.in.appendChild(this.hole);

			const handler = (e) => {
				console.log("Move = " + this.currentPlayer + " : " + nameNumber);
				// error if clicks on opponents hole
				if ((indexHole <= 5 && this.currentPlayer == this.player1) || (indexHole > 5 && this.currentPlayer == this.player2)){
					alert("That's the opponent's hole!");
					return;
				}
				// error if click tries to play on opponents hole on server
				if ((this.currentPlayer != nameNumber && nameNumber != -1)){
					alert("That's the opponent's hole!");
					return;
				}

				// notify server
				if (indexHole <= 5) notify(indexHole);
				else notify(indexHole-6);

				// select clicked hole
				this.moveSeed(indexHole);
			};

			// clicks hole
			this.hole.addEventListener("click", handler);

			// create seeds only one time
			// 0-23 player 2
			// 24-47 player 1
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

		createSeed() {
			// creates seeds
			var seed = document.createElement("div");
			seed.setAttribute('class', 'semente');
			
			return seed;
		}

		showSeeds() {
			// shows current seeds
			this.hole.appendChild(this.createSeed());
		}

		moveSeed(indexHole) {
			// updates number of seeds in class board
			// empties hole
			var seedsInHole = this.numberOfSeeds[indexHole];
			this.numberOfSeeds[indexHole] = 0;

			// distributes seeds counter-clockwise
			var i = 1;
			while(seedsInHole > 0) {
				// if big hole from player 2
				if (indexHole+i == 6 && this.currentPlayer == this.player2) {
					this.bigHoleList[this.player2]++;
					seedsInHole--;
					// if last seed is in current player big hole then player gains a free move
					if (seedsInHole == 0) {
						alert(document.getElementById("player2").innerHTML + " gained one more round!");
						this.changePlayer();
					}
				}
				// if big hole from player 1
				if (indexHole+i == 12 && this.currentPlayer == this.player1) {
					this.bigHoleList[this.player1]++;
					seedsInHole--;
					// if last seed is in current player big hole then player gains a free move
					if (seedsInHole == 0) {
						alert(document.getElementById("player1").innerHTML + " gained one more round!");
						this.changePlayer();
					} 
				}
				// distributes seeds in holes
				if (seedsInHole != 0) {
					this.numberOfSeeds[(indexHole+i)%12]++;
					seedsInHole--;
					// capture opponent seeds condition
					if (seedsInHole == 0) {
						// if ends on opponent hole do nothing
						if ((indexHole+i <= 5 && this.currentPlayer == this.player1) || (indexHole+i > 5 && this.currentPlayer == this.player2)){
							console.log("opponent's hole");
							break;
						}
						if (this.numberOfSeeds[(indexHole+i)%12] == 1) {

							// if opponent has zero seeds breaks
							if (this.numberOfSeeds[11-((indexHole+i)%12)] == 0) break;
							// capture seeds
							if (this.currentPlayer == this.player1) {
								this.bigHoleList[0] += this.numberOfSeeds[(indexHole+i)%12] + this.numberOfSeeds[11-((indexHole+i)%12)];
								alert("You captured the opponents seeds");
							} else {
								this.bigHoleList[1] += this.numberOfSeeds[(indexHole+i)%12] + this.numberOfSeeds[11-((indexHole+i)%12)];
								alert("You captured the opponents seeds");
							}
							// empty player current hole
							this.numberOfSeeds[(indexHole+i)%12] = 0;
							// empty opponent seeds
							this.numberOfSeeds[11-((indexHole+i)%12)] = 0;
						}
					}
				}
				i++;
			}

			// change current player
			this.changePlayer();
			// updates board so we can see the changes
			this.update();
		}

		startGameComputer() {
			document.getElementById('player2').innerHTML = "Computer";
		}

		endGame() {
			// condition to end game
			var end = true;

			// if player 1 has no seeds player 2 collects all of them
			for (let i = 5; i < 12; i++) {
				if (this.numberOfSeeds[i] != 0) end = false;
			}
			if (end) {
				// player 1 collects all of his seeds into bigHole
				for (let i = 0; i < 6; i++) {
					this.bigHoleList[this.player2] += this.numberOfSeeds[i];
				}
			}
			// if player 2 has no seeds player 1 collects all of them
			else {
				end = true;
				for (let i = 0; i < 6; i++) {
					if (this.numberOfSeeds[i] != 0) end = false;
				}
				if (end) {
					// player 2 collects all of his seeds into bigHole
					for (let i = 5; i < 12; i++) {
						this.bigHoleList[this.player2] += this.numberOfSeeds[i];
					}
				}
			}

			// wins the player with more seeds in the bigHoles
			if (end) {
				if (this.bigHoleList[this.player1] > this.bigHoleList[this.player2]) alert("Congratulations, " + document.getElementById("player1").innerHTML + " won the Game!");
				else alert("Congratulations, " + document.getElementById("player2").innerHTML + " won the Game!");
			}
		}

		changePlayer() {
			// updates player if the other player has made its move
			if (this.currentPlayer == this.player2)
				this.currentPlayer = this.player1;
			else
				this.currentPlayer = this.player2;
		}

		showCurrentPlayer() {
			// show current player in html
			if (this.currentPlayer == this.player1) document.getElementById("player").innerHTML = document.getElementById("player1").innerHTML + ", make your move";
			else document.getElementById("player").innerHTML = document.getElementById("player2").innerHTML + ", make your move";
		}

		clean() {
			// cleans previous board
			document.getElementById("board").innerHTML = '';
		}

		update() {
			// updates board by cleaning and creating a new one
			// cleans board
			this.clean();
			this.endGame();

			// creates board
			this.showCurrentPlayer();
			this.createBoard();

			// player 2 big hole
			this.createPlayerBigHole(this.player2);
			this.createMidMidDiv();
			this.createInDiv();

			// create player holes for player 2
			for (let i = 5; i >= 0; i--) this.createPlayerHoles(i);
			this.createInDiv();
			// create player holes for player 1
			for (let i = 6; i < 12; i++) this.createPlayerHoles(i);

			// player 1 big hole
			this.createPlayerBigHole(this.player1);

			// if play is against computer
			if (this.currentPlayer == this.player2 && document.getElementById('player2').innerHTML == "Computer") {
				// computer makes random move
				var randomNumber = Math.floor(Math.random() * 6);
				while(this.numberOfSeeds[randomNumber] == 0){
					randomNumber = Math.floor(Math.random() * 6);
				}
				this.moveSeed(randomNumber);
			}
		}
	}
	
	// initializes board
	var board = new Board();
	// creates board
	board.update();

	// computer game
	document.getElementById("pcbtn").addEventListener('click', board.startGameComputer);

	// SERVER
	// ---------------------------------

	// ranking table
	this.ranking = [];

	// game hash
	var gameHash = -1;

	// initializing game to put player names
	this.init = false;

	// storing the name
	var name = "";
	var nameNumber = -1;

	// server functions
	function register(){
		var myHeaders = new Headers();

		var raw = JSON.stringify({
			"nick": document.getElementById('usr').value,
			"password": document.getElementById('pw').value
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("http://twserver.alunos.dcc.fc.up.pt:8008/register", requestOptions)
			.then(response => response.json())
			.then(result => {if (Object.values(result)[0] != undefined) alert(Object.values(result)[0])})
			.catch(error => console.log('error', error));


		// updating debug chat and scrolling to the end of it
		var debugDiv = document.getElementById('debug');
		debugDiv.innerHTML += 'Player registered<br>';
		debugDiv.scrollTop = debugDiv.scrollHeight;
	}

	async function getRanking(){
		var myHeaders = new Headers();

		var raw = JSON.stringify({});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
			mode: 'cors'
		};


		await fetch("http://localhost:8008/ranking", requestOptions)
			.then(response => response.json())
			.then(result => this.ranking = result.ranking)
			.catch(error => console.log('error', error));

		//console.log(this.ranking);

		populateTable(this.ranking);
	}

	function populateTable(list){
        var cols = [];
         
        for (var i = 0; i < list.length; i++) {
            for (var k in list[i]) {
                if (cols.indexOf(k) === -1) {
                     
                    // Push all keys to the array
                    cols.push(k);
                }
            }
        }
         
        // Create a table element
        var table = document.createElement("table");
        // Create table row tr element of a table
        var tr = table.insertRow(-1);
         
        for (var i = 0; i < cols.length; i++) {
             
            // Create the table header th element
            var theader = document.createElement("th");
            theader.innerHTML = cols[i];
             
            // Append columnName to the table row
            tr.appendChild(theader);
        }
         
        // Adding the data to the table
        for (var i = 0; i < list.length; i++) {
             
            // Create a new row
            trow = table.insertRow(-1);
            for (var j = 0; j < cols.length; j++) {
                var cell = trow.insertCell(-1);
                 
        		cell.setAttribute('align', 'center');
                // Inserting the cell at particular place
                cell.innerHTML = list[i][cols[j]];
            }
        }
         
        // Add the newly created table containing json data
        var el = document.getElementById("table");
        el.innerHTML = "";
        el.appendChild(table);
	}

	async function join(group, nick, pass, size, initial) {
		var myHeaders = new Headers();

		name = document.getElementById('usr').value;

		var raw = JSON.stringify({
			"group": 99,
			"nick": document.getElementById('usr').value,
			"password": document.getElementById('pw').value,
			"size": 6,
			"initial": 4
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
			mode: 'cors'
		};

		await fetch("http://twserver.alunos.dcc.fc.up.pt:8008/join", requestOptions)
					.then(response => {return Promise.resolve(response.json())})
					.then(response => {gameHash = response.game, update(), console.log(gameHash)})

		// updating debug chat and scrolling to the end of it
		var debugDiv = document.getElementById('debug');
		debugDiv.innerHTML += 'Player ' + document.getElementById('usr').value + ' joined<br>';
		debugDiv.scrollTop = debugDiv.scrollHeight;
	}

	async function leave(game, nick, pass){
		var myHeaders = new Headers();

		var raw = JSON.stringify({
			"game": gameHash,
			"nick": document.getElementById('usr').value,
			"password": document.getElementById('pw').value,
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
			mode: 'cors'
		};

		await fetch("http://twserver.alunos.dcc.fc.up.pt:8008/leave", requestOptions)
							.then(response => response.json())
							.catch(error => console.log('error', error));	

							
		// updating debug chat and scrolling to the end of it
		var debugDiv = document.getElementById('debug');
		debugDiv.innerHTML += 'Left Game<br>';
		debugDiv.scrollTop = debugDiv.scrollHeight;
	}

	async function notify(move){
		var myHeaders = new Headers();

		var raw = JSON.stringify({
			"nick": document.getElementById('usr').value,
			"password": document.getElementById('pw').value,
			"game": gameHash,
			"move": move
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
			mode: 'cors'
		};

		await fetch("http://twserver.alunos.dcc.fc.up.pt:8008/notify", requestOptions)
							.then(response => response.json())
							.then(result => console.log(result))
							.catch(error => console.log('error', error));

		// updating debug chat and scrolling to the end of it
		var debugDiv = document.getElementById('debug');
		debugDiv.innerHTML += 'Player Move index ' + move + '<br>';
		debugDiv.scrollTop = debugDiv.scrollHeight;
	}

	// update variables
	var started = false;
	var players;

	function update(game, nick){
		var url = "http://twserver.alunos.dcc.fc.up.pt:8008/update?nick=" + document.getElementById('usr').value + "&game=" + gameHash;

		var source = new EventSource(url);
		source.onopen = function(event) {
			console.log("Connected");
		}

		source.onmessage = function(event) {
			var data = JSON.parse(event.data);
			console.log(data);

			// DISPLAY GAME
			var winner = Object.keys(data)[0];
			if (winner == 'winner') {
				var winnerName = Object.values(data)[0];
				alert(winnerName + " won the game!");
			} else {
				if(!started){
					players = Object.keys(data.stores);
					document.getElementById('player1').innerHTML = players[0];
					document.getElementById('player2').innerHTML = players[1];
					if(name == players[0]){
						nameNumber = board.player1;
					}else{
						nameNumber = board.player2;
					}
					board.currentPlayer = board.player1;
					console.log("Player " + nameNumber + ", initiates since the current player is: " + board.currentPlayer);
					started = true;
				}

				// get big hole seeds
				if(data.stores == null) return;
				var bigHoleSeeds = Object.values(data.stores);
				board.bigHoleList[0] = bigHoleSeeds[0];
				board.bigHoleList[1] = bigHoleSeeds[1];

				// get current player
				var currentPlayer = Object.values(data.board)[0];
				console.log(currentPlayer);

				if (players[0] == currentPlayer) board.currentPlayer = board.player1;
				else board.currentPlayer = board.player2;
				
				// get seeds
				var player1Seeds = Object.values(Object.values(Object.values(data.board.sides))[0])[1];
				var player2Seeds = Object.values(Object.values(Object.values(data.board.sides))[1])[1];
				console.log(player1Seeds);
				console.log(player2Seeds);
				// player 1 seeds
				for (i = 0; i < player1Seeds.length; i++) {
					board.numberOfSeeds[i+6] = player1Seeds[i];
				}
				// player 2 seeds
				for (i = 0; i < player2Seeds.length; i++) {
					board.numberOfSeeds[i] = player2Seeds[i];
				}

				// update board
				board.update();
			}

			
  		}
	}

	// buttons
	document.getElementById("regbtn").addEventListener('click', register);
	document.getElementById("jobtn").addEventListener('click', join);
	document.getElementById("lvbtn").addEventListener('click', leave);

	// ranking
	getRanking();
}
