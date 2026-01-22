import { z } from "zod";

// Common validation patterns
const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const AppointmentSchema = z.object({
    serviceId: z.string().uuid("Invalid service ID"),
    date: z.date({
        required_error: "Please select a date",
        invalid_type_error: "That's not a date!",
    }),
});

export const ContactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

export type AppointmentForm = z.infer<typeof AppointmentSchema>;
export type ContactForm = z.infer<typeof ContactFormSchema>;
