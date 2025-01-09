import { Client, ClientJson } from '../../domain/client';
import { CompanyClientJson } from '../../domain/company-client';
import { IndividualClientJson } from '../../domain/individual-client';

export const clientBuilder = ({
  id = '1',
  email = 'email@gmail.com',
  password = 'password',
  phoneNumber = '+33636518875',
  createdAt = new Date('2023-01-01T10:30:00.000Z'),
  isVerified = false,
}: Partial<ClientJson> = {}) => {
  const props = {
    id,
    email,
    password,
    phoneNumber,
    createdAt,
    isVerified,
  };

  return {
    toIndividualClient: (firstName: string, lastName: string) =>
      individualClientBuilder({ ...props, firstName, lastName }),
    toCompanyClient: (companyName: string) =>
      companyClientBuilder({ ...props, companyName }),
    withId: (id: string) => clientBuilder({ ...props, id }),
    withEmail: (email: string) => clientBuilder({ ...props, email }),
    withPassword: (password: string) => clientBuilder({ ...props, password }),
    withPhoneNumber: (phoneNumber: string) =>
      clientBuilder({ ...props, phoneNumber }),
    withCreatedAt: (createdAt: Date) => clientBuilder({ ...props, createdAt }),
    withIsVerified: (isVerified: boolean) =>
      clientBuilder({ ...props, isVerified }),

    build: () => props,
  };
};

export const individualClientBuilder = ({
  id = '1',
  email = 'email@gmail.com',
  password = 'password',
  phoneNumber = '+33636518875',
  lastName = 'Doe',
  firstName = 'John',
  createdAt = new Date('2023-01-01T10:30:00.000Z'),
  isVerified = false,
}: Partial<IndividualClientJson> = {}) => {
  const props = {
    id,
    email,
    password,
    phoneNumber,
    lastName,
    firstName,
    createdAt,
    isVerified,
  };

  return {
    withId: (id: string) => individualClientBuilder({ ...props, id }),
    withEmail: (email: string) => individualClientBuilder({ ...props, email }),
    withPassword: (password: string) =>
      individualClientBuilder({ ...props, password }),
    withPhoneNumber: (phoneNumber: string) =>
      individualClientBuilder({ ...props, phoneNumber }),
    withLastName: (lastName: string) =>
      individualClientBuilder({ ...props, lastName }),
    withFirstName: (firstName: string) =>
      individualClientBuilder({ ...props, firstName }),
    withCreatedAt: (createdAt: Date) =>
      individualClientBuilder({ ...props, createdAt }),

    build: () => props,
  };
};

export const companyClientBuilder = ({
  id = '1',
  email = 'email@gmail.com',
  password = 'password',
  phoneNumber = '+33636518875',
  companyName = 'Company',
  createdAt = new Date('2023-01-01T10:30:00.000Z'),
  isVerified = false,
}: Partial<CompanyClientJson> = {}) => {
  const props = {
    id,
    email,
    password,
    phoneNumber,
    companyName,
    createdAt,
    isVerified,
  };

  return {
    withId: (id: string) => companyClientBuilder({ ...props, id }),
    withEmail: (email: string) => companyClientBuilder({ ...props, email }),
    withPassword: (password: string) =>
      companyClientBuilder({ ...props, password }),
    withPhoneNumber: (phoneNumber: string) =>
      companyClientBuilder({ ...props, phoneNumber }),
    withCompanyName: (companyName: string) =>
      companyClientBuilder({ ...props, companyName }),
    withCreatedAt: (createdAt: Date) =>
      companyClientBuilder({ ...props, createdAt }),

    build: () => props,
  };
};