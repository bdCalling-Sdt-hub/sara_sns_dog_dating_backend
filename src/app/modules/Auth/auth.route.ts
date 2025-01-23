import express from 'express';
import { authControllers } from './auth.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { authValidation } from './auth.validation';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

router.post('/login', authControllers.login);

router.post(
  '/refresh-token',
  // validateRequest(authValidation.refreshTokenValidationSchema),
  authControllers.refreshToken,
);
router.post(
  '/forgot-password-otp',
  // validateRequest(authValidation.forgetPasswordValidationSchema),
  authControllers.forgotPassword,
);
router.patch(
  '/change-password',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  authControllers.changePassword,
);

router.patch(
  '/forgot-password-otp-match',
  validateRequest(authValidation.otpMatchValidationSchema),
  authControllers.forgotPasswordOtpMatch,
);
router.patch(
  '/forgot-password-reset',
  validateRequest(authValidation.resetPasswordValidationSchema),
  authControllers.resetPassword,
);

export const AuthRoutes = router;
