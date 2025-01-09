import { z } from "zod";
import { ValidationException, mapValidationErrors } from "../../../../../shared/parsing-errors/zod-parsing.handler";

const ForgotPasswordSchema = z.object({
  email: z.string().email().optional().refine((value, ctx) => {
    if (ctx.parent.type === "phone") {
      return value === undefined;
    }
    return true;
  }, {
    message: "Email is required when type is not 'phone'",
    path: ["email"],
  }),
  type: z.union([z.literal("email"), z.literal("phone")]),
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