export interface DateProvider {
    getNow(): Date;
}

export class RealDateProvider implements DateProvider {
    getNow(): Date {
        return new Date();
    }
}