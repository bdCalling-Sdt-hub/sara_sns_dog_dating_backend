import QueryBuilder from '../../builder/QueryBuilder';

import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { User } from '../user/user.models';
import { UserProfile } from '../UserProfile/UserProfile.models';
import {
  petProfileFilterableFields,
  petProfileSearchableFields,
} from './PetProfile.constants';
import { TPetProfile } from './PetProfile.interface';
import { PetProfile } from './PetProfile.models';

/**
 * Add new product(s) with sequential product IDs.
 */
const addNew = async (
  file: Express.Multer.File,
  data: Partial<TPetProfile>,
): Promise<TPetProfile | any> => {
  // Find the user by their ID
  const user = await User.findById(data.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isExist = await PetProfile.findOne({ userId: data.userId });
  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Pet profile already exist');
  }
  // Find the user profile associated with the user
  const userProfile = await UserProfile.findOne({ userId: data.userId });
  if (!userProfile) {
    throw new AppError(httpStatus.NOT_FOUND, 'User profile not found');
  }
  // Set the user profile ID and address
  data.userProfileId = userProfile._id;
  data.address = userProfile.address;
  // Set the location from the UserProfile (including lastLocationChangeAt)
  // Process the image file and update the image URL in data
  const ImageUrl = file.path.replace('public\\', '');
  data.image = ImageUrl;
  // Create the new pet profile
  const result = await PetProfile.create(data);

  // If the pet profile creation fails, delete the uploaded image
  // if (!result) {
  //   unlink(`public/${data?.image}`);
  // }

  const updateResult = await UserProfile.findOneAndUpdate(
    { userId: data.userId },
    { petsProfileId: result._id },
  );
  if (!updateResult) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User profile not found for update',
    );
  }

  return result;
};

/**
 * Get all products with filtering, sorting, and pagination.
 */
const getAll = async (query: Record<string, unknown>) => {
  const PetProfileQuery = new QueryBuilder(PetProfile.find(), query)
    .search(petProfileSearchableFields) // Searchable fields
    .filter(petProfileFilterableFields) // Filterable fields
    .sort()
    .paginate()
    .fields();
  const meta = await PetProfileQuery.countTotal();
  const result = await PetProfileQuery.modelQuery;
  return { meta, result };
};

/**
 * Get a single product by ID.
 */
const getOneById = async (id: string): Promise<TPetProfile | null> => {
  const product = await PetProfile.findOne({ userId: id });
  return product;
};

/**
 * Update a product by ID.
 */
const updateById = async (
  id: string,
  file: Express.Multer.File,
  data: Partial<TPetProfile>,
): Promise<TPetProfile | null> => {
  if (file) {
    const ImageUrl = file.path.replace('public\\', '');
    data.image = ImageUrl;
  }
  const previousImage = await PetProfile.findOne({ userId: id });

  const result = await PetProfile.findOneAndUpdate({ userId: id }, data, {
    new: true,
    runValidators: true,
  });

  // if (result) {
  //   unlink(`public/${previousImage?.image}`);
  // }
  return result;
};

/**
 * Soft delete a product by ID.
 */
const deleteById = async (id: string): Promise<TPetProfile | null> => {
  const result = await PetProfile.findByIdAndDelete(id);
  // if (result) {
  //   unlink(`public/${result.image}`);
  // }
  return result;
};

export const PetProfileService = {
  addNew,
  getAll,
  getOneById,
  updateById,
  deleteById,
};
