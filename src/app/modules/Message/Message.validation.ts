// File: product.validation.ts
// Description: Zod schemas for Product module validation

import { z } from 'zod';

// Validation schema for creating a product
const addMessageValidationSchema = z.object({
  chat: z.string({ required_error: 'Chat id is required' }),
  sender: z.string({ required_error: 'Sender id is required' }),
  text: z.string({ required_error: 'Message is required' }).optional(),
  image: z.string({ required_error: 'Image is required' }).optional(),
});

// Validation schema for updating a product
const updateMessageValidationSchema = z.object({});

export const MessageValidations = {
  addMessageValidationSchema,
  updateMessageValidationSchema,
};
