import { z } from "zod";
import { ValidationException, mapValidationErrors } from "../../../../../shared/parsing-errors/zod-parsing.handler";

const ForgotPasswordSchema = z.object({
  type: z.union([z.literal("email"), z.literal("phone")]),
  identification: z.string().refine((value, ctx) => {
    if (ctx.parent.type === "email") {
      // Add email validation logic here
      // For example, you can use a regular expression to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return ctx.fail("Invalid email format");
      }
    } else if (ctx.parent.type === "phone") {
      // Add phone validation logic here
      // For example, you can use a regular expression to validate phone format
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        return ctx.fail("Invalid phone format");
      }
    }
    return true;
  }),
});

export type ForgotPasswordCommand = z.infer<typeof ForgotPasswordSchema>;

export const parseForgotPasswordCommand = (
  data: ForgotPasswordCommand,
): ForgotPasswordCommand => {
  const validationResult = ForgotPasswordSchema.safeParse(data);

  if (!validationResult.success) {
    throw new ValidationException(
      mapValidationErrors(validationResult["error"].issues),
    );
  }

  return data;
};