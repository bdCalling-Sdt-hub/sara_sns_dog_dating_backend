import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import validateRequest from '../../middleware/validateRequest';

import { userProfileValidations } from './UserProfile.validation';
import { UserProfileController } from './UserProfile.controller';
import fileUpload from '../../middleware/fileUpload';
import parseData from '../../middleware/parseData';
const upload = fileUpload('./public/uploads/profile');
const router = express.Router();

router.post(
  '/add',
  // auth(USER_ROLE.ADMIN), // Authorization middleware
  FileUploadHelper.upload.single('file'), // Single file uploads
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userProfileValidations.addValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserProfileController.addNew(req, res, next);
  },
  validateRequest(userProfileValidations.addValidationSchema),
  UserProfileController.addNew,
);

router.get('/', UserProfileController.getAll);

router.get('/:id', UserProfileController.getOneById);

router.patch(
  '/:id',
  upload.single('file'),
  // FileUploadHelper.upload.single('file'), // Single file uploads
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = userProfileValidations.updateValidationSchema.parse(
  //     JSON.parse(req.body.data),
  //   );
  //   return UserProfileController.updateById(req, res, next);
  // },
  parseData(),
  validateRequest(userProfileValidations.updateValidationSchema),
  UserProfileController.updateById,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.ADMIN), // Authorization middleware
  UserProfileController.deleteById,
);

export const UserProfileRoutes = router;
