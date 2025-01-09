import { IDomainEventOrganizer } from '@pocket-ticket/webapp-frontend';

export interface IAuthenticationService {
  register(payload: IDomainEventOrganizer): Promise<void>;
  login(email: string, password: string): Promise<IDomainEventOrganizer>;
  logout(): Promise<void>;
  subscribe(callback: () => void): { unsubscribe: () => void };
}
