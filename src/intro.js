class Intro {
  constructor() {}

  setup() {
    startButton = createButton("BATTLE");
    startButton.position(430, 950);
    startButton.addClass("start_button");
    startButton.mousePressed(startGame);
  }

  draw() {
    fill(255, 255, 255, 200);
    rect(0, 0, WIDTH, HEIGHT);
    fill(0, 0, 0);
    textSize(60);
    textStyle(BOLD);
    text("Get ready to battle!", 50, 250);
  }
}
