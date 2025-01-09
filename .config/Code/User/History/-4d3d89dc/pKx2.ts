export class Color {

  private constructor(private _color: string) {}

  public static from(color: string): Color {
    

    return new Color(color);
  }

  public get color(): string {
    return this._color;
  }

  public equals(other: Color): boolean {
    return this._color === other.color;
  }

  public toString(): string {
    return this._color;
  }


}