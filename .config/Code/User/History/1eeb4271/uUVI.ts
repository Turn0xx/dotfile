import { z } from 'zod';

const BaseCommandSchema = z.object({
  email: z.string().email(),
  phoneNumber: z.string(),
  password: z.string(),
}).readonly();

const IndividualRegistrationCommandSchema = BaseCommandSchema. ({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const CompanyRegistrationCommandSchema = BaseCommandSchema.extend({
  organizationName: z.string().max(64).min(5),
  organizationAddress: z.string(),
  username: z.string().max(64).min(5),
});

export type IndividualRegistrationCommand = z.infer<typeof IndividualRegistrationCommandSchema>;
export type CompanyRegistrationCommand = z.infer<typeof CompanyRegistrationCommandSchema>;
