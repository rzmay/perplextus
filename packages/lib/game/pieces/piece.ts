import Game from "../game";
import { Allegience } from "../types";

export enum PieceLabel {
  BUG,
  NIPPLE,
  ROOK,
  CREATURE,
  BOY,
  GENERAL,
  COLONEL,
  BERSERKER,
}

export default abstract class Piece {
  /* Piece label for simplifying type access */
  public readonly abstract label: PieceLabel;

  /* Move history */
  public moves: any[] = []; // Still need a type for this;

  /* Is it dead */
  public alive: boolean = true;

  constructor(
    public position: { x: number, y: number },
    public allegience: Allegience,
  ) { }

  abstract getValidMoves(game: Game): { x: number, y: number }[];
}
