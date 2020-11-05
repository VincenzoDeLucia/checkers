class Game {
  constructor() {
    this.orangeCursor = new Cursor("orange", 3, 1);
    this.cyanCursor = new Cursor("cyan", 4, 6);
    this.inactivePieces = [];
    this.board = [];
    this.activeCursor = this.orangeCursor;
    this.activeOrangePieces = [];
    this.activeCyanPieces = [];
    this.activePieces = [];
    this.orangeScore = 0;
    this.cyanScore = 0;
    this.level = 1;
    this.winner = "";
  }

  setup() {
    let newRow = [];
    for (let i = 0; i < 8; i++) {
      for (let l = 0; l < 8; l++) {
        newRow.push({
          col: i,
          row: l,
          occupied: false,
          occupiedBy: null,
        });
      }
      this.board.push(newRow);
      newRow = [];
    }
    this.createTeams();
    this.activePieces.forEach((piece) => {
      piece.vicinityCheck();
    });
  }

  toggleCursor() {
    const isOrangeCursor = this.activeCursor.color === "orange";
    if (isOrangeCursor) {
      return (this.activeCursor = this.cyanCursor);
    }
    this.activeCursor = this.orangeCursor;
  }

  createTeams() {
    for (let i = 1; i <= 7; i++) {
      if (i % 2 !== 0) {
        this.activeOrangePieces.push(new Piece("orange", i, 0));
        this.activeOrangePieces.push(new Piece("orange", i, 2));
        this.activeCyanPieces.push(new Piece("cyan", i, 6));
      }
    }
    for (let k = 0; k <= 7; k++) {
      if (k % 2 === 0) {
        this.activeCyanPieces.push(new Piece("cyan", k, 5));
        this.activeOrangePieces.push(new Piece("orange", k, 1));
        this.activeCyanPieces.push(new Piece("cyan", k, 7));
      }
    }
    this.activePieces = this.activeOrangePieces.concat(this.activeCyanPieces);
  }

  drawPieces() {
    this.activePieces.forEach((piece) => piece.drawPiece());
  }

  drawGrid() {
    for (var x = 0; x <= WIDTH; x += WIDTH / 8) {
      for (var y = 0; y <= HEIGHT; y += HEIGHT / 8) {
        stroke(255);
        strokeWeight(4);
        line(x, 0, x, HEIGHT);
        line(0, y, HEIGHT, y);
      }
    }
  }

  drawCursors() {
    this.activeCursor.drawCursor();
  }

  drawGame() {
    this.drawGrid();
    this.drawCursors();
    this.drawPieces();
  }

  drawGameOver() {
    if (this.winner === "orange") {
      fill(255, 255, 255, 200);
      rect(0, 240, 640, 160);
      textSize(30);
      textFont("Arial");
      fill(0, 0, 0);
      text("Once again, Developers save the day!", 50, 300);
    } else if (this.winner === "cyan") {
      fill(255, 255, 255, 200);
      rect(0, 240, 640, 160);
      textSize(30);
      textFont("Arial");
      fill(0, 0, 0);
      text("The nefarious fruits have prevailed!", 50, 300);
    }
  }
}

function keyPressed() {
  if (keyCode === 65) {
    game.activeCursor.moveLeft();
  }
  if (keyCode === 87) {
    game.activeCursor.moveUp();
  }
  if (keyCode === 68) {
    game.activeCursor.moveRight();
  }
  if (keyCode === 83) {
    game.activeCursor.moveDown();
  }
  if (keyCode === 13) {
    if (game.activeCursor.cursorOnPieceCheck() && !game.activeCursor.hasPiece) {
      game.activeCursor.selectPiece();
      //console.log(game.activeCursor.selectedPiece);
    } else if (
      game.activeCursor.cursorOnPieceCheck() &&
      game.activeCursor.hasPiece &&
      game.activeCursor.col === game.activeCursor.selectedPiece.col &&
      game.activeCursor.row === game.activeCursor.selectedPiece.row
    ) {
      game.activeCursor.selectedPiece.selected = false;
      game.activeCursor.selectedPiece = undefined;
      game.activeCursor.hasPiece = false;
      //console.log("the cursor has detached from the piece");
      //console.log(game.activeCursor.selectedPiece);
    } else if (
      game.activeCursor.hasPiece &&
      !game.activeCursor.cursorOnPieceCheck()
    ) {
      if (game.activeCursor.moveIsLegal()) {
        game.activeCursor.moveSelectedPiece();
        game.activeCursor.selectedPiece = undefined;
        game.activeCursor.hasPiece = false;
        game.toggleCursor();
        return;
      }
      return;
    }
  }
}
