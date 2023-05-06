import Game from "../game";
import { Allegience } from "../types";
import Piece, { PieceLabel } from "./piece";

export default class Creature extends Piece {

  public readonly label = PieceLabel.CREATURE;

  public isTamed: boolean = false;

  getValidMoves(game: Game): { x: number; y: number; }[] {
    // White is at the top of the board, black is at the bottom
    const forwardsDirection = this.allegience === Allegience.WHITE ? -1 : 1;
    const validMoves = [
      { x: this.position.x + 2, y: this.position.y + 1 },
      { x: this.position.x + 2, y: this.position.y - 1 },
      { x: this.position.x - 2, y: this.position.y + 1 },
      { x: this.position.x - 2, y: this.position.y - 1 },
      { x: this.position.x + 1, y: this.position.y + 2 },
      { x: this.position.x + 1, y: this.position.y - 2 },
      { x: this.position.x - 1, y: this.position.y + 2 },
      { x: this.position.x - 1, y: this.position.y - 2 },
    ];

    // Can the creature move like one of the boys?
    if (this.isTamed && !(this.moves.length % 3)) validMoves.push(
      /* Boy moves */
    )

    return validMoves;
  }
}
