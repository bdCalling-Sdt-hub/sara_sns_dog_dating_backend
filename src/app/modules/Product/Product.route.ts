import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constants';
import auth from '../../middleware/auth';
import { productValidations } from './Product.validation';
import { ProductController } from './Product.controller';

const router = express.Router();

router.post(
  '/add',
  // auth(USER_ROLE.ADMIN), // Authorization middleware
  FileUploadHelper.upload.single('file'), // Single file uploads
  (req: Request, res: Response, next: NextFunction) => {
    req.body = productValidations.addProductValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return ProductController.addNewProduct(req, res, next);
  },
  validateRequest(productValidations.addProductValidationSchema),
  ProductController.addNewProduct,
);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductById);

router.patch(
  '/:id',
  FileUploadHelper.upload.single('file'), // Single file uploads
  (req: Request, res: Response, next: NextFunction) => {
    req.body = productValidations.updateProductValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return ProductController.updateProduct(req, res, next);
  },
  validateRequest(productValidations.updateProductValidationSchema),
  ProductController.updateProduct,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.ADMIN), // Authorization middleware
  ProductController.deleteProduct,
);

export const ProductsRoutes = router;
