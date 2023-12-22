import { z } from "zod";

export  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    sector: z.string({
      required_error: "Please select a sector.",
    }),
    agree: z
      .boolean({
        required_error: "agree term is required",
      })
      .default(false)
      .refine((value) => value === true, {
        message: "agree term must be checked.",
      }),
  });