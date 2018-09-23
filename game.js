//****variables****
var numSquares = 6;
var colors = [];
var pickedColor;

//****selectors****
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init(); 		// this is the initial function containing all the necesary steps to start the game


//	*********FUNCTIONS apotheke*********

function init(){
	setupButtons();
	setupSquares();
}

//this function setups event listeners for the buttons 1)"easy"+"hard", 2)"reset" 
function setupButtons(){
	for(var i = 0; i < modeButtons.length; i++){							//1) add event listeners for the allthe mode buttons with a loop
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");					//remove class selected from all the buttons in order to add the
			modeButtons[1].classList.remove("selected");					//class in the clicked button
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;	// this is a ternary operator. it works like this>>
			reset();														// if x is true  ? then do y :else do z
		});
	}
	resetButton.addEventListener("click", function(){        				// 2) add event listener to the reset buttonthis resets the game on click. 
		reset(); 								 							// for more info look at reset();
	});
}

//this function sets up the gameplay logic
function setupSquares(){
	reset();														//using the reset(); you initialize the game.
	for (i = 0; i < squares.length; i++) {							//add event listener to every square
	squares[i].addEventListener("click", function(){				//checks if the color that you clicked is the correct
		var clickedColor = this.style.backgroundColor;
		if (clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again?";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
		}
		else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	});													
	}
}

//function for refreshing colors in the color[] array
function changeColors(color){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

//function for picking a random color to eventually form the color[] array
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//function for pushing new random colors, generated from the "pickColor()", to color[] array
function generateRandomColors(num){
	var arr = [];
	for (i = 0; i < num; i++){
		arr.push(randomColor())
	}
	return arr;
}

//function for creating a random RGB color
function randomColor(){
	var r = Math.floor(Math.random() * 256); 	//the RGB colors are 255 but you multiply by 256 (the number you want +1) to get a random number from 0 to x
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; 		//very carefull with this syntax. don't forget the "+" and carefull with the spaces after the ","
}

// fuction that resets the game (I also run this function at the startup of the page to initiate the game, inside the init(); )
function reset(){
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	
	for (i = 0; i < squares.length; i++){						//writing an if statement to make all the squares to appear and 
		if(colors[i]){											//then assing colors only to as many squares as the color[] array has.
			squares[i].style.display = "block";					//make all the squares appear
			squares[i].style.backgroundColor = colors[i];		//assign color only to as many squares as there are colors in the color[] array
		} 
		else {
			squares[i].style.display = "none";					//make all th remaining squares dissapear (in case numSquares is 3)
		}
	h1.style.backgroundColor = "steelblue";
	}
}


