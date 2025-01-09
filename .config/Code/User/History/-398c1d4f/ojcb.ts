import { z } from 'zod';

const AddressValidator = z.string().max(255).min(5);

export function addressValidator(address: unknown): boolean {
    try {
        AddressValidator.parse(address as string);
        return true;
    } catch (error) {
        return false;
    }    
}