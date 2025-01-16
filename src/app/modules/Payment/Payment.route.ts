// File: payment.routes.ts
// Description: Express routes for Payment module

import express from 'express';
import { PaymentController } from './Payment.controller';

const router = express.Router();

router.post('/add', PaymentController.createPayment);
router.get('/', PaymentController.getAllPayments);
router.get('/:id', PaymentController.getPaymentById);
router.patch('/process/:id', PaymentController.processPayment);
router.patch('/:id', PaymentController.updatePayment);
router.delete('/:id', PaymentController.deletePayment);

export const PaymentRoutes = router;
