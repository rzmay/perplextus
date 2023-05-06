import UnoCard, { UnoCardType, UnoColor } from "./cards/uno-card";
import WarCard, { WarSuit } from "./cards/war-card";
import Piece from "./pieces/piece";
import ScrabbleTile from "./scrabble/tile";
import { Allegience } from "./types";
import Fortress from "./walls/fortress";
import Wall from "./walls/wall";
import shuffle from 'lodash/shuffle';
import Nipple from "./pieces/nipple";
import Rook from "./pieces/rook";
import Creature from "./pieces/creature";
import Boy from "./pieces/boy";
import General from "./pieces/general";
import Colonel from "./pieces/colonel";
import Bug from "./pieces/bug";

export default class Game {
  /* Pieces on the board */
  pieces: Piece[] = [];
  /* Pieces that have been taken */
  graveyard: Piece[] = [];

  /* Walls on the board */
  walls: Wall[] = [];
  /* Fortresses on the board */
  fotresses: Fortress[] = [];

  /* Scrabble tiles in each players' hand */
  scrabbleHands: ScrabbleTile[][] = [];
  /* Each players' scrabble score */
  scrabbleScores: number[] = [];
  /* Scrabble tiles on the board */
  scrabbleBoard: ScrabbleTile[] = [];

  /* Each of the players' uno hands */
  unoHands: UnoCard[][] = [];
  /* The uno deck that cards are drawn from */
  unoDeck: UnoCard[] = [];
  /* The uno stack on which cards are played */
  unoStack: UnoCard[] = [];

  /* Each of the players' war hands */
  warHands: WarCard[][] = [];
  /* The war deck that cards re drawn from */
  warDeck: WarCard[] = [];
  /* The two cards chosen to be compared in a war round */
  warRound: WarCard[] = [];

  /* The bets of each player in a double coin round */
  coinBets: ('id' | 'ego' | 'superego')[] = [];

  /* How many dice rolls each player has remaining */
  rolls: number[] = [5, 5];

  /* Whose turn it is */
  turn: Allegience = Allegience.NONE;
  /* What number move it is */
  move: number = 0;
  /* Move history */
  moves: any[] = [] // TODO: Need a type for this

  /* Constant board size */
  readonly boardSize: number = 8

  constructor() {
    this._setBoard();
    this._dealUno();
    this._dealWar();
  }

  /* Set up the board */
  private _setBoard() {
    // Set up teams
    const allegiences = [Allegience.BLACK, Allegience.WHITE];

    for (const allegience of allegiences) {
      // Set up nipples
      const nippleRow = allegience === Allegience.WHITE ? 6 : 1;
      for (let i = 0; i < 8; i++) {
        this.pieces.push(new Nipple(
          { x: i, y: nippleRow },
          allegience
        ));
      }

      // Set up main file
      const mainRow = allegience === Allegience.WHITE ? 7 : 0;

      // Rooks
      this.pieces.push(new Rook(
        { x: 0, y: mainRow },
        allegience,
      ));

      this.pieces.push(new Rook(
        { x: 7, y: mainRow },
        allegience,
      ));

      // Creatures
      this.pieces.push(new Creature(
        { x: 1, y: mainRow },
        allegience,
      ));

      this.pieces.push(new Creature(
        { x: 6, y: mainRow },
        allegience,
      ));

      // The Boys
      this.pieces.push(new Boy(
        { x: 2, y: mainRow },
        allegience,
      ));

      this.pieces.push(new Boy(
        { x: 5, y: mainRow },
        allegience,
      ));

      // The General
      this.pieces.push(new General(
        { x: 3, y: mainRow },
        allegience,
      ));

      // The Colonel
      this.pieces.push(new Colonel(
        { x: 4, y: mainRow },
        allegience,
      ));
    }

    // Set up bugs
    for (let y = 3; y < 5; y++) {
      for (let x = 2; x < 6; x++) {
        this.pieces.push(new Bug(
          { x, y },
          Allegience.NONE,
        ))
      }
    }
  }

  /* Set up uno deck and deal cards */
  private _dealUno() {
    // Set up the deck
    const colors = [UnoColor.RED, UnoColor.BLUE, UnoColor.GREEN, UnoColor.YELLOW];
    for (const color of colors) {
      // Add all numbers
      const numbers = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
      for (const number of numbers) {
        this.unoDeck.push(new UnoCard(color, number));
      }

      // Add all special cards
      const specialtyCards = [UnoCardType.SKIP, UnoCardType.REVERSE, UnoCardType.WILD];
      for (const specialty of specialtyCards) {
        this.unoDeck.push(new UnoCard(color, undefined, undefined, specialty));
        this.unoDeck.push(new UnoCard(color, undefined, undefined, specialty));
      }

      // Add all draw cards
      const drawCards: (2 | 4)[] = [2, 2, 4];
      for (const draw of drawCards) {
        this.unoDeck.push(new UnoCard(color, undefined, draw));
      }
    }

    // Shuffle the deck
    this.unoDeck = shuffle(this.unoDeck);

    // Deal cards
    for (let i = 0; i < 7; i++) {
      this.unoHands[0].push(this.unoDeck.shift()!);
      this.unoHands[1].push(this.unoDeck.shift()!);
    }

    // Place base card
    this.unoStack.push(this.unoDeck.shift()!);
  }

  /* Set up war deck and deal cards */
  private _dealWar() {
    // Generate cards
    const suits = [WarSuit.CLUBS, WarSuit.DIAMONDS, WarSuit.HEARTS, WarSuit.SPADES];

    for (const suit of suits) {
      for (let i = 1; i < 14; i++) {
        this.warDeck.push(new WarCard(suit, i));
      }
    }

    // Shuffle the deck
    this.warDeck = shuffle(this.warDeck);

    // Deal cards
    for (let i = 0; i < 5; i++) {
      this.warHands[0].push(this.warDeck.shift()!);
      this.warHands[1].push(this.warDeck.shift()!);
    }
  }

  /* Get a piece at specified coordinates */
  getPieceAtPosition(position: { x: number, y: number }): Piece | null {
    return this.pieces.find((p) => p.position.x === position.x && p.position.y === position.y) || null;
  }

  /* Return if the game is checkmate based on the current state */
  isCheckmate() { return false; }
}
