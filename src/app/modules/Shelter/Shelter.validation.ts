// File: product.validation.ts
// Description: Zod schemas for Product module validation

import { z } from 'zod';

// Validation schema for creating a product
const addValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  age: z.number({ required_error: 'Age is required' }),
  gender: z.string({ required_error: 'Gender is required' }),
  size: z.string({ required_error: 'Size is required' }),
  city: z.string({ required_error: 'City is required' }),
  description: z.string({ required_error: 'Description is required' }),
  shelterLink: z.string({ required_error: 'Shelter link is required' }),
});

// Validation schema for updating a product
const updateValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).optional(),
  age: z.number({ required_error: 'Age is required' }).optional(),
  gender: z.string({ required_error: 'Gender is required' }).optional(),
  size: z.string({ required_error: 'Size is required' }).optional(),
  city: z.string({ required_error: 'City is required' }).optional(),
  description: z
    .string({ required_error: 'Description is required' })
    .optional(),
  shelterLink: z
    .string({ required_error: 'Shelter link is required' })
    .optional(),
});

export const shelterValidations = {
  addValidationSchema,
  updateValidationSchema,
};
