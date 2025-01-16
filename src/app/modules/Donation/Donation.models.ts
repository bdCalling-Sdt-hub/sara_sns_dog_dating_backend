// File: product.model.ts
// Description: Mongoose model for Product module

import { Schema, model } from 'mongoose';
import { DonationModel, TDonation } from './Donation.interface';

const donationSchema = new Schema<TDonation, DonationModel>(
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
    amount: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    transectionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Donation = model<TDonation, DonationModel>(
  'Donation',
  donationSchema,
);
