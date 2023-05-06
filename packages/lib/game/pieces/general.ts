import Game from "../game";
import { Allegience } from "../types";
import Piece, { PieceLabel } from "./piece";

export default class General extends Piece {

  public readonly label = PieceLabel.GENERAL;

  getValidMoves(game: Game): { x: number; y: number; }[] {
    // White is at the top of the board, black is at the bottom
    const forwardsDirection = this.allegience === Allegience.WHITE ? -1 : 1;
    const validMoves = [];

    // Loop over valid squares to add moves

    return validMoves;
  }
}
