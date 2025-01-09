import { z } from 'zod';

const EmailValidator = z.string().email();

export function emailValidator(email: unknown): boolean {
    try {
        EmailValidator.parse(email as string);
        return true;
    } catch (error) {
        return false;
    }    
} 



