import express from 'express';
import validateRequest from '../../middleware/validateRequest';

import { DonationController } from './Donation.controller';
import { donationValidations } from './Donation.validation';

const router = express.Router();

router.post(
  '/add',
  validateRequest(donationValidations.addValidationSchema),
  DonationController.addNew,
);

router.get('/', DonationController.getAll);

router.get('/:id', DonationController.getOneById);

router.patch(
  '/:id',
  validateRequest(donationValidations.updateValidationSchema),
  DonationController.updateById,
);

router.delete('/:id', DonationController.deleteById);

export const DonationRoutes = router;
