interface ParsingHandler {
    handle(error: any): void;
}


class ZodParsingHandler implements ParsingHandler {

    handle(error: any): void {
        throw new Error('Invalid data');
    }

}