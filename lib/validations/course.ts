import { z } from 'zod';

export const courseSchema = z.object({
  title: z
    .string()
    .min(1, 'Veuillez saisir un titre pour le cours.')
    .min(5, 'Le titre doit contenir au moins 5 caractères.'),
  description: z
    .string()
    .min(1, 'Veuillez saisir une description courte.')
    .min(15, 'La description doit contenir au moins 15 caractères.'),
  fullContent: z.string().optional(),
  price: z.coerce
    .number()
    .min(0, 'Le prix ne peut pas être négatif.'),
  categorySlug: z.string().min(1, 'Veuillez choisir une catégorie.'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  imageUrl: z
    .string()
    .url('L\'URL de l\'image doit être valide.')
    .optional()
    .or(z.literal('')),
  durationHours: z.coerce.number().min(1, 'Durée minimale: 1 heure.'),
  lessonsCount: z.coerce.number().min(1, 'Au moins 1 leçon.'),
  isFeatured: z.boolean().default(false),
});

export type CourseInput = z.infer<typeof courseSchema>;
