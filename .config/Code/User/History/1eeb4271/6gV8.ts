import { parse } from 'path';
import { CompanyClient } from './../domain/company-client';
import { z } from 'zod';
import { ValidationException, mapValidationErrors } from '../zod-parsing.handler';

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
  firstName = 'Alice',
  lastName = 'Doe',
  companyName = 'Alice Organization',
  type = 'individual',
}: Partial<IndividualRegistrationCommand | CompanyRegistrationCommand> = {}) => {
  if (type === 'individual') {
    return {
      id,
      email,
      password,
      phoneNumber,
      firstName,
      lastName,
      type,
    } as IndividualRegistrationCommand;
  } else if (type === 'company') {
    return {
      id,
      email,
      password,
      phoneNumber,
      companyName,
      type,
    } as CompanyRegistrationCommand;
  }


}