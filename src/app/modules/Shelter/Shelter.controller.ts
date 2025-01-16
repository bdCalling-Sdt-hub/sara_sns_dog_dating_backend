import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../error/AppError';
import { ShelterService } from './Shelter.service';

/**
 * Create a new Shelter.
 */

const addNew = catchAsync(async (req: Request, res: Response) => {
  const ShelterData = req.body;
  const file = req.file as Express.Multer.File;
  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Images are required');
  }
  const result = await ShelterService.addNew(file, ShelterData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'New Shelter added successfully!',
    data: result,
  });
});

/**
 * Get all Shelters.
 */

const getAll = catchAsync(async (req: Request, res: Response) => {
  const Shelters = await ShelterService.getAll(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Shelter retrieved successfully!',
    data: Shelters.result,
    meta: Shelters.meta,
  });
});

/**
 * Get a single Shelter by ID.
 */
const getOneById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const Shelter = await ShelterService.getOneById(id);
  if (!Shelter) throw new Error('Shelter not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shelter retrieved successfully!',
    data: Shelter,
  });
});

/**
 * Update a Shelter.
 */
const updateById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const file = req.file as Express.Multer.File;

  const result = await ShelterService.updateById(id, file, data);
  if (!result) throw new Error('Shelter not found');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shelter updated successfully!',
    data: result,
  });
});

/**
 * Soft delete a Shelter.
 */
const deleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const Shelter = await ShelterService.deleteById(id);
  if (!Shelter) throw new Error('Shelter not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shelter deleted successfully!',
    data: Shelter,
  });
});

export const ShelterController = {
  addNew,
  getAll,
  getOneById,
  updateById,
  deleteById,
};
