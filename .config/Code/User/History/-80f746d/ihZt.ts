import { parse } from 'path';
import { CompanyClient } from '../../domain/company-client';
import { z } from 'zod';
import {
  ValidationException,
  mapValidationErrors,
} from '../../../../../shared/parsing-errors/zod-parsing.handler';

const CommonFields = {
  id: z.number(),
  email: z.string().email(),
  phoneNumber: z.string(),
  password: z.string(),
};

const IndividualRegistrationCommandSchema = z.object({
  ...CommonFields,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  type: z.literal('individual'),
});

const CompanyRegistrationCommandSchema = z.object({
  ...CommonFields,
  companyName: z.string().max(64).min(5),
  type: z.literal('company'),
});

export const UnionSchema = z.union([IndividualRegistrationCommandSchema, CompanyRegistrationCommandSchema]);

type IndividualRegistrationCommand = z.infer<
  typeof IndividualRegistrationCommandSchema
>;
type CompanyRegistrationCommand = z.infer<
  typeof CompanyRegistrationCommandSchema
>;

export const parseRegistrationCommand = (data: RegistrationCommand): string => {
  let validationResult = null;

  
  if (data.type === 'individual') {
    validationResult = IndividualRegistrationCommandSchema.safeParse(data);
  } else if (data.type === 'company') {
    validationResult = CompanyRegistrationCommandSchema.safeParse(data);
  } else {
    console.log('error');
    throw new ValidationException([
      {
        field: 'type',
        message: 'type must be either individual or company',
      },
    ]);
  }

  if (!validationResult.success) {
    throw new ValidationException(
      mapValidationErrors(validationResult['error'].issues),
    );
  }

  return data.type;
};

export type RegistrationCommand =
  | IndividualRegistrationCommand
  | CompanyRegistrationCommand;

export const registrationCommandBuilder = ({
  id = 1,
  email = 'alice@gmail.com',
  password = 'password',
  phoneNumber = '+33636518875',
  type = 'individual',
}: Partial<
  IndividualRegistrationCommand | CompanyRegistrationCommand
> = {}) => {
  const props = {
    id,
    email,
    password,
    phoneNumber,
    type,
  };

  return {
    toIndividualClient: (firstName: string, lastName: string) =>
      individualRegistrationCommandBuilder({
        ...props,
        firstName,
        lastName,
        type: 'individual',
      }),
    toCompanyClient: (companyName: string) =>
      companyRegistrationCommandBuilder({
        ...props,
        companyName,
        type: 'company',
      }),
    withId: (id: number) => registrationCommandBuilder({ ...props, id }),
    withEmail: (email: string) =>
      registrationCommandBuilder({ ...props, email }),
    withPassword: (password: string) =>
      registrationCommandBuilder({ ...props, password }),
    withPhoneNumber: (phoneNumber: string) =>
      registrationCommandBuilder({ ...props, phoneNumber }),

    build: () => props,
  };
};

export const individualRegistrationCommandBuilder = ({
  id = 1,
  email = 'alice@gmail.com',
  password = 'password',
  phoneNumber = '+33636518875',
  lastName = 'Doe',
  firstName = 'John',
  type = 'individual',
}: Partial<IndividualRegistrationCommand> = {}) => {
  const props = {
    id,
    email,
    password,
    phoneNumber,
    lastName,
    firstName,
    type,
  };

  return {
    withId: (id: number) =>
      individualRegistrationCommandBuilder({ ...props, id }),
    withEmail: (email: string) =>
      individualRegistrationCommandBuilder({ ...props, email }),
    withPassword: (password: string) =>
      individualRegistrationCommandBuilder({ ...props, password }),
    withPhoneNumber: (phoneNumber: string) =>
      individualRegistrationCommandBuilder({ ...props, phoneNumber }),
    withLastName: (lastName: string) =>
      individualRegistrationCommandBuilder({ ...props, lastName }),
    withFirstName: (firstName: string) =>
      individualRegistrationCommandBuilder({ ...props, firstName }),

    build: () => props,
  };
};

export const companyRegistrationCommandBuilder = ({
  id = 1,
  email = 'alice@gmail.com',
  password = 'password',
  phoneNumber = '+33636518875',
  companyName = 'Alice Organization',
  type = 'company',
}: Partial<CompanyRegistrationCommand> = {}) => {
  const props = {
    id,
    email,
    password,
    phoneNumber,
    companyName,
    type,
  };

  return {
    withId: (id: number) => companyRegistrationCommandBuilder({ ...props, id }),
    withEmail: (email: string) =>
      companyRegistrationCommandBuilder({ ...props, email }),
    withPassword: (password: string) =>
      companyRegistrationCommandBuilder({ ...props, password }),
    withPhoneNumber: (phoneNumber: string) =>
      companyRegistrationCommandBuilder({ ...props, phoneNumber }),
    withCompanyName: (companyName: string) =>
      companyRegistrationCommandBuilder({ ...props, companyName }),

    build: () => props,
  };
};
