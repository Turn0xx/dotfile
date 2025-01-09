export class DomainVoValidationError extends Error {
    constructor(domain: string , voName: string , message: string) {
        super(message);
        this.name = 'DomainVoValidationError';
        this.message = `Domain: ${domain} Value Object: ${voName} ${message}`;
        this.
    }
}