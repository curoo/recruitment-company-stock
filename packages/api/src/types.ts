import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(3),
});
export type User = z.infer<typeof userSchema>;

export const dbUserSchema = userSchema.extend({
  passcode: z.string().min(4).max(100),
});
export type DbUser = z.infer<typeof dbUserSchema>;

export const credentialsSchema = z.object({
  email: z.string().email(),
  passcode: z.string(),
});
export type Credentials = z.infer<typeof credentialsSchema>;

export const companySchema = z.object({
  id: z.number(),
  tickerCode: z.string(),
  name: z.string(),
});
export type Company = z.infer<typeof companySchema>;
