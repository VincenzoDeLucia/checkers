class Game {
  constructor() {
    this.orange1 = new Piece("orange", 0, 0);
    this.orange2 = new Piece("orange", 2, 0);
    this.orange3 = new Piece("orange", 4, 0);
    this.orange4 = new Piece("orange", 6, 0);
    this.orange5 = new Piece("orange", 1, 1);
    this.orange6 = new Piece("orange", 3, 1);
    this.orange7 = new Piece("orange", 5, 1);
    this.orange8 = new Piece("orange", 7, 1);
    this.cyan1 = new Piece("cyan", 0, 6);
    this.cyan2 = new Piece("cyan", 2, 6);
    this.cyan3 = new Piece("cyan", 4, 6);
    this.cyan4 = new Piece("cyan", 6, 6);
    this.cyan5 = new Piece("cyan", 1, 7);
    this.cyan6 = new Piece("cyan", 3, 7);
    this.cyan7 = new Piece("cyan", 5, 7);
    this.cyan8 = new Piece("cyan", 7, 7);
    this.orangeCursor = new Cursor("orange", 0, 0);
    this.cyanCursor = new Cursor("cyan", 7, 7);
    this.activeOrangePieces = [
      this.orange1,
      this.orange2,
      this.orange3,
      this.orange4,
      this.orange5,
      this.orange6,
      this.orange7,
      this.orange8,
    ];
    this.activeCyanPieces = [
      this.cyan1,
      this.cyan2,
      this.cyan3,
      this.cyan4,
      this.cyan5,
      this.cyan6,
      this.cyan7,
      this.cyan8,
    ];
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

  toggleCursor() {
    const isOrangeCursor = this.activeCursor.color === "orange";
    if (isOrangeCursor) {
      return (this.activeCursor = this.cyanCursor);
    }
    this.activeCursor = this.orangeCursor;
    // if (this.activeCursor.color === "orange") {
    //   this.activeCursor = this.cyanCursor;
    // }
    // this.activeCursor = this.orangeCursor;
  }

  drawBoard() {}

  drawPieces() {
    this.activeOrangePieces
      .concat(this.activeCyanPieces)
      .forEach((piece) => piece.drawPiece());
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
      //console.log(game.activeCursor.selectedPiece);
    } else if (
      game.activeCursor.cursorOnPieceCheck() &&
      game.activeCursor.hasPiece
    ) {
      game.activeCursor.selectedPiece = undefined;
      game.activeCursor.hasPiece = false;
      //console.log("the cursor has detached from the piece");
      //console.log(game.activeCursor.selectedPiece);
    } else if (
      game.activeCursor.hasPiece &&
      !game.activeCursor.cursorOnPieceCheck()
    ) {
      game.activeCursor.moveSelectedPiece();
      game.activeCursor.selectedPiece = undefined;
      game.activeCursor.hasPiece = false;
      game.toggleCursor();
    }
  }
}
