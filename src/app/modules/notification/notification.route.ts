import express, { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';
import validateRequest from '../../middleware/validateRequest';
import { NotificationController } from './notification.controller';

const router = express.Router();

router.post(
  '/create-notification',
  //   auth(USER_ROLE.USER),
  //   validateRequest(paymnetValidation),
  NotificationController.createNotification,
);

router.get(
  '',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  NotificationController.getAllNotificationByUser,
);
router.get(
  '/admin-all',
  auth(USER_ROLE.ADMIN),
  NotificationController.getAllNotificationByAdmin,
);
router.get('/:id', NotificationController.getSingleNotification);
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  NotificationController.deletedNotification,
);
router.delete(
  '/admin/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  NotificationController.deletedAdminNotification,
);

export const NotificationRoutes = router;
