import { DateProvider } from "../date-provider";

export class StubDateProvider implements DateProvider {
  constructor() {}
  now: Date;
  getNow(): Date {
    return this.now;
  }
}