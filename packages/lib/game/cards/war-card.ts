export enum WarSuit {
  HEARTS,
  SPADES,
  CLUBS,
  DIAMONDS
}

export enum WarFace {
  JACK,
  QUEEN,
  KING,
}

export default class WarCard {
  public readonly suit: WarSuit;
  public readonly number: number;

  public readonly face?: WarFace;
  public readonly isAce: boolean;

  constructor(suit: WarSuit, number: number) {
    this.suit = suit;
    this.number = number;

    this.isAce = this.number === 1;

    if (this.number === 11) this.face = WarFace.JACK;
    if (this.number === 12) this.face = WarFace.QUEEN;
    if (this.number === 13) this.face = WarFace.KING;
  }
}
