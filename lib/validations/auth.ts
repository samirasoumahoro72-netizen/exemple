import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Veuillez renseigner votre adresse e-mail.')
    .email('Adresse e-mail invalide.'),
  password: z
    .string()
    .min(1, 'Veuillez renseigner votre mot de passe.')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères.'),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Veuillez renseigner votre nom complet.')
      .min(2, 'Le nom doit contenir au moins 2 caractères.'),
    email: z
      .string()
      .min(1, 'Veuillez renseigner votre adresse e-mail.')
      .email('Adresse e-mail invalide.'),
    password: z
      .string()
      .min(1, 'Veuillez choisir un mot de passe.')
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères.'),
    confirmPassword: z
      .string()
      .min(1, 'Veuillez confirmer votre mot de passe.'),
    role: z.enum(['student', 'instructor'], {
      required_error: 'Veuillez sélectionner un rôle.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
