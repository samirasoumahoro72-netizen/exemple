import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Veuillez renseigner votre nom.')
    .min(2, 'Le nom doit comporter au moins 2 caractères.'),
  email: z
    .string()
    .min(1, 'Veuillez renseigner votre adresse e-mail.')
    .email('Adresse e-mail invalide.'),
  subject: z
    .string()
    .min(1, 'Veuillez préciser le sujet de votre message.')
    .min(3, 'Le sujet doit comporter au moins 3 caractères.'),
  message: z
    .string()
    .min(1, 'Veuillez rédiger votre message.')
    .min(10, 'Votre message doit comporter au moins 10 caractères.'),
});

export type ContactInput = z.infer<typeof contactSchema>;
