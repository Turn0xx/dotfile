export interface DateProvider {
  getNow(): Date;
}

export class RealDateProvider implements DateProvider {
  constructor() {}

  getNow(): Date {
    return new Date();
  }
}
