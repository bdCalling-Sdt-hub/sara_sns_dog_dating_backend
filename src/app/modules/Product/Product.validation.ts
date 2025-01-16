// File: product.validation.ts
// Description: Zod schemas for Product module validation

import { z } from 'zod';

// Validation schema for creating a product
const addProductValidationSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  price: z.number({ required_error: 'Price is required' }),
  productLink: z.string({ required_error: 'Product link is required' }),
});

// Validation schema for updating a product
const updateProductValidationSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).optional(),
  price: z.number({ required_error: 'Price is required' }).optional(),
  productLink: z
    .string({ required_error: 'Product link is required' })
    .optional(),
});

export const productValidations = {
  addProductValidationSchema,
  updateProductValidationSchema,
};
