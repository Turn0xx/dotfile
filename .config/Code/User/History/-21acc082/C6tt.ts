import { Observer } from "./observer";
import { Subject } from "./subject";

export class BasicSubject implements Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    if (this.observers.includes(observer)) {
      return;
    }

    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(): void {
    this.observers.map((o) => o.update(A));
  }

  public notifyAdd() {
    this.observers.map((o) => o.update());
  }
}