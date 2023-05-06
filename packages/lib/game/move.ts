import Game from "./game";
import Action from "./action";
import { Allegience } from "./types";

export default class Move {
  public game: Game;
  public actions: Action[] = [];
  public player: Allegience;

  constructor(game: Game) {
    this.game = game;
    this.player = game.turn;
  }
}
