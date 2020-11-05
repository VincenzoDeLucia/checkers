const game = new Game();

function preload() {
  console.log("PRELOAD");
  terrain = loadImage("assets/terrain.jpg");
  cursor = loadImage("assets/cursor.png");
  dev = loadImage("assets/dev.svg");
  tom = loadImage("assets/tom.svg");
  target = loadImage("assets/target.svg");
}

function setup() {
  //let startButton = createButton("Start the Battle!");
  let canvas = createCanvas(WIDTH, HEIGHT + 300);
  game.setUp();

  //console.log(game.board);
}

function draw() {
  clear();
  //background(terrain);
  game.drawGame();
}
