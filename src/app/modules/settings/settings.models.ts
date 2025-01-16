import { Schema, model } from 'mongoose';
import { TSettings } from './settings.interface'; // Adjust the path as necessary

const settingsSchema = new Schema<TSettings>(
  {
    privacyPolicy: {
      type: String,
      default: '',
    },
    aboutUs: {
      type: String,
      default: '',
    },
    support: {
      type: String,
      default: '',
    },
    termsOfService: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

// Create the model
export const Settings = model<TSettings>('Settings', settingsSchema);
