const game = new Game();

function preload() {
  console.log("PRELOAD");
}

function setup() {
  let canvas = createCanvas(1200, 1200);
  game.setUp();
  console.log(game.board);
}

function draw() {
  clear();
  game.drawGame();
}
