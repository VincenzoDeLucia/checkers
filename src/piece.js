class Piece {
  constructor(color, col, row) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.allyNeighbours = [];
    this.enemyNeighbours = [];
    //this.selected = false;
    this.surroundings = this.getSurroundings();
    this.possibleMoves = this.getPossibleMoves();
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
    // // for (let i = 0; i < this.surroundings.length; i++) {
    //   const isInBoard =
    // game &&
    // game.board &&
    // // game.board[this.surroundings[i].coordinates[0]] &&
    // // game.board[this.surroundings[i].coordinates[0]][
    //   this.surroundings[i].coordinates[1]
    // ] &&
    // // game.board[this.surroundings[i].coordinates[0]][
    //   this.surroundings[i].coordinates[1]
    // ].occupied;
    //   if (isInBoard) {
    // if (
    // //   game.board[this.surroundings[i].coordinates[0]][
    // this.surroundings[i].coordinates[1]
    //   ].occupiedBy.color === this.color
    // ) {
    // //   this.allyNeighbours.push(this.surroundings[i]);
    //   this.possibleMoves.push([
    // this.surroundings[i].eatingPosition[0],
    // this.surroundings[i].eatingPosition[1],
    //   ]);
    // }
    // if (
    // //   game.board[this.surroundings[i].coordinates[0]][
    // this.surroundings[i].coordinates[1]
    //   ].occupied &&
    // //   game.board[this.surroundings[i].coordinates[0]][
    // this.surroundings[i].coordinates[1]
    //   ].occupiedBy.color !== this.color
    // ) {
    // //   this.enemyNeighbours.push(this.surroundings[i]);
    //   this.possibleMoves.push([
    // this.surroundings[i].eatingPosition[0],
    // this.surroundings[i].eatingPosition[1],
    //   ]);
    // }
    // this.possibleMoves.push([
    //   this.surroundings[i].coordinates[0],
    //   this.surroundings[i].coordinates[1],
    // ]);
    //   }
    // }
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
          return;
        }
        this.enemyNeighbours.push(adjacentSquare);
        console.log("enemy detected");
      }
    });
    console.log(this.allyNeighbours);
    console.log(this.enemyNeighbours);
    console.log(this.possibleMoves);
  }
  getPossibleMoves() {
    let moves = [];
    return moves;
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
