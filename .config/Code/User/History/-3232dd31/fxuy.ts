import { z } from "zod";
import { ValidationException, mapValidationErrors } from "../../../../../shared/parsing-errors/zod-parsing.handler";

const ForgotPasswordSchema = z.object({
  type: z.union([z.literal("email"), z.literal("phone")]),
  identification: z.string(),
}).superRefine((data , ctx) => {
  if(data.type === "email"){
    if (!z.string().email().safeParse(data.identification).success) {
      ctx.addIssue({
        path: ["identification"],
        message: "Email is invalid",
        code: "invalid_literal",
        expected: 'email', // Add expected property
        received: 'not email', // Add received property
      });
    }
  }
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