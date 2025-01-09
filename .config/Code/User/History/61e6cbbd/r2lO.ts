import { z } from 'zod';

const PhoneValidator = z.string().min(10).max(14);

export function phoneValidator(phone: unknown): boolean {
    try {
        PhoneValidator.parse(phone as string);
        return true;
    } catch (error) {
        return false;
    }    
}