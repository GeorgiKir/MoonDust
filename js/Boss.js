let bossXPosition;
let bossYPosition;
let bossHp = 6;

class Boss {
  constructor(theRoot, enemyList) {
    this.y = 0;
    this.x = 225;
    this.root = theRoot;
    this.domElement = document.createElement("img");
    this.domElement.src = "./images/BOSS1.png";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;
    this.domElement.style.position = "absolute";
    this.root.append(this.domElement);
    this.move();
    this.remainingEnemies = enemyList;
    this.domElement.setAttribute("id", "bossUnit");
    bossXPosition = this.x;
    bossYPosition = this.y;
  }
  move() {
    const bossInterval = setInterval(() => {
      if (
        this.y + ENEMY_HEIGHT < GAME_HEIGHT &&
        this.x + BOSS_WIDTH < GAME_WIDTH &&
        bossXPosition !== "" &&
        bossYPosition !== ""
      ) {
        this.y += 100;
        bossXPosition = this.x;
        bossYPosition = this.y;
        this.domElement.style.top = `${this.y}px`;
      } else if (this.y + ENEMY_HEIGHT >= GAME_HEIGHT) {
        console.log("BOOM NO MORE SHIELD");
        collision = 4;
        this.root.removeChild(this.domElement);
        Engine.bossmode = false;
        Engine.boss = false;
        console.log(Engine.boss);
        bossXPosition = "";
        bossYPosition = "";
        clearInterval(bossInterval);
      } else if (bossXPosition === "" && bossYPosition === "") {
        clearInterval(bossInterval);
        this.root.removeChild(this.domElement);
      }
      // console.log("BOSS MODE:", Engine.bossmode);
    }, 750);
  }
}
