
// keep the objective in mind: a bot that can successfully play dominion! Woohooo!!

// the goal of purchasing cards is generally to reach a certain deck composition, but a specific order of purchases.

// can keep each card in a prototype
// can keep each cards abilities as parts of an object
// the goal being to be able to buy a card with easy code, so it can be modified easily
// without tangled logic
// also -- hard to modify actions of one player while leaving the other constant, how is that done?

// Nick: can I remove the turnsToWin stat when I log everything in the .total?
	// I can't say if != x then return things, but why?
// Nick: sometimes one player doesn't buy ANYTHING all game just before the infinite loop
// the discard is shuffing back into the deck after the first 5 cards are drawn. It should only shuffle the deck when the deckPointsk has reached 0.


// upgrade .stats.vicPoints to calculate after every phase of each turn -- use it to track changes over time during a game
// create trackers for wins and turns to win to track game optimization
// run 1000 games  -- create stats on average turns to win, avg vic points
// put board into a new object and call it like Player

// TEST:
// start buying dutchy at 3 or fewer province
// start buying estate at 3 or fewer province
// only start buying estate when the game is close and you aren't ahead
// if other player can win on next turn if they buy last province, always buy a green card

//http://wiki.dominionstrategy.com/index.php/Gameplay

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

/*
var prompt = require("prompt");
prompt.start()
prompt.get(["asdf"], function(err, result) {
	console.log(result);
})
exit()*/


function Card(name, cost, vicPoints, cash, playValue) {
	this.card = name;
	this.cost = cost;
	this.vicPoints = vicPoints;
	this.cash = cash;
	this.exist = 1;
	this.playValue = playValue;
}

Card.prototype.buy = function(player) {
	player.cashInPlay -= this.cost;
	player.discard.push(this);   // add to deck
	board[this.card] -= 1			  // subtract 1 from supply
//	console.log (board[this.card], this.card, "board[this.card]")
	player.buys -= 1		  // spend 1 buy
	player.stats.buy += 1   // add buy to stats
	player.stats[this.card] += 1  // add gold to stats
	
	player.totals.buy += 1   // add buy to totals
	player.totals[this.card] += 1  // add gold to totals
	//console.log("Just got",player.printAll());
}



//card costs and values
//var copper = {card: "copper", cost: 0, vicPoints: 0, cash: 1, exist: 1};
//var silver = {card: "silver", cost: 3, vicPoints: 0, cash: 2, exist: 1};
//var gold =   {card: "gold", cost: 6, vicPoints: 0, cash: 3, exist: 1};
var copper = new Card("copper", 0, 0, 1, -1);
var silver = new Card("silver", 3, 0, 2, -1);
var gold   = new Card("gold", 6, 0, 3, -1);

var moneyCards = [copper, silver, gold]

//var estate = 	{card: "estate", cost: 2, vicPoints: 1, cash: 0, exist: 1};
//var dutchy = 	{card: "dutchy", cost: 5, vicPoints: 3, cash: 0, exist: 1};
//var province = 	{card: "province", cost: 8, vicPoints: 6, cash: 0, exist: 1};
var estate = new Card("estate", 2, 1, 0, -1);
var dutchy = new Card("dutchy", 5, 3, 0, -1);
var province = new Card("province", 8, 6, 0, -1);
var curse = new Card("curse", 0, -1, 0, -1);


var victoryCards = [estate, dutchy, province]

// basic supply cards
var smithy = new Card("smithy", 4, 0, 0, 10);
var village = new Card("village", 3, 0, 0, 40);
var laboratory = new Card("laboratory", 5, 0, 0, 50);
var councilRoom = new Card("councilRoom", 5, 0, 0, 30);
var witch = new Card("witch", 5, 0, 0, 20);
var woodcutter = new Card("woodcutter", 3, 0, 2, 15)
var market = new Card("market", 5, 0, 1, 60)
var mine = new Card("mine", 5, 0, 0, 10)
var festival = new Card("festival", 5, 0, 0, 25)


var specialMoney = 0	

// drawing a card should be it's own function
// drawACard(5) should draw 5 cards, and if needbe, shuffle and draw

smithy.action = function(player){
	//console.log(1,player.printHand());
	player.drawCard(3);
	for (var i in player.hand) {
		if (player.hand[i].card == this.card) {
			var card = player.hand.splice(i,1)[0];
			//console.log("???",card);
			player.inPlay.push(card)
		}
	}
	//console.log(2,player.printHand());
}

village.action = function(player){
	player.drawCard(1);
	player.actions += 2;
	for (var i in player.hand) {
		if (player.hand[i].card == this.card) {
			var card = player.hand.splice(i,1)[0];
			player.inPlay.push(card);
			console.log ("I have", player.actions, "actions")
			break;
		}
	}
}

laboratory.action = function(player){
	player.drawCard(2);
	player.actions += 1;
	for (var i in player.hand) {
		if (player.hand[i].card == this.card) {
			var card = player.hand.splice(i,1)[0];
			player.inPlay.push(card);
			console.log ("I have", player.actions, "actions")
			break;
		}
	}
}

councilRoom.action = function(player){
	player.drawCard(4);
	player.buys += 1;
	for (var i in player.hand) {
		if (player.hand[i].card == this.card) {
			var card = player.hand.splice(i,1)[0];
			player.inPlay.push(card);
			console.log ("I have", player.buys, "buys")
			break;
		}
	}
}

witch.action = function(player){
	player.drawCard(2);
	playerTwo.curse()
	for (var i in player.hand) {
		if (player.hand[i].card == this.card) {
			var card = player.hand.splice(i,1)[0];
			player.inPlay.push(card);
			console.log ("I have", player.actions, "actions")
			break;
		}
	}
}

woodcutter.action = function(player){
	player.buys += 1;
	for (var i in player.hand) {
		if (player.hand[i].card == this.card) {
			var card = player.hand.splice(i,1)[0];
			player.inPlay.push(card);
			console.log ("I have", player.buys, "buys")
			break;
		}
	}
}

market.action = function(player){
	player.drawCard(1);
	player.buys += 1
	player.actions += 1
	for (var i in player.hand) {
		if (player.hand[i].card == this.card) {
			var card = player.hand.splice(i,1)[0];
			player.inPlay.push(card);
			console.log ("I have", player.buys, "buys")
			break;
		}
	}
}

mine.action = function(player){
	
	for (var i in player.hand) {
		if (player.hand[i].card == this.card) {
			var card = player.hand.splice(i,1)[0];
			player.inPlay.push(card);
			console.log ("I have", player.actions, "actions")
			break;
		}
	}
//	console.log ("I have trashed",player.trashWorstTreasure()) ;
	var trashedCard = player.trashWorstTreasure() ;
	
	if ((trashedCard == "copper") && (board.silver > 0)) {
		board.silver -= 1
		// if there is a silver on the board
		// subtract it from the board and add it to the deck
//		console.log ("BEFORE", player.discard.length)
		player.hand.push(silver)
		player.stats.silver += 1
		player.totals.silver += 1
		
//		console.log ("AFTER",player.discard.length)
	} else if ((trashedCard == "silver") && (board.gold > 0)) {
		board.gold -= 1
		// if there is a silver on the board
		// subtract it from the board and add it to the deck
//		console.log ("BEFORE", player.discard.length)
		player.hand.push(gold)
		player.stats.gold += 1
		player.totals.gold += 1
		
		
//		console.log ("AFTER",player.discard.length)
	}
		
}

festival.action = function(player){
	specialMoney += 2;
	console.log ("I've played a festival and now have", specialMoney, "Special Money")
	player.buys += 1
	player.actions += 2
	for (var i in player.hand) {
		if (player.hand[i].card == this.card) {
			var card = player.hand.splice(i,1)[0];
			player.inPlay.push(card);
			console.log ("I have", player.buys, "buys")
			break;
		}
	}
}



var numberOfPlayers = 2
var gameCount = 0
var drawFiveCount = 0

Player.prototype.curse = function(){	
	this.discard.push(curse);   // add to deck
	board[curse.card] -= 1	    // subtract 1 from supply
//	console.log (board[this.card], this.card, "board[this.card]")
	this.stats[curse.card] += 1  // add gold to stats
	this.totals[curse.card] += 1  // add curse to totals
	//console.log("Just got",player.printAll());
}

var board = {   
	province: 12,
	dutchy: 12,
	estate: 12,
	
	gold: 30,
	silver: 40,
	copper: 60,
	trash: [],
	curse: 20,
	
	// kingdom cards
	smithy: 10,
	village: 10,
	laboratory: 10,
	councilRoom: 10,
	witch: 10,
	woodcutter: 10,
	market: 10,
	mine: 10,
	festival: 10,
	
	reset: function (){
		this.province = 12;
		this.dutchy = 12;
		this.estate = 12;
	
		this.gold = 30;
		this.silver = 40;
		this.copper = 60;
		this.trash = [];	
		this.curse = 20;
		
		// kingdom cards
		this.smithy = 10;
		this.village = 10;
		this.laboratory = 10;
		this.councilRoom = 10;
		this.witch = 10;
		this.woodcutter = 10;
		this.market = 10;
		this.mine = 10;
		this.festival = 10;
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
	this.stats.cardDraws = 0
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
	this.hide = {}
	this.totals.cardDraws = 0
	this.hide.turnsToWin = []  // is an array for later stats calculations
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
		this.stats.playedFirst = 0
		this.stats.cardDraws = 0
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

Player.prototype.printAll = function () {
	var tempCount = this.deck.concat(this.inPlay.concat(this.hand.concat(this.discard)))
	var counts = {};
	for (var c in tempCount) {
		if (counts[tempCount[c].card] === undefined) {
			counts[tempCount[c].card] = 0;
		}
		counts[tempCount[c].card] += 1;
	}
	return Object.keys(counts).map(function(x) {return x + ": " + counts[x]}).join(", ");
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


// count all copies of (card) and return that number
Player.prototype.cardCountOf = function (cardName) {
	var tempTotal = 0;
	var tempCount = this.deck.concat(this.inPlay.concat(this.hand.concat(this.discard)))
	/*for (i = 0 ; i < tempCount.length ; i++){
		var x = tempCount[i];
		if (x.card === cardName) { 
			console.log (x.card)
			tempTotal += 1
		}
	} */
		//console.log(tempCount.map(function(x) {return x.card}).join(";"));
	for (var i in tempCount) { // $$$
				var x = tempCount[i];
				if (x.card === cardName) { 
					//console.log (x.card)
					tempTotal += 1
					//console.log (tempTotal, "tempTotal")
				}
			}
	return (tempTotal)
	
}

Player.prototype.trashWorstTreasure = function () {
	// tell me the $ values of each treasure in player.hand
	// splice the worst treasure from the hand
	
	for (x in this.hand) {
		var q = this.hand[x]
//		console.log (q.card, "WOOOOOTTT")
		if (q.card === "silver") {
			removedCard = this.hand.splice(x,1)[0]
			console.log ("I'm getting rid of ", removedCard.card)
			board.trash.push (removedCard);
//			console.log ("the trash has", board.trash.length, "cards")
			for (w in board.trash){
				r = board.trash[w]
//				console.log (r.card)
			}
			return (removedCard.card)
		}
		
		if (q.card === "copper") {
			removedCard = this.hand.splice(x,1)[0]
			console.log ("I'm getting rid of ", removedCard.card)
			board.trash.push (removedCard);
//			console.log ("the trash has", board.trash.length, "cards")

			for (w in board.trash){
				r = board.trash[w]
//				console.log (r.card)
			}
			return (removedCard.card)
			
		}
		

			
			
	}
	// return the cost of the treasure trashed
}


Player.prototype.purchasePower = function () {
		
	var handCash = 0	
	for (var c in this.hand) {
		var x = this.hand[c]		
		if (x.cash > 0) {
			handCash += x.cash
		}
	}
 	   return handCash
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
	
	// universal draw a card function, pass # of cards to draw
	Player.prototype.drawCard = function(numCards) {
		// do until numCards
		for (i = 0; i < numCards; i++){
			// if deck, draw a card
			if (this.deck.length > 0){
				this.hand.push(this.deck[0]);
				this.deck.shift();
				this.totals.cardDraws += 1
				// if no deck, shuffle discard into deck
			} else if (this.deck.length === 0){
				shuffleArray(this.discard);
				while (this.discard.length > 0){ // put discard into deck
					this.deck.push(this.discard[0]);
					this.discard.shift();
				}
				// if deck draw a card
				if (this.deck.length > 0){
					this.hand.push(this.deck[0]);
					this.deck.shift();
					this.totals.cardDraws += 1
				}
			}
		
		}
	}
	
	Player.prototype.discardHandCard = function(numCards) {
		for (i = 0 ; i < numCards; i++){
				this.discard.push(this.hand.shift());
				
			};
	}
		
		Player.prototype.discardInPlay = function() {
				while (this.inPlay.length > 0){  // discard inPlay down to 0
					this.discard.push(this.inPlay[0]);
					this.inPlay.shift();
				}
		}

	Player.prototype.drawFive = function() {
		this.drawCard(5)
		
		
	}

		// pick the order of the best card to PLAY
		Player.prototype.pickBestCardToPlay = function () {
			var sorted = this.hand.sort(function (a,b) {return b.playValue-a.playValue});
			//console.log(this.hand.length);
			return sorted[0];
		}

		Player.prototype.playAction = function() {
			console.log (this.name)
//			console.log("\nDo play", this.printHand())
//			console.log("Purchase power", this.purchasePower())
			this.actions = 1;
			while (this.actions > 0) {
				//console.log(this.actions);
				this.actions -= 1;
				var card = this.pickBestCardToPlay();
				if (card && card.action) {
					console.log("Play my", card.card);
					card.action(this);
				}
			}
			console.log("End with", this.printHand())
			
		}
		
		
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
			this.cashInPlay = (this.inPlay.map(function(x){return x.cash})).reduce(function(a,b){return a + b},0);
			this.cashInPlay += specialMoney
			console.log ("I have ",specialMoney, "specialMoney")
			console.log("MONEY", this.name, this.cashInPlay);
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
			console.log (this.cardCountOf("trash"), "trash");
			console.log (this.cardCountOf("gold"), "gold");
		
		}

		//discard cards in hand, if 5 cards in deck draw first five, 
		// if < 5 cards in deck, draw to 0 cards in deck
		// shuffle discard pile into deck, draw remaining cards
		var discardHandDrawFiveCount = 0

		//function discardHandDrawFive(playerHand)
		Player.prototype.discardHandDrawFive = function(){
			specialMoney = 0
			if (this.buys > 0) {this.stats.notEnoughCash += 1}
			// console.log ("discardHandDrawFive process beginning...");
			// console.log ("Discarding this.Hand process started...")
			
			// discard everything
			this.discardHandCard(this.hand.length)	
			this.discardInPlay()
			
			if (this.hand.length < 5){
				this.drawCard(5)
			}
			
			// reset # of buys to 1 for new hand
			this.buys = 1
			
			// stats
			this.stats.turns += 1	
			discardHandDrawFiveCount += 1
			this.totals.turns += 1
			

		}


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
			this.playAction()  // this puts this.Hand $ into play
			this.playMoney()  // this puts this.Hand $ into play
			this.buyMoney()  // buys silver and gold for player 1
			this.discardHandDrawFive()  // this will discard hand and draw 5,
			console.log ("\n")
			//console.log(this.name, this.printAll());
			
		}
		
		Player.prototype.newTurn = function (){
			this.roundCounter(); // puts round box in front of every turn
			this.drawFive();  // draw 5 cards initially
			this.playMoney()  // this puts this.Hand $ into play
			
			this.discardHandDrawFive()  // this will discard hand and draw 5, 
			
		}


		var playerOne = new Player("playerOne");
		var playerTwo = new Player("playerTwo");
		//console.log("????",village);
		playerOne.doSpecial = function() {
			//console.log("\n\n");
			var order = [province, gold, estate, laboratory, market, festival, councilRoom, witch, mine, smithy, woodcutter, village, silver, dutchy];
			var cap =   [1000,     1000,     0,    		  0,	  0,        10,            0,     0,    0,      0,         0,       0,   1000, 	1000];
			if (board.province < 3) {
				order = [province, dutchy, estate, gold, laboratory, festival, market, councilRoom, witch, mine,smithy, village, woodcutter, silver];
				cap =   [1000,     1000,     1000,  1000,         0,        0,       0,           0,    0,    0,     0,       0,          0,       0];
			}
			
			for (var cardIndex in order) {
				var card = order[cardIndex];
				//console.log(this.name, "Consider buying", card.card, "I have", this.cardCountOf(card.card), "and cap is", cap[cardIndex])
				if (this.buys > 0 && board[card.card] > 0 && this.cashInPlay >= card.cost
					&& cap[cardIndex] > this.cardCountOf(card.card)) {
						console.log ("I'm buying a ", card.card);
					card.buy(this);
				}
			}
			
			
			return;
			
			if (this.cashInPlay < 3){
				this.stats.notEnoughCash += 1
				this.totals.notEnoughCash += 1
				
			};
			
			console.log (this.cashInPlay >= 4, this.cashInPlay < 6, this.cardCountOf("smithy")  < 3, 
				this.buys > 0, board.smithy > 0, this.cardCountOf("smithy"))
			
			
			if ((this.cashInPlay >= 4) && (this.cashInPlay < 6) && (this.cardCountOf("smithy") < 3) && 
				(this.buys > 0) && (board.smithy > 0)){
					smithy.buy(this)
					console.log ("yatziee")
					console.log(this.cardCountOf("smithy"))
				}
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

			if ((this.cashInPlay >= 5) && (board.province <= 5) && (board.dutchy > 0) &&
			(this.buys > 0)){ // buy dutchy
				dutchy.buy(this);
			}
			
			if ((this.cashInPlay >= 2) && (this.cashInPlay < 5) && (board.province <= 3) && 
				(this.buys > 0)){
					estate.buy(this);
				}
			
			
			if ((this.cashInPlay >= 6) && (this.cashInPlay < 8) && 
			(this.buys > 0) && (board.gold > 0)){ // buy gold
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
		
		playerTwo.doSpecial = function() {
			if (this.cashInPlay < 3){
				this.stats.notEnoughCash += 1
				this.totals.notEnoughCash += 1
				
			};
			
			if ((this.cashInPlay >= 5) && (this.cashInPlay < 8) && (board.province <= 5) && (board.dutchy > 0) &&
			(this.buys > 0)){ // buy dutchy
				dutchy.buy(this);
			}
			
			if ((this.cashInPlay >= 2) && (this.cashInPlay < 5) && (board.province <= 3) && 
			(this.buys > 0)){
				estate.buy(this);
			}
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
				
		
				while (board.province > 0){ 

	
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
				
//				console.log("ONE",playerOne.printDeck2());
//				console.log("TWO",playerTwo.printDeck2());
				var tempTotalOne = 0;
				var tempTotalTwo = 0;
			 tempTotalOne = playerOne.deck.concat(playerOne.discard.concat(playerOne.inPlay.concat(playerOne.hand))).map
				(function(x) {return x.vicPoints}).reduce(function(x,y){return x+y},0) // add all vicPoints everywhere, 3 for each game for the starting estate
//				console.log (tempTotalOne, "tempTotalOne")
			 tempTotalTwo = playerTwo.deck.concat(playerTwo.discard.concat(playerTwo.inPlay.concat(playerTwo.hand))).map
				(function(x) {return x.vicPoints}).reduce(function(x,y){return x+y},0)			
//				console.log (tempTotalTwo, "tempTotalTwo")
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
				playerOne.totals.vicPoints += playerOne.countVicPoints()
				playerTwo.totals.vicPoints += playerTwo.countVicPoints()

			
			if (tempTotalOne > tempTotalTwo){   // see who wins
//				console.log (tempTotalOne, tempTotalTwo)
				playerOne.hide.turnsToWin.push (playerOne.stats.turns)
				// console.log ("Player 1 Wins!")
				games.winsPlayerOne += 1
	//			playerOne.stats.turnsToWin.push(playerOne.stats.turns);
			}
			if (tempTotalTwo > tempTotalOne ){
//				console.log (tempTotalOne, tempTotalTwo)
				playerTwo.hide.turnsToWin.push (playerTwo.stats.turns)
								
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
			games.differencePercentPlayersBoth = (((games.winsPlayerOne / gameCount)*100) - ((games.winsPlayerTwo / gameCount)*100) + "%")
			
			board.reset(board)   // reset board between games
			playerOne.reset();
			playerTwo.reset();

			
			// console.log (board.province, "board.province" )

		// console.log (gameCount, ": Games played")
		}
	
	}
	
		playGames(200);

	
	
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
			this.totals.meanTurnsToWin = (this.hide.turnsToWin.reduce(function(a,b){return a + b},0) / this.hide.turnsToWin.length)
	    	
			// temp === this.totals.meanTurnsToWin, but must be separate
			temp = (this.hide.turnsToWin.reduce(function(a,b){return a + b},0) / this.hide.turnsToWin.length)
			// calculates variance
			this.totals.variance = this.hide.turnsToWin.map(function(x){return Math.pow((x - temp),2)}).reduce(function(a,b){return a + b},0) / this.hide.turnsToWin.length;
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
			console.log ("\n")
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
		
		
	
	
	
	