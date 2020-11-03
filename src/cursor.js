class Cursor {
  constructor(color, col, row) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.hasPiece = false;
    this.selectedPiece = undefined;
  }

  moveLeft() {
    if (this.col > 0) {
      this.col -= 1;
    }
    return;
  }

  moveRight() {
    if (this.col < 7) {
      this.col += 1;
    }
    return;
  }

  moveUp() {
    if (this.row > 0) {
      this.row -= 1;
    }
    return;
  }

  moveDown() {
    if (this.row < 7) {
      this.row += 1;
    }
    return;
  }

  cursorOnPieceCheck() {
    return game.activeOrangePieces
      .concat(game.activeCyanPieces)
      .find(
        (piece) =>
          piece.color === this.color &&
          piece.row === this.row &&
          piece.col === this.col
      );
  }

  selectPiece() {
    if (this.cursorOnPieceCheck()) {
      this.hasPiece = true;
      this.selectedPiece = this.cursorOnPieceCheck();
      this.selectedPiece.vicinityCheck();
      console.log(this.selectedPiece.neighbours);
      //console.log(`An ${this.selectedPiece.color} piece was selected.`);
      return;
    }
    //console.log("No piece was selected by Cursor.selectPiece()");
    this.showSurroundings();
    return;
  }

  moveSelectedPiece() {
    this.selectedPiece.col = this.col;
    this.selectedPiece.row = this.row;
    this.selectedPiece = undefined;
  }

  drawCursor() {
    fill(this.color);
    rect(this.col * SQUARE, this.row * SQUARE, SQUARE, SQUARE);
  }
}
