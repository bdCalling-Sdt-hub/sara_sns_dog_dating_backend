import QueryBuilder from '../../builder/QueryBuilder';

import {
  shelterFilterableFields,
  shelterSearchableFields,
} from './Shelter.constants';
import { TShelter } from './Shelter.interface';
import { Shelter } from './Shelter.models';

/**
 * Add new product(s) with sequential product IDs.
 */
const addNew = async (
  file: Express.Multer.File,
  data: Partial<TShelter>,
): Promise<TShelter> => {
  const ImageUrl = file.path.replace('public\\', '');
  data.image = ImageUrl;
  const result = await Shelter.create(data);

  // if (!result) {
  //   unlink(`public/${data?.image}`);
  // }
  return result;
};

/**
 * Get all products with filtering, sorting, and pagination.
 */
const getAll = async (query: Record<string, unknown>) => {
  const shelterQuery = new QueryBuilder(Shelter.find(), query)
    .search(shelterSearchableFields) // Searchable fields
    .filter(shelterFilterableFields) // Filterable fields
    .sort()
    .paginate()
    .fields();
  const meta = await shelterQuery.countTotal();
  const result = await shelterQuery.modelQuery;
  return { meta, result };
};

/**
 * Get a single product by ID.
 */
const getOneById = async (id: string): Promise<TShelter | null> => {
  const product = await Shelter.findById(id);
  return product;
};

/**
 * Update a product by ID.
 */
const updateById = async (
  id: string,
  file: Express.Multer.File,
  data: Partial<TShelter>,
): Promise<TShelter | null> => {
  if (file) {
    const ImageUrl = file.path.replace('public\\', '');
    data.image = ImageUrl;
  }
  const previousImage = await Shelter.findById(id);

  const product = await Shelter.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  // if (file && product) {
  //   unlink(`public/${previousImage?.image}`);
  // }

  return product;
};

/**
 * Soft delete a product by ID.
 */
const deleteById = async (id: string): Promise<TShelter | null> => {
  const product = await Shelter.findByIdAndDelete(id);
  // if (product) {
  //   unlink(`public/${product.image}`);
  // }
  return product;
};

export const ShelterService = {
  addNew,
  getAll,
  getOneById,
  updateById,
  deleteById,
};
