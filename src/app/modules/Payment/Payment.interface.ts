// File: payment.interface.ts
// Description: Interface for mobile payment system

import { Types } from 'mongoose';

export type TPayment = {
  userId: Types.ObjectId;
  status: 'pending' | 'success' | 'failed';
  transactionId: string;
  amount: number;
};
