// const laserArray = [];
let totalScore = 0;

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
    this.sound.currentTime = 0;
  };
}
const myLaserSound = new sound("./audio/laserSound2.mp3");
const explosionSound = new sound("./audio/ExplosionSound1.mp3");
const backTrack = new sound("audio/MOON-DUST.mp3");
const shieldSound = new sound("audio/shield-up-sound.mp3");

class Laser {
  constructor(theRoot, xPosition) {
    this.y = 626;
    this.speed = 2;
    this.domElement = document.createElement("img");
    this.domElement.src = "./images/LAZER.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = xPosition + PLAYER_WIDTH / 2.5;
    this.laserXPos = xPosition;
    this.domElement.style.top;
    this.domElement.style.zIndex = "5000000";
    theRoot.appendChild(this.domElement);
    this.lasertrajectory();
  }

  lasertrajectory() {
    myLaserSound.stop();
    myLaserSound.play();
    const myInterval = setInterval(() => {
      this.y = this.y - 10;
      this.domElement.style.top = this.y + "px";
      if (this.y <= 0) {
        console.log("LASER OUT");
        clearInterval(myInterval);
        document.getElementById("app").removeChild(this.domElement);
      } else if (
        shieldXPosition == this.laserXPos &&
        shieldYPosition >= this.y
      ) {
        console.log("LASER CONNECTED WITH SHIELD");
        document.getElementById("app").removeChild(this.domElement);
        document.getElementById("shield-power").src =
          "./images/BLUE-EXPLOSION.png";
        shieldSound.play();
        scoreCounter += 200;
        if (shieldCounter <= 105) {
          shieldCounter += 45;
        } else if (shieldCounter > 105) {
          shieldCounter = 150;
        }
        document.getElementById(
          "shieldContainer"
        ).style.width = `${shieldCounter}px`;
        setTimeout(() => {
          document.getElementById("shield-power").remove();
        }, 250);
      } else if (
        (bossXPosition === this.laserXPos ||
          this.laserXPos === bossXPosition + PLAYER_WIDTH) &&
        this.y <= bossYPosition &&
        bossYPosition !== "" &&
        bossXPosition !== "" &&
        bossHp > 0
      ) {
        document.getElementById("app").removeChild(this.domElement);
        document.getElementById("bossUnit").src = "";
        setTimeout(() => {
          document.getElementById("bossUnit").src = "./images/BOSS1.png";
        }, 50);
        bossHp = bossHp - 1;
        console.log("THE BOSS IS AT: ", bossHp);
        if (bossHp <= 0) {
          setTimeout(() => {
            document.getElementById("bossUnit").src =
              "./images/BOSS-EXPLOSION1.png";
          }, 100);

          setTimeout(() => {
            const removedBoss = document.getElementById("bossUnit");
            document.getElementById("app").removeChild(removedBoss);
            Engine.bossmode = false;
            Engine.boss = false;
            bossXPosition = "";
            bossYPosition = "";
            scoreCounter += 500;
            bossHp = 6;
          }, 300);
        }
        console.log("BOSS IS HIT");
      } else {
        ennemyPositions.forEach((element) => {
          if (element.x == this.laserXPos && element.y >= this.y) {
            const destroyedShip = element;
            document.getElementById("app").removeChild(this.domElement);
            destroyedShip.domElement.src = "./images/EXPLOSION1.png";
            setTimeout(() => {
              destroyedShip.domElement.src = "./images/EXPLOSION2.png";
            }, 300);
            element.destroyed = true;
            scoreCounter += 100;
            deadEnemies = deadEnemies + 1;
            console.log(`DEAD ENEMIES:`, deadEnemies);
            document.getElementById(
              "scoreBoard"
            ).innerText = `Score: ${scoreCounter}`;
            setTimeout(() => {
              clearInterval(myInterval);
              document
                .getElementById("app")
                .removeChild(destroyedShip.domElement);
            }, 500);
          }
        });
      }
      ////
    }, 10);

    console.log("FIRING LAZR");
  }
}
