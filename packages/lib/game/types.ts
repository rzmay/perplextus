import UnoCard from "./cards/uno-card";
import WarCard from "./cards/war-card";
import Piece from "./pieces/piece";
import ScrabbleTile from "./scrabble/tile";
import Fortress from "./walls/fortress";
import Wall from "./walls/wall";

export enum Allegience {
  BLACK = 0,
  WHITE = 1,
  NONE = 2,
}

export enum GameState {
  ROCK_PAPER_SCISSORS, // Awaiting rock paper scissors submission for first turn
  PIECE_DESIGNATION, // Awaiting designation of martyr, hero, and eater
  CHESS, // Awaiting chess move
  SCRABBLE_PLACEMENT, // Placing scrabble tiles after chess move
  DICE_ROLL, // Awaiting dice roll, uno card, or scrabble play
  DICE_RESULT, // Awaiting action after dice result
  UNO, // Awaiting uno play
  WAR, // Awaiting war round action
  WALL, // Awaiting wall & house placement after war round
  BERSERKER, // Awaiting berserker placement after war round
  COIN_BET, // Awaiting coin bets after war round
}
