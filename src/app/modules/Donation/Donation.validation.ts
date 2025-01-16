// File: product.validation.ts
// Description: Zod schemas for Product module validation

import { z } from 'zod';

// Validation schema for creating a product
const addValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User id is required' }),
    name: z.string({ required_error: 'Name is required' }),
    shelterTitle: z.string({ required_error: 'Shelter title is required' }),
    amount: z.number({ required_error: 'Amount is required' }),
    email: z.string({ required_error: 'Email is required' }),
    transectionId: z.string({ required_error: 'Transection id is required' }),
  }),
});

// Validation schema for updating a product
const updateValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User id is required' }).optional(),
    name: z.string({ required_error: 'Name is required' }).optional(),
    shelterTitle: z
      .string({ required_error: 'Shelter title is required' })
      .optional(),
    amount: z.number({ required_error: 'Amount is required' }).optional(),
    email: z.string({ required_error: 'Email is required' }).optional(),
    transectionId: z
      .string({ required_error: 'Transection id is required' })
      .optional(),
  }),
});

export const donationValidations = {
  addValidationSchema,
  updateValidationSchema,
};
