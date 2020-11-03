const game = new Game();

function preload() {
  console.log("PRELOAD");
}

function setup() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  game.setUp();
  //console.log(game.board);
}

function draw() {
  clear();
  game.drawGame();
}
