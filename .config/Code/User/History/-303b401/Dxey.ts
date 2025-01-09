
export class Password extends ValueObject<string>{
  private constructor(password: string) {
    super(password);
  }

  static fromValue(password: unknown , validator ?: (value: unknown) => boolean): Password {

    if (validator) {
      if (!validator(password)) {
        throw new Error('Invalid password');
      }
    }

    return new Password(password as string);
  }

  
}