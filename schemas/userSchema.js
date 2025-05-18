import { z } from 'zod';


export const createUserSchema = z.object({

    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Email must be valid'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password must be at most 100 characters')
    // .regex(/[A-Z]/, 'Must include at least one uppercase letter')
    // .regex(/[a-z]/, 'Must include at least one lowercase letter')
    // .regex(/[0-9]/, 'Must include at least one number')
    // .regex(/[^A-Za-z0-9]/, 'Must include at least one special character')
})