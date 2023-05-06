import Game from "../game";
import { Allegience } from "../types";
import Piece, { PieceLabel } from "./piece";

export enum NippleSpecialty {
  MARTYR,
  HERO,
}

export default class Nipple extends Piece {

  public readonly label = PieceLabel.NIPPLE;

  public isWereCreature: boolean = false;
  public isEater: boolean;
  public isBerserker: boolean;
  public specialty?: NippleSpecialty;

  constructor(
    position: { x: number, y: number },
    allegience: Allegience,
    specialty?: NippleSpecialty,
    isEater?: boolean,
    isBerserker?: boolean
  ) {
    super(position, allegience);

    this.specialty = specialty;
    this.isEater = !!isEater;
    this.isBerserker = !!isBerserker;
  }

  getValidMoves(game: Game): { x: number; y: number; }[] {
    // White is at the top of the board, black is at the bottom
    const forwardsDirection = this.allegience === Allegience.WHITE ? -1 : 1;
    const validMoves = [];

    // Can the nipple move forwards?
    const forwardPosition = { ...this.position, y: this.position.y + (forwardsDirection * 1) };
    if (!game.getPieceAtPosition(forwardPosition)) validMoves.push(forwardPosition);

    // Can the nipple move two spaces forwards?
    const doubleForwardPosition = { ...this.position, y: this.position.y + (forwardsDirection * 2) };
    if (
      !this.moves.length
      && !game.getPieceAtPosition(forwardPosition)
      && !game.getPieceAtPosition(doubleForwardPosition)
    ) validMoves.push(doubleForwardPosition);

    // Can the nipple attack diagonally?
    const attackPositions = [
      { x: this.position.x + 1, y: this.position.y + (forwardsDirection * 1) },
      { x: this.position.x - 1, y: this.position.y + (forwardsDirection * 1) }
    ].filter((position) => game.getPieceAtPosition(position));
    validMoves.push(...attackPositions);

    // Can the nipple move like a creature?
    if (this.isWereCreature && !(this.moves.length % 2)) validMoves.push(
      /* Creature moves */
    )

    // Can the nipple move in a tictactoe regiment?

    // Can the nipple attack a berserker?

    // Can the nipple blow itself up?

    return validMoves;
  }
}
