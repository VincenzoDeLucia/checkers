const game = new Game();
const intro = new Intro();
let level = "Intro";

function preload() {
  console.log("PRELOAD");
  terrain = loadImage("assets/terrain.jpg");
  cursor = loadImage("assets/cursor.png");
  dev = loadImage("assets/dev.svg");
  tom = loadImage("assets/tom.svg");
  target = loadImage("assets/target.svg");
}

function setup() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  intro.setup();
}

function draw() {
  clear();
  //background(terrain);
  if (level === "Intro") {
    intro.draw();
  } else {
    game.drawGame();
  }
  if (game.winner) {
    game.drawGameOver();
    noLoop();
  }
}

function startGame() {
  level = "game";
  startButton.hide();
  game.setup();
}
