
import { z } from 'zod';

const createPaymentSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    method: z.enum(['card', 'Wave', 'Orange_Money', 'Mtn_Money', 'Moov_Money']),
    status: z.enum(['pending', 'success', 'failed']),
    transactionId: z.string().min(1, 'Transaction ID is required'),
    clientSecret: z.string().min(1, 'Client secret is required'),
    transactionDate: z.string().optional(),
  }),
});

const getPaymentSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Payment ID is required'),
  }),
});

const updatePaymentSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Payment ID is required'),
  }),
  body: z.object({
    status: z.enum(['pending', 'success', 'failed']).optional(),
    isAlreadyUsed: z.boolean().optional(),
  }),
});

const deletePaymentSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Payment ID is required'),
  }),
});

export const paymentValidation = {
  createPaymentSchema,
  getPaymentSchema,
  updatePaymentSchema,
  deletePaymentSchema,
};
