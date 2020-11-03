class Piece {
  constructor(color, col, row) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.allyNeighbours = [];
    this.enemyNeighbours = [];
    this.possibleMoves = [];
    //this.selected = false;
    this.surroundings = this.getSurroundings();
  }

  getSurroundings() {
    return [
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
        eatingPosition: [this.col + 2, this.row + 2],
      },
    ];
  }

  vicinityCheck() {
    this.allyNeighbours = [];
    this.enemyNeighbours = [];
    this.surroundings.forEach((adjacentSquare) => {
      const isInBoard =
        game &&
        game.board &&
        game.board[adjacentSquare.coordinates[0]] &&
        game.board[adjacentSquare.coordinates[0]][
          adjacentSquare.coordinates[1]
        ] &&
        game.board[adjacentSquare.coordinates[0]][adjacentSquare.coordinates[1]]
          .occupied;
      if (isInBoard) {
        if (
          game.board[adjacentSquare.coordinates[0]][
            adjacentSquare.coordinates[1]
          ].occupiedBy.color === this.color
        ) {
          this.allyNeighbours.push(adjacentSquare);
          console.log("friend detected");
          this.possibleMoves.push([
            adjacentSquare.eatingPosition[0],
            adjacentSquare.eatingPosition[1],
          ]);
          return;
        }
        this.enemyNeighbours.push(adjacentSquare);
        console.log("enemy detected");
        this.possibleMoves.push([
          adjacentSquare.eatingPosition[0],
          adjacentSquare.eatingPosition[1],
        ]);
      }
    });
    console.log(this.allyNeighbours);
    console.log(this.enemyNeighbours);
    console.log(this.possibleMoves);
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
