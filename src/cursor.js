class Cursor {
  constructor(color, col, row) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.hasPiece = false;
    this.selectedPiece = null;
  }

  moveRight() {
    if (this.col < 7) {
      this.col += 1;
    }
    return;
  }

  moveLeft() {
    if (this.col > 0) {
      this.col -= 1;
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
    return game.activePieces.find(
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
      this.selectedPiece.selected = true;
      this.selectedPiece.surroundings = this.selectedPiece.getSurroundings();
      this.selectedPiece.vicinityCheck();
      //console.log(`An ${this.selectedPiece.color} piece was selected.`);
      return;
    }
    //console.log("No piece was selected by Cursor.selectPiece()");
    return;
  }

  moveSelectedPiece() {
    let moveToMake = this.selectedPiece.possibleMoves.find((move) => {
      return (
        this.col === move.destination[0] && this.row === move.destination[1]
      );
    });
    if (moveToMake.actionType === "eat") {
      let enemy = this.selectedPiece.enemyNeighbours.find((enemyToEat) => {
        return enemyToEat.relativePosition === moveToMake.relativePosition;
      });
      let target = game.activePieces.find((pieceToDisable) => {
        return (
          enemy.coordinates[0] === pieceToDisable.col &&
          enemy.coordinates[1] === pieceToDisable.row
        );
      });
      //console.log(game.activePieces.indexOf(target));
      game.inactivePieces.push(target);
      if (this.selectedPiece.color === "orange") {
        game.activeCyanPieces.splice(game.activeCyanPieces.indexOf(target), 1);
        console.log("The devs have captured a tomato!");
        console.log(game.activeCyanPieces);
      }
      if (this.selectedPiece.color === "cyan") {
        game.activeOrangePieces.splice(
          game.activeOrangePieces.indexOf(target),
          1
        );
        console.log("The tomatoes have captured a dev!");
        console.log(game.activeOrangePieces);
      }
      console.log(game.inactivePieces);
      game.board[target.col][target.row].occupied = false;
      game.activePieces.splice(game.activePieces.indexOf(target), 1);
    }
    // if (moveToMake.actionType === "jump") {
    //console.log("HELLO FRIEND!");
    // let target = this.selectedPiece.allyNeighbours.find((enemyToEat) => {
    // return enemyToEat.relativePosition === moveToMake.relativePosition;
    // });
    // }
    game.board[this.selectedPiece.col][this.selectedPiece.row].occupied = false;
    this.selectedPiece.col = this.col;
    this.selectedPiece.row = this.row;
    this.winCheck();
    this.selectedPiece.selected = false;
    this.selectedPiece = null;
    //console.log(game.board);
  }

  moveIsLegal() {
    let legalMove = this.selectedPiece.possibleMoves.filter((possibleMove) => {
      return (
        possibleMove.destination[0] === this.col &&
        possibleMove.destination[1] === this.row
      );
    });
    return legalMove.length === 1;
  }

  winCheck() {
    if (
      this.selectedPiece.color === "orange" &&
      game.activeCyanPieces.length === 0
    ) {
      console.log("Once again, Developers save the day!");
    }
    if (
      this.selectedPiece.color === "cyan" &&
      game.activeOrangePieces.length === 0
    ) {
      console.log(
        "The nefarious fruits who disguise themselves as vegetables have prevailed!"
      );
    }
  }

  drawCursor() {
    image(cursor, this.col * SQUARE, this.row * SQUARE, SQUARE, SQUARE);
  }
}
