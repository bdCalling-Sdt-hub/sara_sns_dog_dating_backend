// File: payment.model.ts
// Description: Schema and model for mobile payment system

import { Schema, model } from 'mongoose';
import { TPayment } from './Payment.interface';

const paymentSchema = new Schema<TPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      required: true,
      default: 'pending',
    },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Payment = model<TPayment>('Payment', paymentSchema);
