export interface DateProvider {
  getNow(): Date;
}

export class RealDateProvider implements DateProvider {
  constructor() {
    console.log('RealDateProvider');
  }

  getNow(): Date {
    return new Date();
  }
}
