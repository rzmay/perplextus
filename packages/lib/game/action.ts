import UnoCard from "./cards/uno-card";
import WarCard from "./cards/war-card";
import Game from "./game";
import Bug from "./pieces/bug";
import Nipple from "./pieces/nipple";
import Piece from "./pieces/piece";
import ScrabbleTile from "./scrabble/tile";
import { Allegience, GameState } from "./types";
import Fortress from "./walls/fortress";
import Wall from "./walls/wall";
import Move from "./move";

export enum SpecialAction {
  MARTYR_SACRIFICE, // Martyr not moving but blowing itself to smithereens
  GENERAL_QUARTERS, // General castling
  TICTACTOE, // Three nipples moving at once,
}

export enum RockPaperScissors {
  ROCK = 0,
  PAPER = 1,
  SCISSORS = 2,
}

/* An action is a subcategory of a move.
  * They can require input from one or both players and
  * by completing them the game state changes.
  * After certain actions, the move ends and the
  * game state resets.
*/
export default abstract class Action {
  // The current move
  public readonly move: Move;

  // The current state of the game
  public readonly state: GameState;

  constructor(move: Move, state: GameState) {
    this.move = move;
    this.state = state;
  }

  // Is this action complete?
  abstract isComplete(): boolean;

  // What game state or valid game states are next?
  abstract nextState(): GameState | GameState[];

  // Is the move over? If so, who moves next?
  abstract isMoveOver(): Allegience | false;

  // Apply the move to the external game state & run any calculations
  // abstract apply();
}

/* The very first action in the game. Players must
  * play rock paper scissors to decide who moves first.
  * This requires input from both players and, when
  * each player has chosen their play, a winner is chosen
  * and the game state moves on.
*/
export class RockPaperScissorsAction extends Action {
  // Rock paper scissors state options
  public plays: (RockPaperScissors | null)[] = [null, null];

  constructor(move: Move, action: RockPaperScissorsAction) {
    super(move, GameState.ROCK_PAPER_SCISSORS);

    Object.assign(this, action);
  }

  // Complete if both plays are set
  isComplete(): boolean {
    return this.plays[0] !== null && this.plays[1] !== null;
  }

  // Repeat if a tie, otherwise move to piece designation
  nextState(): GameState {
    return (this.plays[0] === this.plays[1]) ? GameState.ROCK_PAPER_SCISSORS : GameState.PIECE_DESIGNATION;
  }

  // Move ends when a winner is chosen
  isMoveOver(): Allegience | false {
    if (!this.isComplete()) return false;
    if (this.plays[0] === this.plays[1]) return false;

    return ((this.plays[0]! + 1) % 3 == this.plays[1]) ? Allegience.WHITE : Allegience.BLACK
  }
}

/* Before playing the game, players must designate their
  * special pieces. Once each player has designated their
  * martyr, hero, and eater, the game state continues.
*/
export class PieceDesignation extends Action {
  public hero?: Nipple;
  public martyr?: Nipple;
  public eater?: Nipple;

  constructor(move: Move, action: PieceDesignation) {
    super(move, GameState.PIECE_DESIGNATION);

    Object.assign(this, action);
  }

  // Complete if all pieces are set
  isComplete(): boolean {
    return !!(this.hero && this.martyr && this.eater);
  }

  // If other player hasn't designated pieces, next state is piece designation -- otherwise, chess
  nextState(): GameState {
    return (this.move.game.moves.length === 2) ? GameState.PIECE_DESIGNATION : GameState.CHESS;
  }

  // Move ends when complete -- just flip game turn
  isMoveOver(): Allegience | false {
    if (!this.isComplete()) return false;
    return this.move.player === Allegience.BLACK ? Allegience.WHITE : Allegience.BLACK
  }
}

/* The chess action is the first action of any turn.
  * Once a move has been made, the game state shifts.
*/
export class ChessAction extends Action {
  // Chess state options
  public piece?: Piece;
  public movement?: { x: number, y: number };

  // Multiple pieces can be taken by special actions
  public piecesTaken: Piece[] = [];

  // Scrabble tiles earned
  public scrabbleTilesEarned: ScrabbleTile[] = [];

  // Irregular actions that modify multiple pieces
  public specialAction?: SpecialAction;

  // In the case of a general quartering, which rook moved
  public generalQuarterRook?: Piece;

  // In the case of a tictactoe, which pieces moved
  public tictactoePieces?: Piece[];
  public tictactoeMovements?: { x: number, y: number }[];

  // If the eater is attacked, the dice are rolled
  public eaterDiceResult?: number[];

  constructor(move: Move, action: ChessAction) {
    super(move, GameState.CHESS);

    Object.assign(this, action);
  }

  // Complete if a movement or special action has been made
  isComplete(): boolean {
    return !!(this.movement || this.specialAction);
  }

  // If the eater has been attacked and the dice show doubles or snake eyes, dice result is next
  nextState(): GameState | GameState[] {
    if (this.eaterDiceResult && this.eaterDiceResult[0] === this.eaterDiceResult[1]) return GameState.DICE_RESULT;
    return [GameState.UNO, GameState.SCRABBLE_PLACEMENT, GameState.DICE_ROLL];
  }

  // Move never ends on chess unless checkmate -- always at least goes to Uno
  isMoveOver(): Allegience | false {
    return false;
  }
}

/* Optional action. If a word can be spelled, a player
  * can place scrabble tiles during their turn
*/
export class ScrabbleAction extends Action {
  // Tiles placed
  public scrabbleTiles: Piece[] = [];

  // Multiple bugs can be squashed by scrabble pieces
  public piecesTaken: Bug[] = [];

  // Ressurection if the player reaches 10 points
  public resurrections: Piece[] = [];

  constructor(move: Move, action: ChessAction) {
    super(move, GameState.CHESS);

    Object.assign(this, action);
  }

  nResurrections(): number {
    const totalPoints = this.move.game.scrabbleScores[this.move.player] + this.scrabbleTiles.reduce((a, b) => a.points + b.points, 0);
    const resurrections = Math.floor(totalPoints / 10) - Math.floor(this.move.game.scrabbleScores[this.move.player] / 10);

    return resurrections;
  }

  // Complete if tiles have been placed and the appropriate number of resurrections have been made
  isComplete(): boolean {
    return !!(this.scrabbleTiles && (this.nResurrections() === this.resurrections.length));
  }

  // Only UNO or dice roll can come next
  nextState(): GameState | GameState[] {
    return [GameState.UNO, GameState.DICE_ROLL];
  }

  // Move never ends on scrabble unless checkmate -- always at least goes to Uno
  isMoveOver(): Allegience | false {
    return false;
  }
}

/* Optional action, each player gets 5 per game */
export class DiceRollAction extends Action {
  // Result of rolling the dice
  public result: number[];

  constructor(move: Move, action: DiceRollAction) {
    super(move, GameState.DICE_ROLL);

    this.result = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ]
  }

  // Complete when dice have been rolled -- always true lol
  isComplete(): boolean {
    return !!this.result;
  }

  // Dice result action is next if doubles or snake eyes, otherwise uno
  nextState(): GameState {
    if (this.result[0] === this.result[1]) return GameState.DICE_RESULT
    return GameState.UNO;
  }

  // Move never ends on dice roll unless checkmate -- always at least goes to Uno
  isMoveOver(): Allegience | false {
    return false;
  }
}

/* Separate from DiceRoll action because
  * this can be triggered by a dice roll
  * or eater attack
*/
export class DiceResultAction extends Action {
  // Result of rolling the dice -- passed from the previous action
  public result: number[] = [];

  // Position of resurrection should be recorded as piece.position
  public resurrection?: Piece;

  // If the hero moves, record its position
  public heroPosition?: { x: number, y: number };

  constructor(move: Move, action: DiceResultAction) {
    super(move, GameState.DICE_RESULT);

    Object.assign(this, action);
  }

  // Complete when resurrecition has been made or hero has been moved
  isComplete(): boolean {
    if (this.result[0] === 1 && this.result[1] === 1) return !!(this.resurrection && this.heroPosition);
    if (this.result[0] === this.result[1]) return !!this.resurrection
    return false;
  }

  // Next state is UNO unless this action was activated by an eater roll
  nextState(): GameState | GameState[] {
    if (this.move.actions.find((a) => a.state === GameState.DICE_ROLL)) return GameState.UNO
    return [GameState.UNO, GameState.SCRABBLE_PLACEMENT, GameState.DICE_ROLL];
  }

  // Move never ends on dice result unless checkmate -- always at least goes to Uno
  isMoveOver(): Allegience | false {
    return false;
  }
}

/* Uno turn, can either go to next turn or trigger war round */
class UnoAction extends Action {
  // Card played -- can be more than 1 if identical
  public cards?: UnoCard[];

  // If two identical reverse cards are played, it is a scrambler
  public isScrambler: boolean = false;
  public pieceScrambled?: Piece;

  // Ressurection if a draw card is played
  public resurrection?: Piece;

  // Cards drawn by each player
  public cardsDrawn: UnoCard[][] = [];

  constructor(move: Move, action: UnoAction) {
    super(move, GameState.UNO);

    Object.assign(this, action);
  }

  // Complete when cards have been played
  isComplete(): boolean {
  }

  // Next state is CHESS unless reverse played
  nextState(): GameState | GameState[] {
  }

  // Move ends unless reverse played
  isMoveOver(): Allegience | false {
  }
}

/* War round, can trigger a berserker placement or a wall placement */
class WarAction extends Action {
  // Cards played by each player
  public cards: WarCard[] = [];

  // Cards drawn by each player after war round
  public cardsDrawn: WarCard[] = [];

  constructor(move: Move, action: WarAction) {
    super(move, GameState.WAR);

    Object.assign(this, action);
  }
}

/* If an ace is played during a war round, the player can
  * place two walls and a fortress.
*/
class WallAction extends Action {
  // Walls placed
  public walls: Wall[] = [];

  // Fortress plaaced
  public fortress: Fortress;

  constructor(move: Move, action: WallAction) {
    super(move, GameState.WALL);

    Object.assign(this, action);
  }
}

/* If a war round is won with a face card, the winning player
  * can turn a nipple into a berserker
*/
class BerserkerAction extends Action {
  // Nipple turned into a berserker
  public nipple: Nipple;

  constructor(move: Move, action: BerserkerAction) {
    super(move, GameState.BERSERKER);

    Object.assign(this, action);
  }
}

/* If a war round is tied, it is settled by a double coin toss
  * can turn a nipple into a berserker
*/
class CoinBetAction extends Action {
  // The bets of each player
  public bets: ('id' | 'ego' | 'superego' | 'else')[] = [];

  // The results of the coin tosses
  public coins: ('heads' | 'tails')[] = [];

  // pieces designated b

  constructor(move: Move, action: BerserkerAction) {
    super(move, GameState.COIN_BET);

    Object.assign(this, action);
  }
}

