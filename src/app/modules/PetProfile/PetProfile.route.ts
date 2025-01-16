import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import validateRequest from '../../middleware/validateRequest';

import auth from '../../middleware/auth';
import { PetProfileController } from './PetProfile.controller';
import { petProfileValidations } from './PetProfile.validation';

const router = express.Router();

router.post(
  '/add',
  // auth(USER_ROLE.ADMIN), // Authorization middleware
  FileUploadHelper.upload.single('file'), // Single file uploads
  (req: Request, res: Response, next: NextFunction) => {
    req.body = petProfileValidations.addValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return PetProfileController.addNew(req, res, next);
  },
  validateRequest(petProfileValidations.addValidationSchema),
  PetProfileController.addNew,
);

router.get('/', PetProfileController.getAll);

router.get('/:id', PetProfileController.getOneById);

router.patch(
  '/:id',
  FileUploadHelper.upload.single('file'), // Single file uploads
  (req: Request, res: Response, next: NextFunction) => {
    req.body = petProfileValidations.updateValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return PetProfileController.updateById(req, res, next);
  },
  validateRequest(petProfileValidations.updateValidationSchema),
  PetProfileController.updateById,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.ADMIN), // Authorization middleware
  PetProfileController.deleteById,
);

export const petProfileRoutes = router;
