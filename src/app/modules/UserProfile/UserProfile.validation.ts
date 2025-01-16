// File: userProfile.validation.ts
// Description: Zod schemas for UserProfile module validation

import { z } from 'zod';

// Validation schema for creating a user profile
const addValidationSchema = z.object({
  userId: z.string({ required_error: 'User ID is required' }),

  address: z.string({ required_error: 'Address is required' }),
  location: z
    .object({
      type: z.literal('Point', {
        required_error: 'Location type must be Point',
      }),
      coordinates: z.tuple([
        z.number({ required_error: 'Longitude is required' }),
        z.number({ required_error: 'Latitude is required' }),
      ]),
    })
    .optional(),
});

// Validation schema for updating a user profile
const updateValidationSchema = z.object({
  userId: z.string({ required_error: 'User ID is required' }).optional(),
  address: z.string({ required_error: 'Address is required' }).optional(),
  location: z
    .object({
      type: z.literal('Point', {
        required_error: 'Location type must be Point',
      }),
      coordinates: z.tuple([
        z.number({ required_error: 'Longitude is required' }),
        z.number({ required_error: 'Latitude is required' }),
      ]),
    })
    .optional(),
});

export const userProfileValidations = {
  addValidationSchema,
  updateValidationSchema,
};
