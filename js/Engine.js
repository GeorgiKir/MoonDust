// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
let ennemyPositions;
let rankName = "";
// let bossStatus = false;
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    this.bossmode;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    this.boss = false;
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);
    addLifeCount(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // console.log(ennemyPositions);
    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = ennemyPositions = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    if (scoreCounter >= 2000 && scoreCounter <= 2500) {
      this.bossmode = true;
      // bossStatus = true;
    } else if (scoreCounter >= 6000 && scoreCounter <= 6500) {
      this.bossmode = true;
    } else if (scoreCounter >= 10000 && scoreCounter <= 10500) {
      this.bossmode = true;
    } else {
      this.bossmode = false;
      this.boss = false;
    }

    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    if (this.bossmode) {
      if (!this.boss) {
        // const bossDiv = document.createElement("h1");
        // bossDiv.innerText = "IM THE BOSS";
        let bossDiv = new Boss(document.getElementById("app"), this.enemies);
        this.root.append(bossDiv);
        this.boss = true;
      }
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      if (scoreCounter <= 2000) {
        rankName = "Rookie";
      } else if (scoreCounter > 2000 && scoreCounter <= 4000) {
        rankName = "Novice";
      } else if (scoreCounter > 4000 && scoreCounter <= 6000) {
        rankName = "Adept";
      } else if (scoreCounter > 6000 && scoreCounter <= 8000) {
        rankName = "Skilled Pilot";
      } else if (scoreCounter > 8000 && scoreCounter <= 10000) {
        rankName = "Veteran Pilot";
      } else if (scoreCounter > 10000 && scoreCounter <= 13000) {
        rankName = "Ace Pilot";
      } else if (scoreCounter > 13000) {
        rankName = "Adeptus Astartes";
      }

      document.removeEventListener("keydown", keydownHandler);
      const myNode = document.getElementById("app");
      myNode.style.display = "none";
      document.getElementById("endGameWindow").style.display = "flex";
      document.getElementById(
        "scoreboard"
      ).innerText = `Score: ${scoreCounter}`;
      document.getElementById("rankP").innerText = `Rank :  ${rankName}`;
      return;
    }
    /////////////////////////////
    if (deadEnemies >= 13) {
      deadEnemies = 0;
      new ShieldBooster(this.root);
    }

    if (scoreCounter >= 3000 && scoreCounter <= 6000) {
      MAX_ENEMIES = 5;
    } else if (scoreCounter >= 6100 && scoreCounter <= 9000) {
      MAX_ENEMIES = 6;
    } else if (scoreCounter >= 9100 && scoreCounter <= 12000) {
      MAX_ENEMIES = 7;
    } else if (scoreCounter > 12100) {
      MAX_ENEMIES = 8;
    }

    ///////////////////////
    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    if (collision >= 4 || shieldCounter <= 0) {
      return true;
    }
  };
}
