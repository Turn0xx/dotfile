import { z } from 'zod';

const EmailValidator = z.string().email();

export function emailValidator(email: unknown): boolean {
    const result = EmailValidator.safeParse(email);
}



