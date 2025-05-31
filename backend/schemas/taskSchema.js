import { z } from 'zod';

export const taskValidationSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    status: z.enum(['pending', 'in progress', 'completed']).optional(),
    dueDate: z.string().optional()
})