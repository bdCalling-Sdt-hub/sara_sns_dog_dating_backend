import { z } from 'zod';

// Validation schema for creating a product
const addValidationSchema = z.object({
  userId: z.string({ required_error: 'User id is required' }),
  userProfileId: z
    .string({ required_error: 'User profile id is required' })
    .optional(),
  name: z.string({ required_error: 'Name is required' }),
  gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
  age: z.number({ required_error: 'Age is required' }),
  size: z.enum(
    [
      'Extra Small (0-10 lbs)',
      'Small (10-30 lbs)',
      'Medium (30-55 lbs)',
      'Large (55-80 lbs)',
      'Extra Large (80+ lbs)',
    ],
    { required_error: 'Size is required' },
  ),
  neuteredSpayed: z.enum(['Yes', 'No'], {
    required_error: 'Neutered/Spayed status is required',
  }),
  howDoYouPlay: z.enum(
    [
      'I’m new to play, and can be shy',
      'Low speed; let’s hang out',
      'High Speed; I love to chase/be chased',
      'Focused Play; throw the ball!',
      'Always herding',
      ' Assertive; I need to be the boss',
    ],
    { required_error: 'Play behavior is required' },
  ),
  doYouLikeACrowd: z.enum(
    [
      'I prefer one friend at a time',
      'I’m comfortable with small groups',
      'I run with the pack!',
    ],
    { required_error: 'Crowd preference is required' },
  ),
  playSizePreferences: z.enum(
    [
      'I’m comfortable with friends my own size',
      'I prefer medium - big dogs',
      'I prefer small - medium dogs (we love the short kings/queens!)',
    ],
    { required_error: 'Play size preferences are required' },
  ),
  locationPreferences: z.enum(
    [
      'backyard/home playdate',
      'neighborhood walk',
      'trail/hike',
      'I’m comfortable in any crowd',
    ],
    { required_error: 'Location preferences are required' },
  ),
  description: z.string({ required_error: 'Description is required' }),
});

// Validation schema for updating a pet profile
const updateValidationSchema = z.object({
  userId: z.string().optional(),
  userProfileId: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  age: z.number().optional(),
  gender: z.enum(['male', 'female']).optional(),
  size: z
    .enum([
      'Extra Small (0-10 lbs)',
      'Small (10-30 lbs)',
      'Medium (30-55 lbs)',
      'Large (55-80 lbs)',
      'Extra Large (80+ lbs)',
    ])
    .optional(),
  neuteredSpayed: z.enum(['Yes', 'No']).optional(),
  howDoYouPlay: z
    .enum([
      'I’m new to play, and can be shy',
      'Low speed; let’s hang out',
      'High Speed; I love to chase/be chased',
      'Focused Play; throw the ball!',
      'Always herding',
      ' Assertive; I need to be the boss',
    ])
    .optional(),
  doYouLikeACrowd: z
    .enum([
      'I prefer one friend at a time',
      'I’m comfortable with small groups',
      'I run with the pack!',
    ])
    .optional(),
  playSizePreferences: z
    .enum([
      'I’m comfortable with friends my own size',
      'I prefer medium - big dogs',
      'I prefer small - medium dogs (we love the short kings/queens!)',
    ])
    .optional(),
  locationPreferences: z
    .enum([
      'backyard/home playdate',
      'neighborhood walk',
      'trail/hike',
      'I’m comfortable in any crowd',
    ])
    .optional(),
  description: z.string().optional(),
});

export const petProfileValidations = {
  addValidationSchema,
  updateValidationSchema,
};
