// File: petProfile.model.ts
// Description: Mongoose model for PetProfile module

import { Schema, model } from 'mongoose';
import { PetProfileModel, TPetProfile } from './PetProfile.interface';

const locationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      validate: {
        validator: (v: number[]) => v.length === 2,
        message:
          'Coordinates must contain exactly two values: [longitude, latitude].',
      },
    },
  },
  { _id: false }, // No separate _id for embedded schemas
);

// Add a 2dsphere index to support geospatial queries
locationSchema.index({ coordinates: '2dsphere' });

// Define the pet profile schema
const petProfileSchema = new Schema<TPetProfile, PetProfileModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to User model
    },
    userProfileId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'UserProfile', // Reference to UserProfile model
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false, // Optional field
    },
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    size: {
      type: String,
      enum: [
        'Extra Small (0-10 lbs)',
        'Small (10-30 lbs)',
        'Medium (30-55 lbs)',
        'Large (55-80 lbs)',
        'Extra Large (80+ lbs)',
      ],
      required: true,
    },
    neuteredSpayed: {
      type: String,
      enum: ['Yes', 'No'],
      required: true,
    },
    howDoYouPlay: {
      type: String,
      enum: [
        'I’m new to play, and can be shy',
        'Low speed; let’s hang out',
        'High Speed; I love to chase/be chased',
        'Focused Play; throw the ball!',
        'Always herding',
        ' Assertive; I need to be the boss',
      ],
      required: true,
    },
    doYouLikeACrowd: {
      type: String,
      enum: [
        'I prefer one friend at a time',
        'I’m comfortable with small groups',
        'I run with the pack!',
      ],
      required: true,
    },
    playSizePreferences: {
      type: String,
      enum: [
        'I’m comfortable with friends my own size',
        'I prefer medium - big dogs',
        'I prefer small - medium dogs (we love the short kings/queens!)',
      ],
      required: true,
    },
    locationPreferences: {
      type: String,
      enum: [
        'backyard/home playdate',
        'neighborhood walk',
        'trail/hike',
        'I’m comfortable in any crowd',
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    toJSON: { virtuals: true },
  },
);

// Create and export the model
export const PetProfile = model<TPetProfile, PetProfileModel>(
  'PetProfile',
  petProfileSchema,
);
