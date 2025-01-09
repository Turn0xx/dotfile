import { Observer } from "./building-blocks/observability/observer";
import { ObservableAction, ActionMap } from "./building-blocks/observability/subject";

export class ColorPreview implements Observer {

  private colors: Color[] = [];  


  update<T extends ObservableAction>(actionType: T, colorName: ActionMap[T]): void {
    throw new Error("Method not implemented.");
  }

  public render(): void {
    throw new Error("Method not implemented.");
  }

}