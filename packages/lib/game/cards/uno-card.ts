export enum UnoColor {
  RED,
  BLUE,
  GREEN,
  YELLOW
}

export enum UnoCardType {
  NUMBER,
  DRAW,
  SKIP,
  REVERSE,
  WILD
}

export default class UnoCard {
  public color?: UnoColor;
  public readonly number?: number;
  public readonly draw?: 2 | 4;

  public readonly cardType: UnoCardType;

  constructor(color?: UnoColor, number?: number, draw?: 2 | 4, specialType?: UnoCardType) {
    // Default to NUMBER
    this.cardType = UnoCardType.NUMBER;

    if (color) this.color = color;
    if (number) this.number = number;

    if (draw) {
      this.draw = draw;
      this.cardType = UnoCardType.DRAW
    }

    if (specialType) this.cardType = specialType;
  }

  canPlay(previousCard: UnoCard): boolean {
    // WILD cards and DRAW 4's can be played on anything
    if (this.cardType === UnoCardType.WILD || this.draw === 4) return true;

    // Only cards of ther same number or color can be played on a NUMBER card
    if (previousCard.cardType === UnoCardType.NUMBER) return previousCard.color === this.color || previousCard.number === this.number;

    // Only cards of the same color can be played on a WILD or DRAW 4
    if (previousCard.cardType === UnoCardType.WILD || previousCard.draw === 4) return previousCard.color === this.color;

    // Only cards of the same color or other DRAW 2's can be played on a DRAW 2
    if (previousCard.draw === 2) return previousCard.color === this.color || previousCard.draw === this.draw;

    // Only cards of the same color or type can be played on a SKIP or REVERSE
    if (previousCard.cardType === UnoCardType.REVERSE || previousCard.cardType === UnoCardType.SKIP) return previousCard.color === this.color || previousCard.cardType === this.cardType;

    // Nothing should ever reach this point
    return false;
  }
}
