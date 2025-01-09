import { colorKeyWords } from "src/utils/colorKeyWords";

export class Color {

  private constructor(private _color: string) {}

  public static from(color: string): Color {
    
    if (!colorKeyWords.includes(color)) {
      throw new Error(`Color ${color} is not a valid color.`);
    }



    return new Color(color);
  }

  public get color(): string {
    return this._color;
  }

  public equals(other: Color): boolean {
    return this._color === other.color;
  }

  private static isColor(color: string): boolean {
    if (colorKeyWords.includes(color)) return true;
    let regex = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
    if (regex.test(color)) 
        return color;
    else{
        regex = new RegExp('([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
        if (regex.test(color))
            return "#"+color;
    }


  }

  public toString(): string {
    return this._color;
  }


}