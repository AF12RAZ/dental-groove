import { z } from "zod";

const envSchema = z.object({
    VITE_SUPABASE_URL: z.string().url(),
    VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
    // Add other env vars here
});

export const validateEnv = () => {
    try {
        envSchema.parse(import.meta.env);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("❌ Invalid environment variables:", error.flatten().fieldErrors);
            // In a real app, you might want to throw here to prevent app startup,
            // but for a client-side app, logging is often safer to avoid crashing the user's browser immediately 
            // if it's a minor config. However, for core secrets, we should be strict.
            throw new Error("Missing required environment variables. Check console.");
        }
    }
}
