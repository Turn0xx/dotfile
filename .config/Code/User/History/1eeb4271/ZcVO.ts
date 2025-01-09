import { parse } from 'path';
import { CompanyClient } from './../domain/company-client';
import { z } from 'zod';
import { ValidationException, mapValidationErrors } from '../zod-parsing.handler';

const CommonFields = {
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

export const parseRegistrationCommand = (data: RegistrationCommand) => {
  let validationResult = null;

  if (data.type === 'individual') {
    validationResult = IndividualRegistrationCommandSchema.safeParse(data);
  } else if (data.type === 'company') {
    validationResult = CompanyRegistrationCommandSchema.parse(data);
  }

  if (!validationResult.success) {
    throw new ValidationException(
      mapValidationErrors(validationResult['error'].issues),
    );
  }
};

export type RegistrationCommand =
  | IndividualRegistrationCommand
  | CompanyRegistrationCommand;
