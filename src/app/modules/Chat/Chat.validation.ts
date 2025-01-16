// File: product.validation.ts
// Description: Zod schemas for Product module validation

import { z } from 'zod';

// Validation schema for creating a product
const addProductValidationSchema = z.object({
  createdBy: z.string({ required_error: 'Created by is required' }),
  users: z.array(z.string({ required_error: 'Users are required' })),
});

// Validation schema for updating a product
const updateProductValidationSchema = z.object({});

export const productValidations = {
  addProductValidationSchema,
  updateProductValidationSchema,
};
