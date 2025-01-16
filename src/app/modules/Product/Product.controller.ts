import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../error/AppError';
import { ProductService } from './Product.service';

/**
 * Create a new product.
 */

const addNewProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  const file = req.file as Express.Multer.File;
  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Images are required');
  }
  const result = await ProductService.addNewProduct(file, productData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'New product added successfully!',
    data: result,
  });
});

/**
 * Get all products.
 */

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await ProductService.getAllProducts(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Product retrieved successfully!',
    data: products.result,
    meta: products.meta,
  });
});

/**
 * Get a single product by ID.
 */
const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.getProductById(id);
  if (!product) throw new Error('Product not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully!',
    data: product,
  });
});

/**
 * Update a product.
 */
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const file = req.file as Express.Multer.File;

  const result = await ProductService.updateProduct(id, file, data);
  if (!result) throw new Error('Product not found');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully!',
    data: result,
  });
});

/**
 * Soft delete a product.
 */
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await ProductService.deleteProduct(id);
  if (!product) throw new Error('Product not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully!',
    data: product,
  });
});

export const ProductController = {
  addNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
