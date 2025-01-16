// File: payment.controller.ts
// Description: Controller logic for Payment module

import { Request, Response } from 'express';
import { PaymentService } from './Payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const paymentData = req.body;
  const result = await PaymentService.createPayment(paymentData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Payment created successfully!',
    data: result,
  });
});

const processPayment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PaymentService.processPayment(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment processed successfully!',
    data: result,
  });
});

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPayments(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payments retrieved successfully!',
    data: result.payments,
    meta: result.meta,
  });
});

const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentService.getPaymentById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment retrieved successfully!',
    data: result,
  });
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const paymentData = req.body;
  const result = await PaymentService.updatePayment(id, paymentData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment updated successfully!',
    data: result,
  });
});

const deletePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentService.deletePayment(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment deleted successfully!',
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  processPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
