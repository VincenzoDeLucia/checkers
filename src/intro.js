class Intro {
  constructor() {
    this.x = 0;
  }

  setup() {
    this.height = HEIGHT;
    this.width = WIDTH;

    startButton = createButton("BATTLE");
    startButton.position(100, 100);
    startButton.addClass("start_button");
    startButton.mousePressed(startGame);
    //startButton.mousePressed("BUTTON PRESSED");
  }

  draw() {
    fill(255, 255, 255, 200);
    rect(75, 100, 100, 100, 100, 40);
    fill(0, 0, 0);
    textSize(14);
    textStyle(BOLD);
    text("Get ready to battle!", 95, 250);
  }
}
