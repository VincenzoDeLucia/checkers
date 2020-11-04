class Piece {
  constructor(color, col, row) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.allyNeighbours = [];
    this.enemyNeighbours = [];
    this.possibleMoves = [];
    this.selected = false;
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
    this.possibleMoves = [];
    this.surroundings.forEach((adjacentSquare) => {
      const isInBoard =
        game &&
        game.board &&
        game.board[adjacentSquare.coordinates[0]] &&
        game.board[adjacentSquare.coordinates[0]][
          adjacentSquare.coordinates[1]
        ];
      const isOccupiedInBoard =
        game &&
        game.board &&
        game.board[adjacentSquare.coordinates[0]] &&
        game.board[adjacentSquare.coordinates[0]][
          adjacentSquare.coordinates[1]
        ] &&
        game.board[adjacentSquare.coordinates[0]][adjacentSquare.coordinates[1]]
          .occupied;
      if (isInBoard) {
        if (isOccupiedInBoard) {
          if (
            game.board[adjacentSquare.coordinates[0]][
              adjacentSquare.coordinates[1]
            ].occupiedBy.color === this.color
          ) {
            this.allyNeighbours.push(adjacentSquare);
            //console.log("friend detected");
            this.possibleMoves.push({
              actionType: "jump",
              destination: [
                adjacentSquare.eatingPosition[0],
                adjacentSquare.eatingPosition[1],
              ],
              relativePosition: adjacentSquare.relativePosition,
            });
            return;
          }
          this.enemyNeighbours.push(adjacentSquare);
          //console.log("enemy detected");
          this.possibleMoves.push({
            actionType: "eat",
            destination: [
              adjacentSquare.eatingPosition[0],
              adjacentSquare.eatingPosition[1],
            ],
            relativePosition: adjacentSquare.relativePosition,
          });
        }
        if (
          isInBoard &&
          !game.board[adjacentSquare.coordinates[0]][
            adjacentSquare.coordinates[1]
          ].occupied
        )
          this.possibleMoves.push({
            actionType: "move",
            destination: [
              adjacentSquare.coordinates[0],
              adjacentSquare.coordinates[1],
            ],
            relativePosition: adjacentSquare.relativePosition,
          });
      }
    });
    this.possibleMoves = this.possibleMoves
      .filter((possibleMove) => {
        return (
          0 <= possibleMove.destination[0] &&
          possibleMove.destination[0] <= 7 &&
          0 <= possibleMove.destination[1] &&
          possibleMove.destination[1] <= 7
        );
      })
      .filter((possibleMove) => {
        return !game.board[possibleMove.destination[0]][
          possibleMove.destination[1]
        ].occupied;
      });
    console.log(this.possibleMoves);
  }

  drawPiece() {
    if (this.selected) {
      this.possibleMoves.forEach((possibleMove) => {
        image(
          target,
          possibleMove.destination[0] * SQUARE,
          possibleMove.destination[1] * SQUARE,
          SQUARE,
          SQUARE
        );
      });
    }
    if (this.color === "orange") {
      game.board[this.col][this.row].occupied = true;
      game.board[this.col][this.row].occupiedBy = this;
      image(dev, this.col * SQUARE, this.row * SQUARE, SQUARE, SQUARE);
      return;
    }
    game.board[this.col][this.row].occupied = true;
    game.board[this.col][this.row].occupiedBy = this;
    image(tom, this.col * SQUARE, this.row * SQUARE, SQUARE, SQUARE);
  }
}
