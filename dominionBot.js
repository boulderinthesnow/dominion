
// keep the objective in mind: a bot that can successfully play dominion! Woohooo!!

// can keep each card in a prototype
// can keep each cards abilities as parts of an object
// the goal being to be able to buy a card with easy code, so it can be modified easily
// without tangled logic
// also -- hard to modify actions of one player while leaving the other constant, how is that done?

// Nick: can I remove the turnsToWin stat when I log everything in the .total?
	// I can't say if != x then return things, but why?
// Nick: sometimes one player doesn't buy ANYTHING all game just before the infinite loop
// the discard is shuffing back into the deck after the first 5 cards are drawn. It should only shuffle the deck when the deck has reached 0.


// upgrade .stats.vicPoints to calculate after every phase of each turn -- use it to track changes over time during a game
// create trackers for wins and turns to win to track game optimization
// run 1000 games  -- create stats on average turns to win, avg vic points
// put board into a new object and call it like Player

// TEST:
// start buying dutchy at 3 or fewer province
// start buying estate at 3 or fewer province
// only start buying estate when the game is close and you aren't ahead
// if other player can win on next turn if they buy last province, always buy a green card


// find out how reference the player name in the stats


//board {copper{43424,234,,234,3,3434}}
//board.copper.myProperty

/*
To set up for 5 or 6 players, combine the Treasure cards 
from Dominion and Dominion: Intrigue. Use 15 Provinces 
in the Supply for a 5-player game and 18 Provinces in 
the Supply for a 6-player game. All other Victory card 
piles (Estates, Duchies, and Victory Kingdom cards) 
remain at 12 cards per pile*/


console = {
	log: print
}



function Card(name, cost, vicPoints, cash, exist) {
	this.card = name;
	this.cost = cost;
	this.vicPoints = vicPoints;
	this.cash = cash;
	this.exist = 1;
}

Card.prototype.buy = function(player) {
	player.cashInPlay -= this.cost;
	player.discard.push(this);   // add to deck
	board[this.card] -= 1			  // subtract 1 from supply
	console.log (board[this.card], this.card, "board[this.card]")
	player.buys -= 1		  // spend 1 buy
	player.stats.buy += 1   // add buy to stats
	player.stats[this.card] += 1  // add gold to stats
	
	player.totals.buy += 1   // add buy to totals
	player.totals[this.card] += 1  // add gold to totals
}


//card costs and values
//var copper = {card: "copper", cost: 0, vicPoints: 0, cash: 1, exist: 1};
//var silver = {card: "silver", cost: 3, vicPoints: 0, cash: 2, exist: 1};
//var gold =   {card: "gold", cost: 6, vicPoints: 0, cash: 3, exist: 1};
var copper = new Card("copper", 0, 0, 1, 1);
var silver = new Card("silver", 3, 0, 2, 1);
var gold   = new Card("gold", 6, 0, 3, 1);

var moneyCards = [copper, silver, gold]

//var estate = 	{card: "estate", cost: 2, vicPoints: 1, cash: 0, exist: 1};
//var dutchy = 	{card: "dutchy", cost: 5, vicPoints: 3, cash: 0, exist: 1};
//var province = 	{card: "province", cost: 8, vicPoints: 6, cash: 0, exist: 1};
var estate = new Card("estate", 2, 1, 0, 1);
var dutchy = new Card("dutchy", 5, 3, 0, 1);
var province = new Card("province", 8, 6, 0, 1);


var victoryCards = [estate, dutchy, province]

var numberOfPlayers = 2
var gameCount = 0
var drawFiveCount = 0



// create stack for each card pile on the table
// victory
/*
var provinceBoard = 12;
var board.dutchy = 12;
var estateBoard = 12;

// monies
var board.gold = 30;
var board.silver = 40;
var board.copper = 60;*/

/*
var boardSource = {  
	province: 12,
	dutchy: 12,
	estate: 12,
	
	gold: 30,
	silver: 40,
	copper: 60
};*/



var board = {   
	province: 12,
	dutchy: 12,
	estate: 12,
	
	gold: 30,
	silver: 40,
	copper: 60,
	trash: 0,
	reset: function (){
		this.province = 12;
		this.dutchy = 12;
		this.estate = 12;
	
		this.gold = 30;
		this.silver = 40;
		this.copper = 60;
		this.trash = 0;	
	}
};


function copy(deck) {
	return deck.map(function(x) {return x});
}

function Player(n) {
	this.deck = copy(eachPlayersCards);
	shuffleArray(this.deck);
	this.hand = [];
	this.actions = 1;
	this.buys = 1;
	this.inPlay = [];
	this.discard = [];
	this.cashInPlay = [];
	this.name = n;
	
	this.stats = {};
	this.stats.name = n;
	this.stats.turns = 0;
	this.stats.vicPoints = 0;
	this.stats.province = 0;
	this.stats.dutchy = 0;
	this.stats.estate  = 0;
	this.stats.gold = 0;
	this.stats.silver = 0;
	this.stats.buy = 0;
	this.stats.notEnoughCash = 0; // not enough $ to buy any money or victory this turn`
	this.stats.cardTotal
	this.stats.playedFirst = 0
	this.stats.turnsToWin = []  // is an array for later stats calculations
	
	this.totals = {};
	this.totals.turns = 0;
	this.totals.vicPoints = 0;
	this.totals.province = 0;
	this.totals.dutchy = 0;
	this.totals.estate  = 0;
	this.totals.gold = 0;
	this.totals.silver = 0;
	this.totals.buy = 0;
	this.totals.notEnoughCash = 0; // not enough $ to buy any money or victory this turn`
	this.totals.cardTotal
	this.totals.playedFirst = 0
	this.totals.turnsToWin = []  // is an array for later stats calculations
	this.reset = function() {
		this.deck = copy(eachPlayersCards);
		shuffleArray(this.deck);
		this.hand = [];
		this.actions = 1;
		this.buys = 1;
		this.inPlay = [];
		this.discard = [];
		this.cashInPlay = [];
		this.name = n;
	
		this.stats = {};
		this.stats.name = n;
		this.stats.turns = 0;
		this.stats.vicPoints = 0;
		this.stats.province = 0;
		this.stats.dutchy = 0;
		this.stats.estate  = 0;
		this.stats.gold = 0;
		this.stats.silver = 0;
		this.stats.buy = 0;
		this.stats.notEnoughCash = 0; // not enough $ to buy any money or victory this turn`
		this.stats.cardTotal
		this.stats.playedFirst = 0
		this.stats.turnsToWin = []  // is an array for later stats calculations
	
	}

}
 
Player.prototype.buy = function () {
	
	
}


Player.prototype.printHand = function () {
	return this.hand.map(function(x) {return x.card}).join(", ");
}

Player.prototype.printDeck = function () {
	return this.deck.map(function(x) {return x.card}).join(", ");
}

Player.prototype.printDeck2 = function () {
	var counts = {};
	for (var c in this.deck) {
		if (counts[this.deck[c].card] === undefined) {
			counts[this.deck[c].card] = 0;
		}
		counts[this.deck[c].card] += 1;
	}
	return Object.keys(counts).map(function(x) {return x + ": " + counts[x]}).join(", ");
}

Player.prototype.printInPlay = function () {
	return this.inPlay.map(function(x) {return x.card}).join(", ");
}

Player.prototype.printDiscard = function () {
	return this.discard.map(function(x) {return x.card}).join(", ");
}



// each player gets 7 coppers and 3 estate, not from the supply on the table

var eachPlayersCards = [copper, copper, copper, copper, copper, copper,
	copper, estate, estate, estate];


	// tell me how many victory points are in the starting deck
	deckPoints = (eachPlayersCards.map(function(x){return(x.vicPoints); }))
//	 console.log(deckPoints.reduce(function(a,b){return a + b}), "vicPoints");

	// tell me how much money is in the starting deck
	deckCash = (eachPlayersCards.map(function(x){return(x.cash); }))
	//	// console.log(deckCash.reduce(function(a,b){return a + b}), "cash");

	// rand (eachPlayersHand) 7 copper, 3 estate and put result in an array for each player 


	// tracking stats for each player to use in testing/optimization
	
	//playerOne.name = "playerOne"
	//playerTwo.name = "playerTwo"


	function shuffleArray(array){
		for (var i = array.length - 1 ; i > 0 ; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			//					// console.log (j)
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	// draw 5 cards from the deck
	// interate over deck, push to new array until i = 4
	// shift deck arr by 5

	Player.prototype.drawFive = function() {
		
		
		while ((this.hand.length < 5) && (this.deck.length > 0)){
		 console.log ("drawing 5 process started...")
			this.hand.push(this.deck[0]);
			//				// console.log(playerOneHand, "playerOneHand");
			//				// console.log(playerOneHand.length, "playerOneHand.length")
			//				// console.log(playerOneDeck[0], "playerOneDeck[0]");
			this.deck.shift();	
		}
		
	}



		// tell me how much money is in the hand
		//	var handCash = (playerOneHand.map(function(x){return(x.cash)}));
		//	handCash = handCash.reduce(function(a,b){return a + b});	
		//	// console.log(handCash)

		//	// console.log (playerOneHand, "playerOneHand");
		//	// console.log (playerOneDeck, "playerOneDeck");

		// buy the most expensive money card you can

		// this function will buy the most expensive money it can
		// and put that money in the discard pile	


		Player.prototype.playMoney = function() {  // this will play $ into playerOneInPlay
			// console.log ("playing money process started...");
			//			// console.log ("Playing $ for player one...");
			for (var q = this.hand.length - 1 ; q >= 0 ; q--){ // play $ from hand 
				if (this.hand[q].cash === 1) {
					this.hand.splice(q,1);
					this.inPlay.push(copper);  // into play
				}
			}		
			for (var q = this.hand.length - 1 ; q >= 0 ; q--){
				if (this.hand[q].cash === 2) {
					this.hand.splice(q,1);
					this.inPlay.push(silver);
				}
			}
			for (var q = this.hand.length - 1 ; q >= 0 ; q--){
				if (this.hand[q].cash === 3) {
					this.hand.splice(q,1);
					this.inPlay.push(gold);
				}	
			}
			//			// console.log (playerOneHand, "playerOneHand");
			//			// console.log (playerOneInPlay, "playerOneInPlay");

		}


		Player.prototype.buyMoney = function() {
			// console.log ("buying money process started...")
			// console.log ("Buying money for player...")
			// tell me how much $ is in play (arr)

			//this.cashInPlay = (this.inPlay.map(function(x){return x.cash}));
			//console.log(this.cashInPlay.reduce(function(a,b){return a + b},0));
			
			this.cashInPlay = (this.inPlay.map(function(x){return x.cash})).reduce(function(a,b){return a + b},0);
			console.log(this.cashInPlay, "cashInPlay", this.name)
			console.log(this.inPlay.map(function(x){return x.cash}))
			
			this.doSpecial();
			
	

		}
		

		Player.prototype.endGame = function(){   // discards hand to 0
			// console.log("Game over, man -- discarding players down to 0")
			// discard all players down to zero
			while (this.hand.length > 0){
				this.discard.push(this.hand[0]);
				this.hand.shift();
			}
			while (this.discard.length > 0){
				this.deck.push(this.discard[0]);
				this.discard.shift();
			}
		}

		//discard cards in hand, if 5 cards in deck draw first five, 
		// if < 5 cards in deck, draw to 0 cards in deck
		// shuffle discard pile into deck, draw remaining cards
		var discardHandDrawFiveCount = 0

		//function discardHandDrawFive(playerHand)
		Player.prototype.discardHandDrawFive = function(){
			//console.log("Do discard hand:");
			//console.log(this.printHand());
			//console.log(this.printDeck());
			//console.log(this.printDiscard());
			if (this.buys > 0) {this.stats.notEnoughCash += 1}
			// console.log ("discardHandDrawFive process beginning...");
			// console.log ("Discarding this.Hand process started...")
			while (this.hand.length > 0){   // discard hand down to 0
				this.discard.push(this.hand[0]);
				this.hand.shift();
			};
			// console.log (this.hand.length, "Cards in hand");
	
			while (this.inPlay.length > 0){  // discard inPlay down to 0
				this.discard.push(this.inPlay[0]);
				this.inPlay.shift();
			}
			// console.log(this.inPlay.length, "Cards in play");
			// console.log(this.discard.length, "Cards in discard");
			if ((this.hand.length < 5 ) && (this.deck.length >= 5 )){
				console.log ("foo");
				while (this.hand.length < 5){
					this.hand.push(this.deck[0]);
					this.deck.shift();
					//console.log ("Drawing a card...", this.hand.length, "cards in hand,", 
					//this.deck.length, "cards in deck" );
				};
			};
			// console.log (this.deck.length, "Cards in deck");
			// console.log ((this.deck.length + this.discard.length + this.hand.length + this.inPlay.length), "total cards for", this.name)
			// if deck length is < 5, draw until deck length is 0
			// shuffle discard, put discard into deck, draw until hand is 5
			if ((this.hand.length < 5) && (this.deck.length < 5 )) {
				// while hand is < 5 and deck cards above 0
				while (this.hand.length < 5 && this.deck.length > 0){ 
					this.hand.push(this.deck[0]);
					this.deck.shift();
				};
				// if hand is < 5 and there are no cards in the deck, shuffle discard
				// back into the deck, and draw until you have 5 cards
				if ((this.hand.length < 5) && (this.deck.length === 0)){
					shuffleArray(this.discard);      // shuffle discard
					while (this.discard.length > 0){ // put discard into deck
						this.deck.push(this.discard[0]);
						this.discard.shift();
						//				// console.log ("pushing discard to deck: Deck Size",this.deck.length);
					};
					// draw from new shuffled deck until have 5 cards in hand
					while ((this.hand.length < 5) && (this.deck.length > 0)){
						this.hand.push(this.deck[0]);
						this.deck.shift();	
						// console.log ("pushing deck to hand until 5:",this.hand.length);
				
					}
				};	
		
			};
			// if deck is 0, and discard pile > 0, shuffle discard into deck
			/*
			if ((this.Deck.length === 0) && (this.Discard.length > 0)){
			// console.log (this.Deck.length, "cards in deck, shuffling discard into deck")
			shuffleArray(this.Discard);
			while (this.Discard.length > 0){
			this.Deck.push(this.Discard[0]);
			this.Discard.shift();
			};
		
			};*/
			// console.log(playerOne.discardHandAndDrawFive)

			// console.log(this.deck.length, "Cards in deck");
	
			discardHandDrawFiveCount += 1
			this.buys = 1
			this.stats.turns += 1	
			
			this.totals.turns += 1
			

			//console.log("End discard hand:");
			//console.log(this.printHand());
			//console.log(this.printDeck());
			//console.log(this.printDiscard());	
			
			
			// console.log ("Discarded and draw 5 has occurred ", discardHandDrawFiveCount, " times")	
		}

		// create a player prototype that checks to see if the total number of cards has decreased
		// freak out if it has

		// if card card is reduced over previous total, alert

		Player.prototype.roundCounter = function(){
			// console.log ("************")
			// console.log ("*          *")
			if (this.stats.turns.toString().length === 1) {    // makes it so the box around turns doesn't look all funky
				// console.log ("*   ", this.stats.turns,"    *")
		
			}
			if (this.stats.turns.toString().length === 2 ){
				// console.log ("*   ", this.stats.turns,"   *")
			}	
			if (this.stats.turns.toString().length === 3 ){
				// console.log ("*   ", this.stats.turns,"  *")
			}	
			// console.log ("*          *")
			// console.log ("*          *")
	
		}

		Player.prototype.turn = function(){
			this.roundCounter(); // puts round box in front of every turn
			this.playMoney()  // this puts this.Hand $ into play
			this.buyMoney()  // buys silver and gold for player 1
			this.discardHandDrawFive()  // this will discard hand and draw 5, 

		}
		
		Player.prototype.newTurn = function (){
			this.roundCounter(); // puts round box in front of every turn
			this.drawFive();  // draw 5 cards initially
			this.playMoney()  // this puts this.Hand $ into play
			
			this.discardHandDrawFive()  // this will discard hand and draw 5, 
			
		}


		var playerOne = new Player("playerOne");
		var playerTwo = new Player("playerTwo");
		playerTwo.doSpecial = function() {
			if (this.cashInPlay < 3){
				this.stats.notEnoughCash += 1
				this.totals.notEnoughCash += 1
				
			};
			// tell me how much $ is in play (combined)
			//this.cashInPlay = this.cashInPlay.reduce(function(a,b){return a + b},0);
			// console.log (this.cashInPlay, this.name, ": cash in play")
			// console.log (this.buys, this.name,": buys")
			// if enough $ for gold, buy gold, put in deck, remove 1 from supply
			if ((this.cashInPlay >= 6) && (this.cashInPlay < 8) && 
			(this.buys > 0) && (board.gold > 0)){ // buy gold
				gold.buy(this);
				//				// console.log (this.Discard, "this.Discard");
				// console.log (this.cashInPlay, this.name,"CashInPlay remaining");
				// console.log (board.gold, "board.gold", "have purchased ", 30 - board.gold, " golds" );
				
			} else if ((this.cashInPlay >= 3) && (this.cashInPlay < 6) && 
			(this.buys > 0) && (board.silver > 0)){ // buy silver
				silver.buy(this);
				//				// console.log (this.Discard, "this.Discard");
				// console.log (this.cashInPlay, this.name,"CashInPlay remaining");
				// console.log (board.silver, "board.silver", "have purchased ", 40 - board.silver, " silvers" );
	
			};
			
			if ((this.cashInPlay >= 8) && (board.province > 0) &&
			(this.buys > 0)){ // buy province
				province.buy(this);
				
				// console.log (this.cashInPlay, this.name, "CashInPlay");
				// console.log (board.province, ": Provinces remaining" );
			};
		}
		playerOne.doSpecial = function() {
			if (this.cashInPlay < 3){
				this.stats.notEnoughCash += 1
				this.totals.notEnoughCash += 1
				
			};
			// tell me how much $ is in play (combined)
			//this.cashInPlay = this.cashInPlay.reduce(function(a,b){return a + b},0);
			// console.log (this.cashInPlay, this.name, ": cash in play")
			// console.log (this.buys, this.name,": buys")
			// if enough $ for gold, buy gold, put in deck, remove 1 from supply

				
			if ((this.cashInPlay >= 8) && (board.province > 0) &&
			(this.buys > 0)){ // buy province
				province.buy(this);
			
				// console.log (this.cashInPlay, this.name, "CashInPlay");
				// console.log (board.province, ": Provinces remaining" );
			}
			//console.log((this.cashInPlay >= 5), (board.province <= 7), (board.dutchy > 0), (this.buys > 0));

			if ((this.cashInPlay >= 5) && (board.province <= 3) && (board.dutchy > 0) &&
			(this.buys > 0)){ // buy province
				dutchy.buy(this);
			
				// console.log (this.cashInPlay, this.name, "CashInPlay");
				// console.log (board.province, ": Provinces remaining" );
			}
			
			
			if ((this.cashInPlay >= 6) && (this.cashInPlay < 8) && 
			(this.buys > 0)){ // buy gold
				gold.buy(this);
				//				// console.log (this.Discard, "this.Discard");
				// console.log (this.cashInPlay, this.name,"CashInPlay remaining");
				// console.log (board.gold, "board.gold", "have purchased ", 30 - board.gold, " golds" );
			
			} else if ((this.cashInPlay >= 3) && (this.cashInPlay < 6) && 
			(this.buys > 0)){ // buy silver
				silver.buy(this);
				//				// console.log (this.Discard, "this.Discard");
				// console.log (this.cashInPlay, this.name,"CashInPlay remaining");
				// console.log (board.silver, "board.silver", "have purchased ", 40 - board.silver, " silvers" );

			};
				//}
			
			
		}


		var games = {}
		 games.winsPlayerOne = 0
		 games.winsPlayerTwo = 0
		 games.tiesPlayersBoth = 0
		 games.winsPercentPlayerOne = 0

/*
		function Games(n){
		 this.board = board
		 this.stats = {};
		 this.stats.WinsPlayerOne = 0
		 this.stats.WinsPlayerTwo = 0
		 this.stats.TiesPlayersBoth = 0
		// playGames(n)
		}
		*/

		// create an array with number of players
		// randomly select a number between 1 and number of players
		// number that comes up is first player
		// map over array so that new array has selected player in position 1
		// and the remaining players in order follow
		
		Player.prototype.countVicPoints = function() {
			
			 tempTotal = this.deck.concat(this.discard.concat(this.inPlay.concat(this.hand))).map
				(function(x) {return x.vicPoints}).reduce(function(x,y){return x+y},0)	
		return tempTotal
		}
		
		
		
		function playGames(x){
			//		gameCount = 0
			//var temp = Math.floor((Math.random() * 2) + 1) // rand between 1 and 2
			temp = 0
	//		temp = Math.floor((Math.random() * 2) + 1)
			

			playerOne.drawFive();  // draw 5 cards initially
			playerTwo.drawFive();  // draw 5 cards initially
			
			while (gameCount < x){
				console.log(gameCount, "Games Played");
				playerOne.totals.estate += 3
				playerTwo.totals.estate += 3
				
						
				if (gameCount % 2 === 0){temp = 1};
				if (gameCount % 2 !== 0){temp = 2};
				
				fishBait = 0
		
				while (board.province > 0){ 
					if (board.province === 12){
						fishBait +=1
						if (fishBait === 100){
							console.log (board.province, "board.province")
							throw "a goose";
						}
					}
					//console.log ("dickfingers")
					
					//console.log("1hand   ",playerOne.printHand());
					//console.log("1deck   ",playerOne.printDeck());
					//console.log("1discard",playerOne.printDiscard());
					if (temp === 1){ 
						playerOne.turn();
						if (playerOne.stats.turns === 1){	// if played first
							playerOne.totals.playedFirst += 1  // increase totals of played first
						}
						if (board.province > 0){  // stops 2nd player from playing after board.province = 0
							playerTwo.turn();
						}
						
				
					} else if ( temp === 2){
						
						playerTwo.turn();
						
						if (playerTwo.stats.turns === 1){
							playerTwo.totals.playedFirst += 1
						}
						if (board.province > 0){  // stops 2nd player from playing after board.province = 0
							playerOne.turn();
						}
					}
				
				}
			
				playerOne.endGame();  // discard hand to 0 (later will count vic tokens etc)
				playerTwo.endGame();  // discard hand to 0 (later will count vic tokens etc)
				
				console.log("ONE",playerOne.printDeck2());
				console.log("TWO",playerTwo.printDeck2());
				var tempTotalOne = 0;
				var tempTotalTwo = 0;
			 tempTotalOne = playerOne.deck.concat(playerOne.discard.concat(playerOne.inPlay.concat(playerOne.hand))).map
				(function(x) {return x.vicPoints}).reduce(function(x,y){return x+y},0) // add all vicPoints everywhere, 3 for each game for the starting estate
			 tempTotalTwo = playerTwo.deck.concat(playerTwo.discard.concat(playerTwo.inPlay.concat(playerTwo.hand))).map
				(function(x) {return x.vicPoints}).reduce(function(x,y){return x+y},0)			
				
/*
			if (tempTotalOne + tempTotalTwo != 78){
					console.log ('BLLLLARRRRRGGHHHH');
					console.log (tempTotalOne, "+", tempTotalTwo, "=",tempTotalOne + tempTotalTwo );
					console.log ("should be:", 78)
					console.log (playerOne.deck.length)
					console.log (playerOne.hand.length)
					console.log (playerOne.inPlay.length)
					console.log (playerOne.discard.length)
					
					
					
				} // if totals are wrong*/

			
			if (tempTotalOne > tempTotalTwo){   // see who wins
//				console.log (tempTotalOne, tempTotalTwo)
				playerOne.totals.vicPoints += playerOne.countVicPoints()
				playerOne.totals.turnsToWin.push (playerOne.stats.turns)
				// console.log ("Player 1 Wins!")
				games.winsPlayerOne += 1
	//			playerOne.stats.turnsToWin.push(playerOne.stats.turns);
			}
			if (tempTotalOne < tempTotalTwo){
//				console.log (tempTotalOne, tempTotalTwo)
				playerTwo.totals.vicPoints += playerTwo.countVicPoints()
				playerTwo.totals.turnsToWin.push (playerTwo.stats.turns)
								
//				console.log (playerOne.countVicPoints())
				// console.log ("Player 2 Wins!")
				games.winsPlayerTwo += 1
			}
			if (tempTotalOne === tempTotalTwo){
			//	 console.log ("Tie Game!")
				games.tiesPlayersBoth += 1
			}
			gameCount +=1
			games.winsPercentPlayerOne = (Math.floor((games.winsPlayerOne / gameCount )*100) + "%"); // ### move this to a better place -- runs every time
			games.winsPercentPlayerTwo = (Math.floor((games.winsPlayerTwo / gameCount )*100) + "%");
			games.tiesPercentPlayersBoth = (Math.floor((games.tiesPlayersBoth / gameCount )*100) + "%");

			board.reset(board)   // reset board between games
			playerOne.reset();
			playerTwo.reset();

			
			// console.log (board.province, "board.province" )

		// console.log (gameCount, ": Games played")
		}
	
	}
	
		playGames(500);

	
	
//	for (var i = 0 ; i < 50 ; i++){
	//	console.log (i)
//	var wtf = playGames(1)
//		console.log (wtf)
		
		
//	console.log ("Darren Sucks")
//	}

/*
		games.chiSquare = chiSquare(numberOfPlayers - 1,90,100,60,50)

	function chiSquare(df, ob, ex, ob2, ex2){ // df = degrees of freedom
		console.log (df, ob, ex, ob2, ex2);
		// ob = observed, ex = expected
		var temp = Math.pow((ob - ex), 2) / ob;
		console.log (temp, "DJDDJDJDJ")
		console.log (temp);
		var temp = Math.pow((90 - 100), 2) / 90;
		console.log (temp, "DJDDJDJDJ")
		
		var temp2 = Math.pow((ob2 - ex2), 2) / ob2;
		
		console.log (temp2);
		console.log (temp + temp2);
		var chiSquare = (temp + temp2);
		return (chiSquare);
	}

*/



		// console.log(playerOne.deck.concat(playerOne.discard).map(function(x) {return x.vicPoints}).reduce(function(x,y){return x+y},0))
		// console.log(playerTwo.deck.concat(playerTwo.discard).map(function(x) {return x.vicPoints}).reduce(function(x,y){return x+y},0))

		// console.log (playerOne.deck.concat(playerOne.discard).map(function(x) {return x.vicPoints}).reduce(function(x,y){return x+y},0)
	//	+ (playerTwo.deck.concat(playerTwo.discard).map(function(x) {return x.vicPoints}).reduce(function(x,y){return x+y})))
		// console.log (board.gold, "board.gold", board.province, "board.province");

		// write a function that check through hand, discard, deck and inplay and counts all victory points
/*
		Player.prototype.countAllVicPoints = function(){	
			// console.log ("*****************************************")
			var count = 0
			var temp = 0

			if (this.hand.length > 0){  // WHATS IN THE HAND
				temp = this.hand.map(function(x){return x.vicPoints})
			
				//			// console.log(this.hand.map(function(x){return x.card}))

			
				temp = temp.reduce(function(a,b){return a+b},0)
				//			// console.log (temp, "hand count of vicPoints", this.name);
				count += temp
				//			// console.log (count, ": total running count of vicPoints: ", this.name);
			}  
			if (this.deck.length > 0){  // WHATS IN THE DECK
				temp = this.deck.map(function(x){return x.vicPoints})
				//			// console.log ("****")
				//			// console.log ( this.deck.map(function(x){return x.card}))  // tell me what in the deck
				//			// console.log ("****")
			
				temp = temp.reduce(function(a,b){return a + b},0)
				//			// console.log (temp, ": deck count of vicPoints: ", this.name);
				count += temp
				//			// console.log (count, ": total running count of vicPoints:", this.name);
			}
			if (this.discard.length > 0){  // WHATS IN THE DISCARD
				temp = this.discard.map(function(x){return x.vicPoints})
				//			// console.log ("%%%%%%")
			
				//			// console.log (this.discard.map(function(x){return x.card}))  // tell me what in the discard
				//			// console.log ("%%%%%%")
			
				temp = temp.reduce(function(a,b){return a + b},0)
				//			// console.log (temp, ": discard count of vicPoints: ", this.name);
				count += temp
				//			// console.log (count, "total running count of vicPoints" , this.name);
			}
			this.stats.vicPoints += count
			this.stats.vicPoints += (3 * (gameCount - 1));  // makes it so estate prior to the last hand are counted
			//		// console.log (this.stats.vicPoints, ": Total Count of VicPoints,", this.name)
			return (count);
		
		}
		playerOne.countAllVicPoints();   // count all VicPoints
		playerTwo.countAllVicPoints();
		
*/

		
		Player.prototype.math = function (){  // used to store calculations
		//mean turns to win or tie
			this.totals.meanTurnsToWin = (this.totals.turnsToWin.reduce(function(a,b){return a + b},0) / this.totals.turnsToWin.length)
	    	
			// temp === this.totals.meanTurnsToWin, but must be separate
			temp = (this.totals.turnsToWin.reduce(function(a,b){return a + b},0) / this.totals.turnsToWin.length)
			// calculates variance
			this.totals.variance = this.totals.turnsToWin.map(function(x){return Math.pow((x - temp),2)}).reduce(function(a,b){return a + b},0) / this.totals.turnsToWin.length;
			// calculates SD
			this.totals.standardDev = Math.sqrt(this.totals.variance);
			
	     
		 
		 //temp =	((x - this.totals.meanTurnsToWin)*2)})
				
		//mean victory points per game 	
		// calcuate the correlation (p value) between number of turns and number of wins
		
			// p value calc: I would expect that with the same strategy, the number of win over 1000 games would be 500/500

		
				
			
		
		}
		playerOne.math();   
		playerTwo.math();   
				

		Player.prototype.allStats = function(){
			// console.log (this.stats.vicPoints)
			for (x in this.totals){  // print out playerOne stats
				 console.log (x, ":", this.totals[x])
			}
			 console.log ("")
		}

		playerOne.allStats();  // print out all stats
		playerTwo.allStats();
		
		
		
		for (x in games){
			 console.log (x, ":", games[x])
		}

		//check for correct total vic points
		if (playerOne.stats.vicPoints + playerTwo.stats.vicPoints != (78 * gameCount )){
			// console.log ("Total is incorrect")
			// console.log ((playerOne.stats.vicPoints + playerTwo.stats.vicPoints))
			// console.log (playerOne.stats.vicPoints, "PlayerOne vicPoints");
			// console.log (playerTwo.stats.vicPoints, "PlayerTwo vicPoints");
			// console.log((playerOne.stats.vicPoints + playerTwo.stats.vicPoints) - (78 * gameCount), "points off")


		
		} 

		// create a playerOneTotal object that keeps track of golds, silvers, deck size,
		// number of discards, number of buys used, turns to 0 province
		
		
	
	
	
	