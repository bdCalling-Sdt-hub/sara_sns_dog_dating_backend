import { Schema, model } from 'mongoose';
import { TUserProfile, UserProfileModel } from './UserProfile.interface';

// Define the location schema
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
// Define the user profile schema
const userProfileSchema = new Schema<TUserProfile, UserProfileModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to User model
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
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: false, // Optional field
    },
    petsProfileId: {
      type: Schema.Types.ObjectId,
      required: false, // Optional field
      ref: 'PetProfile', // Reference to PetProfile model
    },
    location: {
      type: locationSchema,
      required: false, // Optional field
    },
    lastLocationChangeAt: {
      type: Date,
      required: false, // Optional field
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    toJSON: { virtuals: true },
  },
);

// Pre-save hook to track location change and set lastLocationChangeAt
userProfileSchema.pre('save', function (next) {
  if (this.isModified('location')) {
    this.lastLocationChangeAt = new Date();
  }
  next();
});

// Create and export the model
export const UserProfile = model<TUserProfile, UserProfileModel>(
  'UserProfile',
  userProfileSchema,
);
