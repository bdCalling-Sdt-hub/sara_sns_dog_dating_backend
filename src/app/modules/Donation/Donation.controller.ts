import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DonationService } from './Donation.service';


/**
 * Create a new Donation.
 */

const addNew = catchAsync(async (req: Request, res: Response) => {
  const DonationData = req.body;
  const result = await DonationService.addNew(DonationData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'New Donation added successfully!',
    data: result,
  });
});

/**
 * Get all Donations.
 */

const getAll = catchAsync(async (req: Request, res: Response) => {
  const Donations = await DonationService.getAll(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Donation retrieved successfully!',
    data: Donations.result,
    meta: Donations.meta,
  });
});

/**
 * Get a single Donation by ID.
 */
const getOneById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const Donation = await DonationService.getOneById(id);
  if (!Donation) throw new Error('Donation not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation retrieved successfully!',
    data: Donation,
  });
});

/**
 * Update a Donation.
 */
const updateById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const result = await DonationService.updateById(id, data);
  if (!result) throw new Error('Donation not found');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation updated successfully!',
    data: result,
  });
});

/**
 * Soft delete a Donation.
 */
const deleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const Donation = await DonationService.deleteById(id);
  if (!Donation) throw new Error('Donation not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation deleted successfully!',
    data: Donation,
  });
});

export const DonationController = {
  addNew,
  getAll,
  getOneById,
  updateById,
  deleteById,
};
