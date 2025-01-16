import express, { Router } from 'express';
import { otpControllers } from './otp.controller';
const route = express.Router();

route.patch('/resend-otp', otpControllers.resendOtp);

export const OtpRoutes = route;
