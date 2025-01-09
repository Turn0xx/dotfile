import { z } from 'zod';

// Define common fields
const CommonFields = {
  email: z.string().email(),
  phoneNumber: z.string(),
  password: z.string(),
};

// Individual registration command schema
const IndividualRegistrationCommandSchema = z.object({
  ...CommonFields,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  type: z.literal('individual'), // Optional discriminator
});

// Company registration command schema
const CompanyRegistrationCommandSchema = z.object({
  ...CommonFields,
  organizationName: z.string().max(64).min(5),
  organizationAddress: z.string(),
  username: z.string().max(64).min(5),
  type: z.literal('company'), // Optional discriminator
});

export type IndividualRegistrationCommand = z.infer<typeof IndividualRegistrationCommandSchema>;
export type CompanyRegistrationCommand = z.infer<typeof CompanyRegistrationCommandSchema>;
