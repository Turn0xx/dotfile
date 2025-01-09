import { Observer } from "./observer";
import { Subject } from "./subject";

export class BasicSubject implements Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(): void {
    this.observers.forEach((o) => o.update());
  }
}