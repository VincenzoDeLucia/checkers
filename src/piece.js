class Piece {
  constructor(color, col, row) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.neighbours = [];
    //this.selected = false;
    this.surroundings = [
      {
        relativePosition: 1,
        coordinates: [this.col - 1, this.row - 1],
        eatingPosition: [this.col - 2, this.row - 2],
      },
      {
        relativePosition: 2,
        coordinates: [this.col, this.row - 1],
        eatingPosition: [this.col, this.row - 2],
      },
      {
        relativePosition: 3,
        coordinates: [this.col + 1, this.row - 1],
        eatingPosition: [this.col + 2, this.row - 2],
      },
      {
        relativePosition: 4,
        coordinates: [this.col - 1, this.row],
        eatingPosition: [this.col - 2, this.row],
      },
      {
        relativePosition: 5,
        coordinates: [this.col + 1, this.row],
        eatingPosition: [this.col + 2, this.row],
      },
      {
        relativePosition: 6,
        coordinates: [this.col - 1, this.row + 1],
        eatingPosition: [this.col - 2, this.row + 2],
      },
      {
        relativePosition: 7,
        coordinates: [this.col, this.row + 1],
        eatingPosition: [this.col, this.row + 2],
      },
      {
        relativePosition: 8,
        coordinates: [this.col + 1, this.row + 1],
        eatingPosition: [this.col - 2, this.row - 2],
      },
    ];
  }

  vicinityCheck() {
    this.surroundings.forEach((adjacentSquare) => {
      if (
        game.board[adjacentSquare.coordinates[0]][adjacentSquare.coordinates[1]]
          .occupied
      ) {
        this.neighbours.push(adjacentSquare);
      }
    });
  }

  drawPiece() {
    game.board[this.col][this.row].occupied = true;
    game.board[this.col][this.row].occupiedBy = this;
    fill(this.color);
    circle(
      this.col * SQUARE + SQUARE / 2,
      this.row * SQUARE + SQUARE / 2,
      SQUARE
    );
  }
}
