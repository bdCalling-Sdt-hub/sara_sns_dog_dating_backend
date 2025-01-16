import { Schema, model } from 'mongoose';
import { TNotification } from './notification.interface';

// Define the schema
const NotificationSchema = new Schema<TNotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to User model
    },
    message: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'coustomer'],
      required: false,
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'error', 'success'],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the model
const Notification = model<TNotification>('Notification', NotificationSchema);

export default Notification;
