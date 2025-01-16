import QueryBuilder from '../../builder/QueryBuilder';

import { unlink } from 'fs/promises';
import { TDonation } from './Donation.interface';
import { Donation } from './Donation.models';
import {
  donationFilterableFields,
  donationSearchableFields,
} from './Donation.constants';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

/**
 * Add new product(s) with sequential product IDs.
 */
const addNew = async (data: Partial<TDonation>): Promise<TDonation> => {
  const result = await Donation.create(data);
  return result;
};

/**
 * Get all products with filtering, sorting, and pagination.
 */
const getAll = async (query: Record<string, unknown>) => {
  const donationQuery = new QueryBuilder(Donation.find(), query)
    .search(donationSearchableFields) // Searchable fields
    .filter(donationFilterableFields) // Filterable fields
    .sort()
    .paginate()
    .fields();
  const meta = await donationQuery.countTotal();
  const result = await donationQuery.modelQuery;
  return { meta, result };
};

/**
 * Get a single product by ID.
 */
const getOneById = async (id: string): Promise<TDonation | null> => {
  const product = await Donation.findById(id);
  return product;
};

/**
 * Update a product by ID.
 */
const updateById = async (
  id: string,
  data: Partial<TDonation>,
): Promise<TDonation | null> => {
  const result = await Donation.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update donation');
  }
  return result;
};

/**
 * Soft delete a product by ID.
 */
const deleteById = async (id: string): Promise<TDonation | null> => {
  const result = await Donation.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Donation not found');
  }
  return result;
};

export const DonationService = {
  addNew,
  getAll,
  getOneById,
  updateById,
  deleteById,
};
