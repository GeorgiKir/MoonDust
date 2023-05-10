let shieldXPosition;
let shieldYPosition = Math.floor(Math.random() * 620);
class ShieldBooster {
  constructor(theRoot) {
    this.root = theRoot;
    this.domElement = document.createElement("img");
    this.domElement.src = "./images/SHIELD2.png";
    this.domElement.style.left = "0px";
    this.domElement.setAttribute("id", "shield-power");
    this.domElement.style.zIndex = "100000";
    this.domElement.style.position = "absolute";
    this.domElement.style.top = `${shieldYPosition}px`;
    this.root.append(this.domElement);
    this.shield = [];
    this.shieldMove();
    console.log(`SHIELD IS AT ${shieldYPosition}`);
  }

  shieldMove() {
    shieldXPosition = 0;
    this.domElement.style.top = `${shieldYPosition}px`;
    const shieldInterval = setInterval(() => {
      shieldXPosition += 75;
      this.domElement.style.left = `${shieldXPosition}px`;
      if (shieldXPosition >= 600 - 54) {
        clearInterval(shieldInterval);
        shieldYPosition = 0;
        shieldYPosition = Math.floor(Math.random() * 620);
        this.root.removeChild(this.domElement);
      }
    }, 250);
  }
}
