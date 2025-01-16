// File: product.model.ts
// Description: Mongoose model for Product module

import { Schema, model } from 'mongoose';
import { ShelterModel, TShelter } from './Shelter.interface';

const shelterSchema = new Schema<TShelter, ShelterModel>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
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
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shelterLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Shelter = model<TShelter, ShelterModel>('Shelter', shelterSchema);
