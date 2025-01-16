import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constants';
import auth from '../../middleware/auth';

import { shelterValidations } from './Shelter.validation';
import { ShelterController } from './Shelter.controller';

const router = express.Router();

router.post(
  '/add',
  // auth(USER_ROLE.ADMIN), // Authorization middleware
  FileUploadHelper.upload.single('file'), // Single file uploads
  (req: Request, res: Response, next: NextFunction) => {
    req.body = shelterValidations.addValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return ShelterController.addNew(req, res, next);
  },
  validateRequest(shelterValidations.addValidationSchema),
  ShelterController.addNew,
);

router.get('/', ShelterController.getAll);

router.get('/:id', ShelterController.getOneById);

router.patch(
  '/:id',
  FileUploadHelper.upload.single('file'), // Single file uploads
  (req: Request, res: Response, next: NextFunction) => {
    req.body = shelterValidations.updateValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return ShelterController.updateById(req, res, next);
  },
  validateRequest(shelterValidations.updateValidationSchema),
  ShelterController.updateById,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.ADMIN), // Authorization middleware
  ShelterController.deleteById,
);

export const ShelterRoutes = router;
