class Game {
  constructor() {
    this.piece = new Piece("orange", 4, 4);
    this.orangeCursor = new Cursor("orange", 0, 0);
    this.pieces = [this.piece];
    this.board = [];
    this.numOfPieces = 8;
    this.activeCursor = this.orangeCursor;
  }

  setUp() {
    let newRow = [];
    for (let i = 0; i < 8; i++) {
      for (let l = 0; l < 8; l++) {
        newRow.push({
          col: i,
          row: l,
          occupied: false,
          enhanced: false,
          isTheCursorHere: false,
        });
      }
      this.board.push(newRow);
      newRow = [];
    }
  }

  drawBoard() {}

  drawPieces() {
    this.pieces.forEach((piece) => piece.drawPiece());
  }

  drawCursors() {
    this.activeCursor.drawCursor();
  }

  drawGame() {
    this.drawBoard();
    this.drawCursors();
    this.drawPieces();
  }
}

function keyPressed() {
  if (keyCode === 37) {
    game.activeCursor.moveLeft();
  }
  if (keyCode === 38) {
    game.activeCursor.moveUp();
  }
  if (keyCode === 39) {
    game.activeCursor.moveRight();
  }
  if (keyCode === 40) {
    game.activeCursor.moveDown();
  }
  if (keyCode === 13) {
    if (game.activeCursor.cursorOnPieceCheck() && !game.activeCursor.hasPiece) {
      game.activeCursor.selectPiece();
      console.log(game.activeCursor.selectedPiece);
    } else if (
      game.activeCursor.cursorOnPieceCheck() &&
      game.activeCursor.hasPiece
    ) {
      game.activeCursor.selectedPiece = undefined;
      game.activeCursor.hasPiece = false;
      console.log("the cursor has detached from the piece");
      console.log(game.activeCursor.selectedPiece);
    } else if (
      game.activeCursor.hasPiece &&
      !game.activeCursor.cursorOnPieceCheck()
    ) {
      game.activeCursor.moveSelectedPiece();
      game.activeCursor.selectedPiece = undefined;
      game.activeCursor.hasPiece = false;
    }
  }
}
