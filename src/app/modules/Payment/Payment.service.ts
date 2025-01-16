import { Payment } from './Payment.model';
import { TPayment } from './Payment.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import https from 'https';
import config from '../../config';
import { User } from '../user/user.models';
import mongoose from 'mongoose';
import { Donation } from '../Donation/Donation.models';

/**
 * Utility function to make HTTPS POST requests
 */
function makeHttpsRequest(
  url: string,
  data: Record<string, any>,
  headers: Record<string, string>,
) {
  return new Promise((resolve, reject) => {
    const requestData = JSON.stringify(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': requestData.length,
        ...headers,
      },
    };
    const req = https.request(url, options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        if (res.statusCode && res.statusCode < 300) {
          resolve(JSON.parse(responseBody));
        } else {
          reject(new Error(responseBody));
        }
      });
    });
    req.on('error', (error) => {
      reject(error);
    });
    req.write(requestData);
    req.end();
  });
}

const processPayment = async (id: string): Promise<TPayment> => {
  const paymentRecord = await Payment.findById(id);

  if (!paymentRecord) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  if (paymentRecord.status !== 'pending') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Payment already processed');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await Payment.findByIdAndUpdate(
      id,
      { status: 'success' },
      { new: true, session },
    );

    await User.findByIdAndUpdate(
      paymentRecord.userId,
      { status: 'Paid' },
      { new: true, session },
    );
    const user = await User.findById(paymentRecord.userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    await Donation.create({
      userId: user._id,
      name: user.fullName,
      email: user.email,
      amount: paymentRecord.amount,
      transectionId: paymentRecord.transactionId,
    });

    await session.commitTransaction();
    return result as TPayment;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Payment failed');
  } finally {
    await session.endSession();
  }
};
/**
 * Payment Service Methods
 */
const createPayment = async (data: TPayment): Promise<TPayment | any> => {
  // console.log(data);
  const user = await User.findById(data.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result1 = await Payment.create(data);
  if (!result1) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Payment failed');
  }
  const result = await processPayment(result1.id);

  return result;
};

const getAllPayments = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Payment.find(), query)
    .search(['transactionId', 'userId'])
    .filter(['status', 'userId', 'transactionId'])
    .sort()
    .paginate()
    .fields();

  const payments = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return { payments, meta };
};

const getPaymentById = async (id: string): Promise<TPayment | null> => {
  const payment = await Payment.findById(id);
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return payment;
};

const updatePayment = async (
  id: string,
  data: Partial<TPayment>,
): Promise<TPayment | null> => {
  const payment = await Payment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return payment;
};

const deletePayment = async (id: string): Promise<TPayment | null> => {
  const payment = await Payment.findByIdAndDelete(id);
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return payment;
};

export const PaymentService = {
  createPayment,
  processPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
