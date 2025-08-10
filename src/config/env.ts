import z from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().min(1024).max(65535).default(3000),
  HOST: z.string().default("0.0.0.0"),
  CORS_ORIGIN: z.string().default("*"),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters (use a strong, random string)"),
  JWT_TTL_MIN: z.coerce
    .number()
    .int()
    .positive()
    .max(24 * 60)
    .default(30),
});

export type Env = z.infer<typeof EnvSchema>;

export function loadEnv(): Env {
  const parsed = EnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
}
