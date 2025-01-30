import QueryBuilder from '../../builder/QueryBuilder';
import {
  productFilterableFields,
  productSearchableFields,
} from './Product.constants';
import { TProduct } from './Product.interface';
import { Product } from './Product.models';

/**
 * Add new product(s) with sequential product IDs.
 */
const addNewProduct = async (
  file: Express.Multer.File,
  data: Partial<TProduct>,
): Promise<TProduct> => {
  const ImageUrl = file.path.replace('public\\', '');
  data.image = ImageUrl;
  const result = await Product.create(data);

  // if (!result) {
  //   unlink(`public/${data?.image}`);
  // }
  return result;
};

/**
 * Get all products with filtering, sorting, and pagination.
 */
const getAllProducts = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields) // Searchable fields
    .filter(productFilterableFields) // Filterable fields
    .sort()
    .paginate()
    .fields();

  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;
  return { meta, result };
};

/**
 * Get a single product by ID.
 */
const getProductById = async (id: string): Promise<TProduct | null> => {
  const product = await Product.findById(id);
  return product;
};

/**
 * Update a product by ID.
 */
const updateProduct = async (
  id: string,
  file: Express.Multer.File,
  data: Partial<TProduct>,
): Promise<TProduct | null> => {
  if (file) {
    const ImageUrl = file.path.replace('public\\', '');
    data.image = ImageUrl;
  }
  const previousImage = await Product.findById(id);

  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  // if (file && product) {
  //   unlink(`public/${previousImage?.image}`);
  // }

  if (file) {
  }
  return product;
};

/**
 * Soft delete a product by ID.
 */
const deleteProduct = async (id: string): Promise<TProduct | null> => {
  const product = await Product.findByIdAndDelete(id);
  // if (product) {
  //   unlink(`public/${product.image}`);
  // }
  return product;
};

export const ProductService = {
  addNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
