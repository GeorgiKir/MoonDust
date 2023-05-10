// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function,
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
let shieldCounter = 150;
let scoreCounter = 0;
const nextEnemySpot = (enemies) => {
  // enemySpots will refer to the number of spots available (can you calculate it?)
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

  // To find out where to place an enemy, we first need to find out which are the spots available.
  // We don't want to place two enemies in the same lane. To accomplish this, we first create an
  // array with 5 elements (why 5?) and each element is false.
  // We then use forEach to iterate through all the enemies.
  // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
  // We can use this property to modify the spotsTaken array.
  const spotsTaken = [false, false, false, false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
  // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
  // We will randomly try different spots until we find out that is available
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * enemySpots);
  }

  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};

// addBackground contains all the logic to display the starry background of the game.
// It is a variable that refers to a function.
// The function takes one parameter
// The parameter represents the DOM node to which we will add the background
const addBackground = (root) => {
  // We create a new img DOM node.
  const bg = document.createElement("img");

  // We set its src attribute and the height and width CSS attributes
  bg.src = "./images/space-background.jpg";
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;

  // We add it to the root DOM node
  root.append(bg);

  // We don't want the enemies to go beyond the lower edge of the image
  // so we place a white div to hide the enemies after they reach the bottom.
  // To see what it does, you can comment out all the remaining lines in the function to see the effect.
  const whiteBox = document.createElement("div");

  // We put a high z-index so that the div is placed over all other DOM nodes
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = "absolute";
  whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.height = `${ENEMY_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH}px`;
  whiteBox.style.background = "black";
  root.append(whiteBox);
};

const addLifeCount = (root) => {
  const heartDiv = document.createElement("div");

  heartDiv.style.height = "64px";
  heartDiv.style.width = "192px";
  heartDiv.style.top = "10px";
  heartDiv.style.left = "10px";
  heartDiv.setAttribute("id", "heartDiv");
  heartDiv.style.position = "absolute";
  heartDiv.style.zIndex = "1000000";

  for (let i = 1; i <= 4; i++) {
    // heartDiv.innerHTML += `<img src="./images/heart-icon.png">`;
    const heartImg = document.createElement("img");
    heartImg.setAttribute("src", "./images/heart-icon.png");
    heartImg.style.marginRight = "-35px";
    heartDiv.appendChild(heartImg);
  }

  const createScoreBoard = document.createElement("div");
  createScoreBoard.setAttribute("id", "scoreBoard");
  createScoreBoard.innerText = `Score: ${scoreCounter}`;
  createScoreBoard.style.marginLeft = "450px";
  createScoreBoard.style.position = "absolute";
  createScoreBoard.style.zIndex = "1000000";
  createScoreBoard.style.top = "30px";
  createScoreBoard.style.color = "white";

  const createPlanetShield = document.createElement("div");
  createPlanetShield.setAttribute("id", "shieldContainer");
  createPlanetShield.style.width = `${shieldCounter}px`;
  createPlanetShield.style.maxWidth = `150px`;
  createPlanetShield.style.height = "25px";
  createPlanetShield.style.backgroundColor = "green";
  createPlanetShield.style.border = "2px solid white";
  createPlanetShield.style.borderRadius = "5px";
  createPlanetShield.style.position = "absolute";
  createPlanetShield.style.zIndex = "1000000";
  createPlanetShield.style.left = "225px";
  createPlanetShield.style.top = "25px";

  root.append(createPlanetShield);
  root.append(createScoreBoard);
  root.append(heartDiv);
};
