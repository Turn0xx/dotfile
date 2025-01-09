import { z } from 'zod';

const PasswordValidator = z.string().min(8).max(64);

export function passwordValidator(password: unknown): boolean {
    try {
        PasswordValidator.parse(password as string);
        return true;
    } catch (error) {
        return false;
    }    
}