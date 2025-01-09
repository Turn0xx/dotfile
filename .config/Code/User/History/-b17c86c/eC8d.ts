import { Client, ClientJson } from '../domain/client';
import { IndividualClientJson } from '../domain/individual-client';

export const clientBuilder = ({
  id = 1,
  email = 'email@gmail.com',
  password = 'password',
  phoneNumber = '+33636518875',
  createdAt = new Date('2023-01-01T10:30:00.000Z')
}: Partial<ClientJson | IndividualClientJson }> = {}) => {
  const props = {
    id,
    email,
    password,
    phoneNumber,
    createdAt,
  };


  return {

    withId: (id: number) => clientBuilder({ ...props, id }),
    withEmail: (email: string) => clientBuilder({ ...props, email }),
    withPassword: (password: string) => clientBuilder({ ...props, password }),
    withPhoneNumber: (phoneNumber: string) => clientBuilder({ ...props, phoneNumber }),
    withCreatedAt: (createdAt: Date) => clientBuilder({ ...props, createdAt }),

    build: () => props,
  };
};
