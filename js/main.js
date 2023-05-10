// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const startWindow = document.getElementById("startWindow");

let myText =
  "You are the only remaining ship able to defend your space station. The enemy is targetting its shields & aims destroy them by going full-on kamikaze on them. Destroy the enemy ships before they reach the shields. Reinforce the shields by picking up shield boosts. Avoid the enemies, you have 4 lives.";
let i = 0;
function typeWriter() {
  if (i < myText.length) {
    document.getElementById("textP").innerHTML += myText.charAt(i);
    i++;
    setTimeout(typeWriter, 45);
  }
}
typeWriter();

const startClick = (event) => {
  startWindow.style.display = "none";
  document.getElementById("app").removeChild(startWindow);
  launchGame();
};

startWindow.style.width = "600px";
startWindow.style.height = "700px";
startWindow.style.background = "url(./images/space-background.jpg)";
startWindow.style.zIndex = "100000";
startWindow.style.margin = "0px auto 0px auto";
document.getElementById("startButton").addEventListener("click", startClick);
document.getElementById("app").append(startWindow);

let gameEngine;

const keydownHandler = (event) => {
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }

  if (event.code === "Space") {
    event.preventDefault();
    gameEngine.player.fireLaser();
  }
};

const launchGame = () => {
  gameEngine = new Engine(document.getElementById("app"));
  document.getElementById("app").style.position = "relative";
  document.getElementById("app").style.width = "600px";
  document.getElementById("app").style.height = "700px";
  document.getElementById("app").style.margin = "0px auto 0px auto";
  // keydownHandler is a variable that refers to a function. The function has one parameter
  // (does the parameter name matter?) which is called event. As we will see below, this function
  // will be called every time the user presses a key. The argument of the function call will be an object.
  // The object will contain information about the key press, such as which key was pressed.

  // We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
  document.addEventListener("keydown", keydownHandler);

  // We call the gameLoop method to start the game

  gameEngine.gameLoop();
  backTrack.play();
};
