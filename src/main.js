const game = new Game();

function preload() {
  console.log("PRELOAD");
}

function setup() {
  let canvas = createCanvas(1200, 1200);
  game.setUp();
}

function draw() {
  clear();
  game.drawGame();
}
