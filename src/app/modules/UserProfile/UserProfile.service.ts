import QueryBuilder from '../../builder/QueryBuilder';

import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { User } from '../user/user.models';
import {
  userProfileFilterableFields,
  userProfileSearchableFields,
} from './UserProfile.constants';
import { TUserProfile } from './UserProfile.interface';
import { UserProfile } from './UserProfile.models';

/**
 * Add new product(s) with sequential product IDs.
 */
const addNew = async (
  file: Express.Multer.File,
  data: Partial<TUserProfile>,
): Promise<TUserProfile> => {
  const userData = await User.findById(data.userId);
  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }
  data.email = userData.email;
  data.name = userData.fullName;
  data.mobile = userData.phone;

  const isExist = await UserProfile.findOne({ userId: data.userId });
  if (isExist) {
    throw new Error('User profile already exist');
  }
  const ImageUrl = file.path.replace('public\\', '');
  data.image = ImageUrl;
  const result = await UserProfile.create(data);

  // if (!result) {
  //   unlink(`public/${data?.image}`);
  // }

  await User.findByIdAndUpdate(data.userId, { image: result.image });

  // if (result.userId && result.location) {
  //   await User.findByIdAndUpdate(result.userId, {
  //     location: {
  //       type: 'Point',
  //       coordinates: result.location.coordinates,
  //     },
  //   });
  // }

  return result;
};

/**
 * Get all products with filtering, sorting, and pagination.
 */
const getAll = async (query: Record<string, unknown>) => {
  const userProfileQuery = new QueryBuilder(UserProfile.find(), query)
    .search(userProfileSearchableFields) // Searchable fields
    .filter(userProfileFilterableFields) // Filterable fields
    .sort()
    .paginate()
    .fields();
  const meta = await userProfileQuery.countTotal();
  const result = await userProfileQuery.modelQuery;
  return { meta, result };
};

/**
 * Get a single product by ID.
 */
const getOneById = async (id: string): Promise<TUserProfile | null> => {
  const product = await UserProfile.findOne({ userId: id });
  return product;
};

/**
 * Update a product by ID.
 */
const updateById = async (
  id: string,
  file: Express.Multer.File,
  data: Partial<TUserProfile>,
): Promise<TUserProfile | null> => {
  if (file) {
    const ImageUrl = file.path.replace('public\\', '');
    data.image = ImageUrl;
  }
  const previousImage = await UserProfile.findById(id);

  const result = await UserProfile.findOneAndUpdate({ userId: id }, data, {
    new: true,
    runValidators: true,
  });

  // if (file && result) {
  //   unlink(`public/${previousImage?.image}`);
  // }

  // if (result?.userId && result?.location) {
  //   await User.findByIdAndUpdate(result.userId, {
  //     location: {
  //       type: 'Point',
  //       coordinates: result.location.coordinates,
  //     },
  //   });
  // }
  return result;
};

/**
 * Soft delete a product by ID.
 */
const deleteById = async (id: string): Promise<TUserProfile | null> => {
  const result = await UserProfile.findByIdAndDelete(id);
  // if (result) {
  //   unlink(`public/${result.image}`);
  // }
  return result;
};

export const UserProfileService = {
  addNew,
  getAll,
  getOneById,
  updateById,
  deleteById,
};
